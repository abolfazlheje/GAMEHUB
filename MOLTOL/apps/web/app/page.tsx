"use client";

import { useMemo, useState } from "react";

const worlds = [
  { id: "void", index: "01", name: "THE VOID", type: "Origin space", description: "Where every journey begins.", color: "violet", status: "ONLINE" },
  { id: "dream", index: "02", name: "DREAM ENGINE", type: "Generative space", description: "Shape a place that has never existed.", color: "blue", status: "IN DEVELOPMENT" },
  { id: "time", index: "03", name: "TIME MACHINE", type: "Temporal space", description: "Explore moments as shifting dimensions.", color: "amber", status: "IN DEVELOPMENT" },
  { id: "archive", index: "04", name: "INFINITE ARCHIVE", type: "Knowledge space", description: "A living collection of ideas and artifacts.", color: "cyan", status: "LOCKED" },
  { id: "beyond", index: "05", name: "BEYOND", type: "Unknown space", description: "Some doors reveal themselves later.", color: "rose", status: "UNDISCOVERED" }
];

export default function Home() {
  const [active, setActive] = useState("void");
  const [signal, setSignal] = useState(64);
  const [showSecrets, setShowSecrets] = useState(false);
  const current = useMemo(() => worlds.find((world) => world.id === active) ?? worlds[0], [active]);

  return (
    <main className="shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" aria-label="MOLTOL home"><span className="brand-mark">M</span><span>MOLTOL</span><span className="brand-beta">EXPERIMENTAL SYSTEMS</span></a>
        <nav className="topnav" aria-label="Main navigation"><a href="#worlds">Worlds</a><a href="#system">System</a><a href="#access">Access</a></nav>
        <div className="top-status"><span className="pulse" /> SYSTEM ONLINE</div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> AN UNFINISHED UNIVERSE <span className="eyebrow-line" /></div>
          <h1>You are not<br /><em>browsing.</em><br />You are entering<span className="period">.</span></h1>
          <p className="hero-description">A hybrid digital universe built from hidden worlds, living interfaces, and experiences that evolve with you.</p>
          <div className="hero-actions"><a className="primary-button" href="#worlds">ENTER THE SYSTEM <span>↗</span></a><a className="text-button" href="#system">EXPLORE THE ARCHITECTURE</a></div>
        </div>
        <div className="orbital-stage" aria-label="Abstract animated portal artwork">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="core"><div className="core-grid" /><div className="core-glow" /><span>M<br />Ø</span></div>
          <div className="orbit-label label-top">UNKNOWN / 00X</div><div className="orbit-label label-bottom">SIGNAL DETECTED</div>
          <div className="crosshair crosshair-a" /><div className="crosshair crosshair-b" />
        </div>
        <div className="hero-index"><span>FIG. 001</span><span>THE FIRST THRESHOLD</span><span>40° 00' 00.0&quot; N</span></div>
      </section>

      <section className="world-section" id="worlds">
        <div className="section-heading"><div><div className="eyebrow left">01 / WORLD SELECTOR</div><h2>Choose your <em>dimension.</em></h2></div><p>Every portal is a different set of rules.<br />Some are still becoming.</p></div>
        <div className="world-layout">
          <div className="world-list" role="tablist" aria-label="Worlds">
            {worlds.map((world) => <button key={world.id} role="tab" aria-selected={active === world.id} className={`world-item ${active === world.id ? "selected" : ""}`} onClick={() => setActive(world.id)}>
              <span className="world-number">{world.index}</span><span className="world-name">{world.name}<small>{world.type}</small></span><span className="world-arrow">↗</span>
            </button>)}
          </div>
          <div className={`world-preview tone-${current.color}`}>
            <div className="preview-noise" /><div className="preview-orb" /><div className="preview-meta"><span>DIMENSION / {current.index}</span><span>{current.status}</span></div>
            <div className="preview-content"><span className="preview-kicker">CURRENTLY SELECTED</span><h3>{current.name}</h3><p>{current.description}</p><button className="preview-button" onClick={() => setShowSecrets((value) => !value)}>{showSecrets ? "CLOSE ACCESS PANEL" : "REQUEST ENTRY"} <span>↗</span></button></div>
            <div className="preview-coordinate">MOLTOL / {current.id.toUpperCase()} / 000{current.index}</div>
          </div>
        </div>
      </section>

      <section className="system-section" id="system">
        <div className="section-heading"><div><div className="eyebrow left">02 / LIVE SYSTEM</div><h2>A universe in <em>motion.</em></h2></div><p>Adjust the signal. Observe the atmosphere.<br />The system responds.</p></div>
        <div className="system-panel">
          <div className="system-copy"><span className="panel-label">ENVIRONMENTAL SIGNAL</span><strong>{signal}<small>%</small></strong><p>A prototype control for the future world-state engine. This value is local to this session.</p><input aria-label="Environmental signal" type="range" min="0" max="100" value={signal} onChange={(event) => setSignal(Number(event.target.value))} /><div className="range-labels"><span>QUIET</span><span>RESONANCE</span><span>OVERLOAD</span></div></div>
          <div className="system-readout"><div><span>CORE STATUS</span><b><i /> STABLE</b></div><div><span>WORLD STATE</span><b>ADAPTIVE</b></div><div><span>ACCESS MODE</span><b>DISCOVERY</b></div><div><span>BUILD</span><b>0.1.0 / FOUNDATION</b></div></div>
        </div>
      </section>

      <section className="access-section" id="access">
        <div className="access-card"><div className="eyebrow left">03 / RESTRICTED FREQUENCY</div><div className="access-content"><div><h2>Not every door<br />is meant to be <em>visible.</em></h2><p>Secret zones will unlock through discoveries, progression, and verified permissions. This starter panel is a visual prototype, not real authentication.</p></div><div className="access-control"><div className="lock-symbol">⌑</div><span>HIDDEN LAYER / 0{showSecrets ? "1" : "0"}</span><button onClick={() => setShowSecrets((value) => !value)}>{showSecrets ? "SEAL THE PORTAL" : "REVEAL SIGNAL"} ↗</button>{showSecrets && <small className="access-note">SIGNAL FOUND — secure access will be connected in a later phase.</small>}</div></div></div>
      </section>

      <footer className="footer"><a className="brand" href="#"><span className="brand-mark">M</span><span>MOLTOL</span></a><span>AN EXPERIMENT IN DIGITAL EXISTENCE</span><span>© 2026 / BUILD 0.1.0</span></footer>
    </main>
  );
}
