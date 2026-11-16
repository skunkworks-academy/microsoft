# MB-800 preparation course blueprint

| Field | Decision |
|---|---|
| Course ID | MB-800-PREP |
| Title | Business Central Functional Consultant: MB-800 exam preparation |
| Revision | 1.0.0, authored 16 November 2026 |
| Vendor objective baseline | Microsoft MB-800 study guide, skills measured as of 30 June 2026 |
| Canonical course route | https://www.skunkworksacademy.com/courses/mb-800-exam-preparation/ |
| Authoritative content repository | skunkworks-academy/microsoft |
| Audience | Functional consultants, finance/application administrators and implementation team members preparing for MB-800 |
| Prerequisites | Basic double-entry accounting, purchasing/sales/inventory processes, browser/Excel skills; access to an authorised Business Central sandbox for practical evidence |
| Delivery | Public self-paced guide plus original formative checks, guided lab briefs and a timed practice examination |
| Time | 21 hours 45 minutes of module estimates, plus 100-minute mock, remediation and capstone; estimates are planning assumptions, not measured seat time |
| Language | English; dates and currency examples are explicitly stated |
| Learning standard | Observable setup, posting, reconciliation and diagnostic evidence; no claim of accredited vendor courseware or standards certification |
| Ownership | Skunkworks Academy Microsoft content maintainers; a human Business Central SME review is pending until recorded |
| Maintenance | Recheck official skills outline and product documentation before each release, after a Microsoft exam update and at least quarterly |
| Learner data | Public formative practice; use synthetic business data only. Local progress/results are a learner convenience, not authenticated LMS evidence |

## Course-level outcomes and evidence

| Outcome | Learner can | Modules | Observable evidence |
|---|---|---|---|
| LO-01 | Build a company and migrate trustworthy opening data | 1 | Validated package, dependency mapping, reconciled opening ledgers |
| LO-02 | Apply security, dimensions, workflows and monitored core services | 1–2 | Positive/negative permission tests, dimension checks, approval transition log, successful queue evidence |
| LO-03 | Configure financial posting and recognition | 3–4 | Account map, posting preview, deferral/FX calculation, journal and asset-book design |
| LO-04 | Configure trade master data, costing, prices and fulfilment defaults | 5 | Unit conversion, SKU/location design, pricing boundary matrix, item/value/G/L trace |
| LO-05 | Process sales/purchases and select valid corrective actions | 6 | Partial fulfilment timeline, credit/return decision, prepayment deduction |
| LO-06 | Investigate inventory and application discrepancies | 7 | Saved-view/analysis sample, count difference, transfer/reclassification and cost trace |
| LO-07 | Settle, reconcile and close with auditable evidence | 8 | Applications, bank reconciliation, FX/dimension correction and asset-disposal checks |
| LO-08 | Interpret realistic scenarios under time pressure and remediate weak objectives | All | Completed original mock, objective-level review and evidence-based revision plan |

## Current skills coverage

Weights are Microsoft's published ranges. Module seat-time and the practice mock's exact question counts are Academy design decisions. No claim is made that Microsoft uses the same item pool, fixed count or selection algorithm.

| Microsoft skills group | Published range | Coverage |
|---|---:|---|
| Set up Business Central | 20–25% | Modules 1–2 |
| Configure financials | 30–35% | Modules 3–4 |
| Configure sales and purchasing | 10–15% | Module 5 |
| Perform Business Central operations | 30–35% | Modules 6–8 |

### Objective-to-module traceability

| Official objective group | Where taught and practised |
|---|---|
| Create/configure a company: Assisted Setup, configuration worksheet/packages, migration and journal opening balances | M1 sections 1–3; migration and opening-control lab |
| Manage security: profiles, users, permissions/sets, security filters, security groups and auditing | M1 section 4; positive/negative permission and audit tests |
| Core functionality: reports/layouts, job queues, number series, Copilot and agents | M2 sections 3 and 5; report/job/capability checks |
| Dimensions: values, globals/shortcuts, master/default/account-type rules, blocked combinations and priorities | M2 sections 1–2; mandatory/conflicting/blocked tests |
| Native approvals: workflows, notifications, approval users and user groups | M2 section 4; threshold/rejection/cancellation/substitution tests |
| Financial management: G/L setup, periods, terms, deferrals, currencies/rates and methods | M3 sections 1, 3–5; preview, deferral and conversion evidence |
| Chart of accounts: accounts, categories/subcategories, financial reporting and allocations | M3 sections 1 and 5; report and allocation checks |
| Posting groups: specific/general, general posting, inventory posting and multiple groups | M3 section 2; account-decision map and substitution tests |
| Journals/bank setup: accounts, templates, number series, batches and recurring templates | M4 sections 1–2; batch and bank design |
| Payables: vendor/related records, purchases setup, payment journals and ledger relationships | M4 section 3; vendor-to-ledger trace |
| Receivables: customer/related records, sales setup, cash receipts, Payment Registration and ledger relationships | M4 section 3; partial receipt trace |
| Fixed asset setup: settings, books, classes/subclasses, assets/components and methods | M4 section 4; asset-book design and method comparison |
| Inventory setup: inventory controls, core item settings, categories, attributes, units, variants, locations, ledger relationships, costing and SKUs | M5 sections 1–3; packaging/location/cost lab |
| Trade master data: customer shipping/location/address and vendor order address/lead time/location | M5 section 4; document-default tests |
| Prices/discounts: vendor purchase and customer sales prices, line/invoice discounts | M5 section 5; date/quantity/currency/unit test matrix |
| Basic operations: customization/design/personalization, filters, related entries, inspection, Edit in Excel and analysis mode | M7 sections 1–3; saved view, analysis, inspection and publish checks |
| Purchasing: quotes/orders/receipts, over-receipt, undo, invoices, recurring lines, blankets and deferrals | M6 sections 1–2 and 5; partial receipt lab |
| Sales: quotes/conversion, availability, shipments/undo, invoices, recurring lines, blankets and deferrals | M6 sections 1, 3 and 5; partial shipment lab |
| Financial documents: sales/purchase invoice/credit, combined receipts/shipments, corrections, release/reopen and prepayments | M6 sections 3–5; correction decision and prepayment lab |
| Journals/payments: payment/receipt/registration, application/unapply, eligible reversal, bank reconciliation, recurring transactions, allocations, FX, dimension correction and G/L balance revaluation | M8 sections 1–4; miniature close lab |
| Fixed asset operations: acquisition, depreciation and disposal | M8 section 5; lifecycle reconciliation |
| Inventory operations: receipts/shipments, transfers, cost adjustment, counts and reclassification | M7 sections 4–5; discrepancy diagnostic lab |

## Assessment design

- Each of eight modules contains retrieval checks with an answer and reason, plus a practical lab with observable acceptance criteria.
- Questions in the public mock are original Academy practice items, not recalled exam questions or a reproduction of Microsoft's assessment bank.
- Practice items may use single-select, multiple-select and scenario formats as supported by the application. Public answer material is intentionally available for formative review after completion.
- A raw practice percentage is not Microsoft's scaled score. A course readiness target must be labelled an Academy recommendation, never a Microsoft passing rule.
- The capstone is a formative, evidence-led practical exercise. Its public rubric supports self-review and coached review. It does not award a protected, high-stakes credential.
- Controlled institutional examinations would require authenticated server-side submissions, protected keys, durable audit records and an approved assessor process. This public static package makes no claim that those controls exist.

## Visual and media plan

Each module includes a unique, reproducible native-text conceptual visual: implementation gates, control selection, posting-account map, application ledger chain, inventory reconciliation ladder, correction decision, discrepancy diagnosis and close-control map. These are original educational models, not product screenshots. Use the shared Academy colour/typography tokens and preserve the visual's full text as accessible HTML. No vendor screenshot or logo is evidence of partnership, authorisation or assessment equivalence.

## Sources and review status

Primary baseline: [Microsoft MB-800 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-800). Each module provides further official product-documentation links and relevant existing Academy lab links. Product UI can differ by release, region, extensions, licence and feature availability. The guide teaches decisions and evidence rather than asserting that one screenshot is universally current.

This blueprint records authored scope. CI results, human SME review, merge, deployment and live-route verification must be recorded separately using actual evidence.
