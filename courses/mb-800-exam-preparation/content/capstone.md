# Practical capstone: Northstar Supplies go-live rehearsal

This is an original formative implementation exercise using a fictional company and synthetic values. Allow **3–4 hours** as a planning estimate, plus review. Use an authorised disposable Business Central sandbox. Tax is excluded from the numerical examples so the accounting and application decisions can be reviewed separately.

## Scenario

Northstar Supplies is a distributor with MAIN and BRANCH locations. It wants reliable company setup, department/region reporting, controlled purchasing and traceable sales-to-cash. The finance manager approves an initial small rehearsal before production migration.

Your opening design includes bank **30,000**, receivables **12,000**, inventory **18,000**, payables **15,000** and equity **45,000** in local currency. SALES and ADMIN are departments. SOUTH and NORTH are regions. One nominated combination is blocked as a policy test. One buyer can request an **8,000** purchase but needs an independent approver above a **5,000** limit.

The test item is a chair with base unit EACH and BOX equal to four EACH. A purchase for twenty EACH arrives as twelve followed by eight. A test sales price is 100 per EACH. At ten EACH the offer grants a 5% line discount. An eligible 2% invoice discount applies to the line's net value. The resulting simplified ten-unit total is **931** before tax.

## Required work

1. **Company and access:** choose a company creation approach, validate a five-record master import and provide a nonadministrator positive/negative permission test. Explain how a profile differs from a permission set.
2. **Opening balances:** create a migration/journal design that balances at 60,000 on each side and avoids duplicating subledger control balances. Reconcile customer, vendor, bank and inventory detail to G/L.
3. **Controls:** configure dimensions/defaults, a blocked combination and approval routing. Prove an allowed dimension, missing required value and prohibited combination. Test above/below-limit approval and rejection/cancellation.
4. **Financial setup:** produce the posting-account map for a sale and purchase. Preview a 12,000 annual expense across twelve equal periods. Prepare a 2,000 allocation with 60/40 recipients.
5. **Trade and documents:** configure item units/variants/locations/SKU policy and fulfilment master data. Process or preview the two partial receipts. Test the sales offer at nine, ten and eleven units and explain the selected results.
6. **Corrective action:** explain and demonstrate eligible paths for an uninvoiced movement and a paid partial return. Retain original-document references and reconcile the quantity and financial effect.
7. **Cash and close:** apply a 900 receipt to a 1,200 invoice; prove the remaining 300. Reconcile a 150 bank fee without duplicating an already-posted payment. Perform an authorised small exchange-rate adjustment and explain its direction.
8. **Assets and inventory:** calculate a count change from fifty to forty-seven, then explain transfer versus shortage. Trace a fixed asset with cost 24,000, accumulated depreciation 16,000 and proceeds 9,500; prove the simplified disposal gain of 1,500.
9. **Explain and hand over:** provide a concise evidence index, unresolved blockers, cleanup record and a close-control checklist. Identify the application version, country/region and optional features actually tested.

## Weighted formative rubric

Use this public rubric for self-review or coached review. It does not create a protected summative assessment or award an official credential.

| Criterion | Weight | Full evidence |
|---|---:|---|
| Company, migration and opening reconciliation | 20% | Dependency-valid import; balanced design; all subledgers reconcile without double counting |
| Security, dimensions and approvals | 20% | Limited-user tests; required/blocked/default tests; independent authority and transition evidence |
| Financial configuration and recognition | 20% | Correct posting map, dates, deferral and allocation calculations with preview evidence |
| Trade configuration and document processing | 15% | Correct units, locations and pricing boundaries; partial fulfilment remains traceable |
| Cash, close and fixed assets | 15% | Applications/bank/FX/asset results are independently explained and reconciled |
| Diagnosis, communication and cleanup | 10% | Corrective action targets cause; evidence is indexed and redacted; temporary changes are cleaned up |

For each criterion, award **0%** of its weight when no usable evidence is present, **50%** for a partly working result with a material unexplained gap, **75%** for a correct result with a minor evidence omission and **100%** when all stated acceptance evidence is present and independently explained. An arithmetic average cannot compensate for unsafe real payments, disclosed personal data or an unreconciled opening design: stop the exercise, correct the cause and review again.

## Submission and review

Use the approved learner workspace or coached session. Do not upload real company data or learner records to public course source. Record expected and actual results separately. If posting or a feature is unavailable, submit a reasoned design and preview with the precise blocker; label the affected operation **not demonstrated** rather than claiming success.

After the first review, choose the two weakest criteria, repeat the associated module lab with different values and update the evidence. Keep original findings so improvement can be observed. Use the mock's objective review alongside this capstone; neither result is Microsoft's official exam score.
