# Facilitator and review guide

Course: **MB-800-PREP**. Content revision: **1.0.0**. Baseline: Microsoft MB-800 skills measured as of **30 June 2026**.

## Before delivery

1. Read the current official study guide and compare its dated objective map with `blueprint.md`. Record any changed exam scope before reusing this package.
2. Confirm an authorised Business Central sandbox, suitable licences, region, application version, company experience and extension/feature set. Do not imply the public website provisions a lab tenant.
3. Use separate disposable companies or agreed shared-company conventions. Replace all personal, banking and customer information with synthetic examples. Block real outgoing payment instructions and notification recipients.
4. Confirm each learner can navigate with keyboard, zoom the guide, use its text visuals and access a suitable alternative to any unavailable integration exercise.
5. Review configured accounting policies with the finance owner. The teaching examples exclude tax and incidental costs where stated and do not prescribe real tax/accounting policy.

## How to teach the eight modules

Begin each module with the business decision. Ask the learner to predict a result before clicking an action. After the action, require evidence from the relevant ledger or application state. If the interface differs from the guide, locate the capability through supported search and current Microsoft documentation rather than forcing a screenshot match.

| Module | Teaching emphasis | Useful diagnostic prompt |
|---|---|---|
| 1 | Migration dependencies, opening control totals and least privilege | What would prove this opening receivables balance exists exactly once? |
| 2 | Different controls solve different problems | Is this a dimension, approval, permission, scheduling or notification failure? |
| 3 | Explain account selection and recognition dates | Which exact posting-group combination chose that account? |
| 4 | Distinguish masters, transactions, applications and G/L | Can the invoice remain open while the net customer balance is small? |
| 5 | Separate quantities, units, costing and pricing conditions | What changed when the quantity moved from nine to ten? |
| 6 | Read the posted/payment/fulfilment state before correcting | Which original quantities and amounts must remain after the return? |
| 7 | Diagnose the layer before posting an adjustment | Is the discrepancy in quantity, valuation or G/L timing? |
| 8 | Reconcile settlement, bank, currency and asset effects | Does this action correct an application or duplicate a cash movement? |

## Feedback and practical review

Use the public module checks for retrieval practice. Ask learners to explain why the answer follows from the scenario and why a plausible alternative does not. The checks are formative and their answers are intentionally public.

For lab review, require the defined evidence, not a screenshot alone. A useful evidence record contains the synthetic company, application version, date, test steps, expected result, actual result and relevant document/entry references. Keep redacted personal copies in the approved learning system or learner workspace; do not upload them to public GitHub.

Distinguish these outcomes:

- **Demonstrated:** the learner produced the required result and explained it.
- **Needs practice:** the learner completed the action but cannot explain the business/ledger effect or missed a boundary case.
- **Blocked:** the capability, permission, licence or environment is unavailable. Record the actual blocker and use a reasoned design/preview alternative without claiming the blocked operation succeeded.

## Timed mock debrief

The mock is original, public formative practice. Its duration follows the published exam duration, while its bank and selection rules are Academy choices. It must never be represented as Microsoft's live pool, a leaked/recalled assessment, a predictor with validated pass probability or the official Pearson VUE interface.

After completion, review unanswered items first, then incorrect items by objective. Ask the learner to classify each miss as knowledge, reading/constraint, calculation, application-state or time-management error. Link each miss to a module section and one practical task. Retest using different values/scenarios after remediation rather than repeating an item until its wording is memorised.

A suggested coached revision rule is to rework any domain with weak performance and any practical task that cannot be explained independently. This is an Academy teaching decision. Microsoft determines its own scaled-score passing standard.

## Human SME review checklist

- [ ] Current official study-guide effective date and domain weights agree with the manifest.
- [ ] Every objective group has both teaching and observable evidence.
- [ ] Every numerical example is independently calculated.
- [ ] Product operations are accurate for the declared test environment.
- [ ] Corrections state eligibility and preserve audit history.
- [ ] Copilot/agent guidance acknowledges availability, permissions and governance.
- [ ] Localisation/licence/extension dependencies are explicit where relevant.
- [ ] Question distractors are plausible, explanations are correct and no recalled vendor items are used.
- [ ] Public formative nature, local-only result limits and lack of official score equivalence are visible.

Record reviewer name/role, review date, reviewed commit, scope, findings and resolution in the release evidence. Do not mark this checklist complete without actual review.
