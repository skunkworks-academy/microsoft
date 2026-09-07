import type { Metadata } from "next";
import "../microsoft-hub.css";

export const metadata: Metadata = {
  title: "MB-800 Business Central Functional Consultant",
  description:
    "Hands-on MB-800 learning for Microsoft Dynamics 365 Business Central Functional Consultants, including guided labs, Copilot exercises, financials, purchasing, sales and inventory.",
  alternates: {
    canonical: "/MB-800-Business-Central-Functional-Consultant/"
  }
};

const labs = [
  ["00", "Validate the lab environment", "Lab00_Validate_Lab_Environment"],
  ["01", "Create and configure a new company", "Lab01_Create_company"],
  ["02", "Create and manage user profiles", "Lab02_Create_Manage_User_Profiles"],
  ["03", "Perform actions with Copilot", "Lab03_Perform_Actions_with_Copilot"],
  ["04", "Migrate master data", "Lab04_Migrate_Master_data"],
  ["05", "Set up and use a purchase approval workflow", "Lab05_Set_up_and_use_a_purchase_approval_workflow"],
  ["06", "Configure item costing", "Lab06_Configure_Item_Costing"],
  ["07", "Configure the chart of accounts", "Lab07_Configure_Chart_of_Accts"],
  ["08", "Set up accounts payable", "Lab08_Set_up_Accounts_Payable"],
  ["09", "Set up general journals", "Lab09_Set_up_General_Journals"],
  ["10", "Set up cash management", "Lab10_Set_up_Cash_Management"],
  ["11", "Set up dimensions", "Lab11_Set_up_dimensions"],
  ["12", "Prepare financial reporting", "Lab12_Prepare_Financial_Reporting"],
  ["13", "Manage an accounting period", "Lab13_Manage_Accounting_Period"],
  ["14", "Configure purchasing", "Lab14_Configure_Purchasing"],
  ["15", "Set up accounts receivable", "Lab15_Set_up_Accounts_Receivable"],
  ["16", "Set up inventory", "Lab16_Set_up_Inventory"],
  ["17", "Configure sales", "Lab17_Configure_Sales"],
  ["18", "Perform basic Business Central tasks", "Lab18_Perform_Basic_Tasks"],
  ["19", "Process purchasing transactions", "Lab19_Process_Purchase"],
  ["20", "Process sales transactions", "Lab20_Process_Sales"],
  ["21", "Suggest number series with Copilot", "Lab21_Suggest_Number_Series_Copilot"],
  ["22", "Configure Copilot agent capabilities", "Lab22_Configure_Copilot_Agent_Capabilities"],
  ["23", "Perform finance operations", "Lab23_Perform_Finance_Operations"],
  ["24", "Reconcile customer and vendor accounts", "Lab24_Reconcile_Customer_Vendor"],
  ["25", "Process cash management", "Lab25_Process_Cash_Management"]
] as const;

const hostedBase =
  "https://microsoftlearning.github.io/MB-800-Business-Central-Functional-Consultant/Instructions/Labs";

function MicrosoftMark() {
  return (
    <span className="ms-mark" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

export default function MB800Course() {
  return (
    <div className="ms-hub">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="shell nav-shell">
          <a className="brand" href="/" aria-label="Microsoft Skunkworks Academy home">
            <MicrosoftMark />
            <span><strong>Microsoft</strong><small>Skunkworks Academy</small></span>
          </a>
          <nav className="nav-links" aria-label="Course navigation">
            <a href="#overview">Overview</a>
            <a href="#labs">Labs</a>
            <a href="#certification">Certification</a>
          </nav>
          <a className="button button-small button-ghost" href="/">Microsoft catalog</a>
        </div>
      </header>

      <main id="main" data-swa-contrast="preserve">
        <section className="hero" id="overview">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> Dynamics 365 Business Central</p>
              <h1>MB-800 <span>Business Central Functional Consultant</span></h1>
              <p className="hero-lede">
                A practical, lab-led course for functional consultants implementing Microsoft Dynamics 365 Business Central.
                Work through company setup, data migration, financials, purchasing, sales, inventory, workflows and Copilot-enabled scenarios.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#labs">Start the labs</a>
                <a className="button button-secondary" href="https://learn.microsoft.com/en-us/training/courses/mb-800t00" target="_blank" rel="noopener noreferrer">Official Microsoft course ↗</a>
              </div>
              <div className="trust-row" aria-label="Course details">
                <div><strong>MB-800</strong><span>Exam-aligned</span></div>
                <div><strong>Intermediate</strong><span>Role-based</span></div>
                <div><strong>26</strong><span>Hands-on labs</span></div>
                <div><strong>Dynamics 365</strong><span>Business Central</span></div>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Course outcomes">
              <div className="panel-head"><span>Course outcomes</span><b>HANDS-ON</b></div>
              {[
                ["01", "Set up Business Central", "Companies, profiles, data migration, workflows and Copilot."],
                ["02", "Configure financials", "Chart of accounts, payables, receivables, journals and reporting."],
                ["03", "Configure operations", "Purchasing, sales, inventory and transaction processing."],
                ["04", "Prepare for MB-800", "Use the labs alongside Microsoft Learn and the current study guide."]
              ].map(([n, title, description]) => (
                <article className="journey-row" key={n}>
                  <b>{n}</b>
                  <div><strong>{title}</strong><span>{description}</span></div>
                </article>
              ))}
              <a className="panel-link" href="#labs">Open the lab directory <span>→</span></a>
            </aside>
          </div>
        </section>

        <section className="section section-muted" id="labs" aria-labelledby="labs-title">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="eyebrow">Hands-on lab directory</p>
                <h2 id="labs-title">Work through the MB-800 implementation scenarios.</h2>
              </div>
              <p>
                Labs open the maintained hosted instructions for the MB-800 course. Use them in sequence for a complete implementation journey or jump directly to a topic.
              </p>
            </div>

            <div className="offering-grid">
              {labs.map(([number, title, file]) => (
                <a
                  className="offering-card"
                  href={`${hostedBase}/${file}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={file}
                >
                  <span className="offering-icon">{number}</span>
                  <h3>{title}</h3>
                  <p>Hands-on MB-800 lab exercise.</p>
                  <span>Open lab →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="certification">
          <div className="shell delivery-grid">
            <div>
              <p className="eyebrow">Certification alignment</p>
              <h2>Microsoft Certified: Dynamics 365 Business Central Functional Consultant Associate</h2>
              <p>
                Use this course as practical reinforcement alongside the official Microsoft Learn training and current MB-800 study guide.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="https://learn.microsoft.com/en-us/credentials/certifications/d365-business-central-functional-consultant-associate/" target="_blank" rel="noopener noreferrer">View certification ↗</a>
                <a className="button button-secondary" href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-800" target="_blank" rel="noopener noreferrer">MB-800 study guide ↗</a>
              </div>
            </div>
            <div className="delivery-list">
              {[
                ["01", "Set up Business Central", "Company configuration, users, data, workflows and Copilot."],
                ["02", "Configure financials", "Core finance setup, journals, dimensions and reporting."],
                ["03", "Configure sales and purchasing", "Operational configuration and transaction processing."],
                ["04", "Perform Business Central operations", "Inventory, finance operations and day-to-day processing."]
              ].map(([n, title, description]) => (
                <article key={n}>
                  <span>{n}</span>
                  <div><strong>{title}</strong><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <a className="brand" href="/"><MicrosoftMark /><span><strong>Microsoft</strong><small>Skunkworks Academy</small></span></a>
            <p>MB-800 hands-on learning for Dynamics 365 Business Central Functional Consultants.</p>
          </div>
          <div>
            <strong>Course</strong>
            <a href="#overview">Overview</a>
            <a href="#labs">Labs</a>
            <a href="#certification">Certification</a>
          </div>
          <div>
            <strong>References</strong>
            <a href="https://learn.microsoft.com/en-us/training/courses/mb-800t00">Microsoft Learn course</a>
            <a href="https://github.com/skunkworks-academy/MB-800-Business-Central-Functional-Consultant">Course repository</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Skunkworks Academy.</span>
          <span>Microsoft product names and trademarks are the property of Microsoft.</span>
        </div>
      </footer>
    </div>
  );
}
