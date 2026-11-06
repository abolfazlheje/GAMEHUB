const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.join(__dirname, "public");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function send(res, status, data, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(typeof data === "string" ? data : JSON.stringify(data));
}

async function readBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 32_000) throw new Error("درخواست بیش از حد بزرگ است.");
  }
  return JSON.parse(raw || "{}");
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    if (!process.env.OPENAI_API_KEY) {
      return send(res, 503, { error: "کلید API هنوز روی سرور تنظیم نشده است." });
    }
    try {
      const body = await readBody(req);
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message || message.length > 4000) {
        return send(res, 400, { error: "پیام باید بین ۱ تا ۴۰۰۰ نویسه باشد." });
      }

      const upstream = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          instructions: "تو دستیار فارسی‌زبان و مفید وب‌سایت GAMEHUB هستی. پاسخ‌ها را روشن، دوستانه، کوتاه و مناسب سن نوجوانان بنویس. اگر پرسشی درباره بازی‌هاست، راهنمایی کلی و امن بده. اطلاعات شخصی یا رمز عبور درخواست نکن.",
          input: message,
          max_output_tokens: 700
        })
      });

      const result = await upstream.json();
      if (!upstream.ok) {
        console.error("OpenAI API error:", result.error?.message || upstream.status);
        return send(res, 502, { error: "ارتباط با سرویس هوش مصنوعی ناموفق بود. تنظیمات سرور را بررسی کن." });
      }
      const answer = (result.output || [])
        .flatMap(item => item.content || [])
        .filter(item => item.type === "output_text")
        .map(item => item.text)
        .join("\n")
        .trim();

      if (!answer) return send(res, 502, { error: "پاسخی از سرویس دریافت نشد. دوباره تلاش کن." });
      return send(res, 200, { answer });
    } catch (error) {
      console.error("Chat request failed:", error.message);
      return send(res, 400, { error: error.message || "در پردازش پیام مشکلی پیش آمد." });
    }
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, { error: "روش درخواست پشتیبانی نمی‌شود." });
  }

  const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
  const requested = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(ROOT, requested);
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, "index.html")) {
    return send(res, 403, "Forbidden", "text/plain; charset=utf-8");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) return send(res, 404, "صفحه پیدا نشد.", "text/plain; charset=utf-8");
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    res.end(req.method === "HEAD" ? undefined : data);
  });
});

server.listen(PORT, () => console.log(`GAMEHUB AI is running on port ${PORT}`));
