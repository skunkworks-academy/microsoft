import Script from "next/script";
import "./microsoft-hub.css";

const offerings = [
  ["AZ", "Azure & Cloud", "Azure", "Cloud fundamentals, administration, architecture, governance, networking and hybrid operations."],
  ["SC", "Security, Identity & Compliance", "Security", "Microsoft Entra, Defender, Sentinel, Purview, Zero Trust and security operations."],
  ["M365", "Microsoft 365 & Copilot", "Microsoft 365", "Modern work, endpoint administration, Teams, SharePoint, collaboration and Copilot adoption."],
  ["PP", "Power Platform", "Power Platform", "Power Apps, Power Automate, Power BI, Copilot Studio and low-code solution delivery."],
  ["AI", "Data & AI", "AI", "Azure AI, Azure OpenAI, Fabric, analytics, data engineering, databases and machine learning."],
  ["DEV", "Developer & DevOps", "DevOps", "GitHub, Azure DevOps, application development, automation, DevSecOps and platform engineering."],
  ["D365", "Dynamics 365", "Dynamics 365", "Business applications for sales, service, finance, operations and solution consulting."],
  ["HYB", "Windows & Hybrid Infrastructure", "Windows Server", "Windows Server, PowerShell, identity, endpoint management and hybrid infrastructure operations."]
] as const;

const references = [
  {
    tag: "CURRENT",
    title: "Microsoft Learn Platform API — Catalog Data",
    description: "Authenticated REST catalog endpoints for modules, learning paths, credentials, exams and instructor-led courses.",
    href: "https://learn.microsoft.com/en-gb/training/support/integrations-learn-platform-api-catalog",
    link: "Read Microsoft documentation ↗"
  },
  {
    tag: "ARCHIVED REFERENCE",
    title: "microsoftarchive/Learn-LTI",
    description: "Historical Microsoft Learn LTI integration reference. This repository is archived and is not presented as Microsoft's current integration path.",
    href: "https://github.com/microsoftarchive/Learn-LTI",
    link: "Open archived repository ↗"
  },
  {
    tag: "SKUNKWORKS",
    title: "Microsoft Skunkworks Academy Hub",
    description: "Partner positioning, Microsoft learning discovery, catalog browsing and routing into Skunkworks Academy delivery.",
    href: "https://microsoft.skunkworksacademy.com/",
    link: "Canonical Microsoft hub ↗"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://microsoft.skunkworksacademy.com/#organization",
      name: "Skunkworks Academy",
      url: "https://www.skunkworksacademy.com/",
      sameAs: [
        "https://learn.microsoft.com/en-us/training/educator-center/programs/global-training-partner/find-global-training-partner",
        "https://github.com/skunkworks-academy"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://microsoft.skunkworksacademy.com/#website",
      url: "https://microsoft.skunkworksacademy.com/",
      name: "Skunkworks Academy Microsoft Learning Hub",
      publisher: { "@id": "https://microsoft.skunkworksacademy.com/#organization" },
      inLanguage: "en-ZA"
    }
  ]
};

function MicrosoftMark() {
  return <span className="ms-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function Home() {
  return (
    <div className="ms-hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="shell nav-shell">
          <a className="brand" href="#top" aria-label="Skunkworks Academy Microsoft Learning Hub home"><MicrosoftMark /><span><strong>Microsoft</strong><small>Skunkworks Academy</small></span></a>
          <nav className="nav-links" aria-label="Primary navigation"><a href="#offerings">Offerings</a><a href="#catalog">Catalog</a><a href="#integration">Integration</a><a href="#partner">Partnership</a></nav>
          <a className="button button-small button-ghost" href="https://www.skunkworksacademy.com/microsoft/">Academy catalog</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> Microsoft Global Training Partner</p>
              <h1>Build Microsoft skills that move from learning to <span>real capability.</span></h1>
              <p className="hero-lede">Discover Microsoft learning paths, certifications, technical courses and team enablement across Azure, Microsoft 365, Security, Power Platform, Data & AI, Dynamics 365 and DevOps—connected to the Microsoft Learn ecosystem.</p>
              <div className="hero-actions"><a className="button button-primary" href="#catalog">Browse the full catalog</a><a className="button button-secondary" href="https://learn.microsoft.com/en-us/training/" target="_blank" rel="noopener noreferrer">Open Microsoft Learn</a></div>
              <div className="trust-row"><div><strong>Global</strong><span>Partner delivery</span></div><div><strong>Role-based</strong><span>Skilling pathways</span></div><div><strong>Flexible</strong><span>ILT + self-paced</span></div><div><strong>Integrated</strong><span>Learn catalog data</span></div></div>
            </div>
            <aside className="hero-panel" aria-label="Microsoft learning journey">
              <div className="panel-head"><span>Learning journey</span><b>LIVE CATALOG</b></div>
              {[["01","Discover","Search Microsoft Learn content and Skunkworks pathways."],["02","Plan","Map role, skill level, certification and business outcomes."],["03","Learn","Use self-paced resources, instructor-led delivery and labs."],["04","Validate","Assess skills, prepare for credentials and capture evidence."]].map(([n,t,d]) => <article className="journey-row" key={n}><b>{n}</b><div><strong>{t}</strong><span>{d}</span></div></article>)}
              <a className="panel-link" href="#integration">See how the Microsoft Learn integration works <span>→</span></a>
            </aside>
          </div>
        </section>

        <section className="section" id="partner">
          <div className="shell partner-strip"><div><p className="eyebrow">Verified partnership</p><h2>Skunkworks Academy is listed by Microsoft as a Global Training Partner.</h2></div><p>Our Microsoft learning experience combines partner-led training with direct discovery of Microsoft Learn catalog data. Partner status can be verified in Microsoft Learn&apos;s Global Training Partner directory.</p><a className="text-link" href="https://learn.microsoft.com/en-us/training/educator-center/programs/global-training-partner/find-global-training-partner" target="_blank" rel="noopener noreferrer">Verify on Microsoft Learn ↗</a></div>
        </section>

        <section className="section section-muted" id="offerings">
          <div className="shell"><div className="section-head"><div><p className="eyebrow">Microsoft learning offerings</p><h2>One catalog. Multiple routes to capability.</h2></div><p>Start with a technology area, then narrow by role, level, content type and product in the catalog below.</p></div>
            <div className="offering-grid">{offerings.map(([icon,title,seed,description]) => <a className="offering-card" href="#catalog" data-seed={seed} key={title}><span className="offering-icon">{icon}</span><h3>{title}</h3><p>{description}</p><span>Explore {title} →</span></a>)}</div>
          </div>
        </section>

        <section className="section catalog-section" id="catalog" aria-labelledby="catalog-title">
          <div className="shell">
            <div className="section-head catalog-heading"><div><p className="eyebrow">Full course catalog browser</p><h2 id="catalog-title">Search Microsoft learning by what you need to achieve.</h2></div><div className="catalog-source"><span id="catalogSourceBadge" className="source-badge">Starter catalog</span><button id="loadLiveCatalog" className="button button-small button-primary" type="button">Load Microsoft Learn catalog</button></div></div>
            <div className="catalog-toolbar" role="search">
              <label className="search-field"><span>Search</span><input id="catalogSearch" type="search" autoComplete="off" placeholder="Azure, Copilot, security, data, role or skill..." /></label>
              <label><span>Type</span><select id="typeFilter" defaultValue=""><option value="">All content</option></select></label>
              <label><span>Level</span><select id="levelFilter" defaultValue=""><option value="">All levels</option></select></label>
              <label><span>Product</span><select id="productFilter" defaultValue=""><option value="">All products</option></select></label>
              <label><span>Sort</span><select id="sortFilter" defaultValue="relevance"><option value="relevance">Relevance</option><option value="title">Title A–Z</option><option value="duration">Shortest first</option></select></label>
            </div>
            <div className="catalog-meta"><p id="catalogStatus" role="status" aria-live="polite">Browse the starter catalog or load the full Microsoft Learn catalog.</p><button id="clearFilters" className="link-button" type="button">Clear filters</button></div>
            <div id="catalogGrid" className="catalog-grid" aria-live="polite" />
            <div className="catalog-footer"><button id="showMore" className="button button-secondary" type="button" hidden>Show more results</button><p>Microsoft Learn catalog content is owned and maintained by Microsoft. Live loading uses the Microsoft Learn catalog endpoint when available and the implementation is structured for migration to the authenticated Microsoft Learn Platform API.</p></div>
          </div>
        </section>

        <section className="section section-dark" id="integration">
          <div className="shell integration-grid"><div><p className="eyebrow">Microsoft Learn integration</p><h2>Built around Microsoft&apos;s current platform direction.</h2><p>The current Platform API is the primary integration reference. Learn-LTI is retained only as an archived historical reference implementation.</p></div><div className="reference-stack">{references.map(r => <a className="reference-card" href={r.href} target="_blank" rel="noopener noreferrer" key={r.title}><span className="reference-tag">{r.tag}</span><strong>{r.title}</strong><p>{r.description}</p><span>{r.link}</span></a>)}</div></div>
        </section>

        <section className="section">
          <div className="shell delivery-grid"><div><p className="eyebrow">Training delivery</p><h2>From individual learning to enterprise skilling programmes.</h2><p>Use Microsoft Learn for discovery and self-paced learning, then add structured partner delivery where teams need facilitation, labs, assessment, cohort management, certification preparation or a tailored capability roadmap.</p><div className="hero-actions"><a className="button button-primary" href="https://www.skunkworksacademy.com/microsoft/">Browse Academy Microsoft training</a><a className="button button-secondary" href="/course/">Open AZ-400 accelerator</a></div></div><div className="delivery-list">{[["01","Instructor-led training","Virtual or classroom delivery for technical and business teams."],["02","Self-paced pathways","Structured progression using Microsoft Learn and Academy content."],["03","Hands-on labs","Practical exercises aligned to implementation and operational skills."],["04","Certification readiness","Role-based preparation, knowledge checks and exam-focused guidance."]].map(([n,t,d]) => <article key={n}><span>{n}</span><div><strong>{t}</strong><p>{d}</p></div></article>)}</div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="shell footer-grid"><div><a className="brand" href="#top"><MicrosoftMark /><span><strong>Microsoft</strong><small>Skunkworks Academy</small></span></a><p>Microsoft training, certification pathways and enterprise skilling from Skunkworks Academy.</p></div><div><strong>Explore</strong><a href="#offerings">Learning offerings</a><a href="#catalog">Catalog browser</a><a href="#integration">Integration references</a></div><div><strong>Official references</strong><a href="https://learn.microsoft.com/en-gb/training/support/integrations-learn-platform-api-catalog">Learn Platform API</a><a href="https://learn.microsoft.com/en-us/training/educator-center/programs/global-training-partner/find-global-training-partner">Global Training Partner directory</a><a href="https://github.com/microsoftarchive/Learn-LTI">Learn-LTI archive</a></div></div><div className="shell footer-bottom"><span>© 2026 Skunkworks Academy.</span><span>Microsoft product names and trademarks are the property of Microsoft. Partnership status is referenced from Microsoft&apos;s published Global Training Partner directory.</span></div></footer>
      <Script src="/microsoft-catalog.js" strategy="afterInteractive" />
    </div>
  );
}
