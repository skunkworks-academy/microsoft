# MB-800 original practice bank review

Revision: 2026-11-16. Purpose: public formative preparation for the Microsoft Dynamics 365 Business Central Functional Consultant exam. These are original Academy scenarios. They are not Microsoft exam questions, reconstructed live items, a confidential question pool, or a prediction of any candidate's exam form.

## Blueprint and inventory

The objective map follows the official [MB-800 study guide effective 30 June 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-800), checked on 16 November 2026.

| Domain | Published weighting | Bank items | Bank share |
| --- | --- | ---: | ---: |
| Set up Business Central | 20–25% | 22 | 22% |
| Configure financials | 30–35% | 33 | 33% |
| Configure sales and purchasing | 10–15% | 12 | 12% |
| Perform Business Central operations | 30–35% | 33 | 33% |

There are 100 unique item IDs, BC-001 through BC-100: 71 single-choice, 21 multiple-selection and 8 ordering items. Eighteen items use three original fictional case contexts: Inanda Finance, Kalahari purchasing and Atlantic sales. Every case item carries its own context and can be answered independently. No question depends on a prior response.

The item text contains 13,167 words when counting stems, options, rationales and option feedback. This excludes metadata, source titles and repeated case-context text. It is a measured authoring count, not a seat-time estimate.

## Content and source checks

- Every item has a skill objective, domain, remediation-module link, correct response, rationale, feedback for every option and an official Microsoft source.
- All 83 distinct source URLs, including the one additional source, returned HTTP 200 in a parallel URL check on 16 November 2026. There are 82 distinct primary source URLs. Availability checks establish reachable pages; they are not product-environment tests.
- Option order was deterministically varied during authoring and IDs were remapped together with the correct responses and option feedback. Single-choice answer positions are A: 13, B: 20, C: 18 and D: 20. Delivery should shuffle eligible options again for each attempt.
- Multiple-selection prompts state the number of choices. Their answers are sets. Ordering responses are ordered sequences and include every action exactly once.
- All IDs are unique, all correct IDs occur in the corresponding options, and all options have feedback. Domain and type counts were verified after assembly.
- Scenarios and numerical examples were written for this resource. No exam dumps, live exam recollections or Microsoft practice-assessment questions were used.

## Technical distinctions reviewed

The review checked profile configuration versus permissions, effective permission grants, company-scoped security-group assignments, security filters versus normal viewing filters, opening journals versus direct imports into posted ledgers, and validation before applying configuration packages.

The finance items distinguish payment terms from payment methods, document dates from posting dates, closing a fiscal year from restricting posting, customer/vendor control accounts from revenue or expense accounts, general posting setup from inventory posting setup, fixed-asset books from classifications, and recurring-journal allocation keys from allocation accounts. The arithmetic items state their tax, rounding and full-year assumptions.

Operations items distinguish Open in Excel from Edit in Excel, personalization from profile customization, receipt/shipment from invoicing, undoing eligible uninvoiced documents from credit-memo corrections, prepayment invoicing from merely setting payment terms, unapplication from duplicate receipts, late-cost forwarding from revaluation, and in-transit transfers from immediate reclassification. Ordering questions specify their starting state and dependency assumptions.

## Delivery and scoring limits

The duration can mirror Microsoft's published 100-minute exam time. The size and domain balance of an Academy mock form are authored simulation choices. Microsoft does not publish the live item pool or exact form-assembly algorithm, so this resource cannot reproduce those.

Results are formative practice feedback. Any Academy percentage, domain score, readiness threshold or full-credit scoring rule must be labelled as an Academy rule. A raw percentage is not Microsoft's scaled score and must never be converted into a claim that a learner has passed MB-800. The simulator does not establish certification, proctoring or assessment security.

Because this is a public practice bank, answers and explanations are inspectable in the repository and browser assets. Hiding feedback until submission improves practice flow but does not make the bank confidential. Controlled summative testing would require a separate protected service and private bank.

## Review status

Authoring, structural validation, source availability and editorial technical review are complete. A named independent Business Central subject-matter expert has not signed off this bank. No claim is made that these scenarios have been executed in a licensed Business Central tenant. Browser behavior, accessibility, actual deployment and live route checks belong to the release evidence for the course implementation.

Recheck the official objective guide and feature documentation before the next content release or whenever Microsoft announces an exam update. Retire or revise ambiguous items using learner feedback and independent technical review.

## Independent editorial pass, 16 November 2026

A second automated editorial review read all 100 items and checked uncertain security-auditing and alternative-posting-group claims against Microsoft documentation. This is not a human SME sign-off.

- BC-021 and BC-086 now state the procedural ordering constraints explicitly, so independently configurable setup tasks are not presented as universal product dependencies.
- BC-029, BC-034, BC-035, BC-038, BC-039, BC-043, BC-044, BC-054, BC-058, BC-060, BC-071 and BC-092 replace weak distractors with adjacent Business Central controls. Explanations were updated with the changed options. Correct response IDs and domain/type counts are unchanged.
- BC-039 distinguishes journal entry-time No. Series from Posting No. Series. BC-043 describes the Payment Made checklist, distinguishing Payment Registration from a cash receipt journal or bank reconciliation. BC-038 explicitly distinguishes batch working sets from access-control isolation.
- BC-068 through BC-073 now remediate to module 07, where page personalization, filters, inspection, Edit in Excel and analysis mode are taught.

The bank still has not been calibrated against actual candidate performance or executed as a licensed-tenant test suite. Retain the public formative assessment label and review learner feedback for ambiguous items.
