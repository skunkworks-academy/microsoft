# MB-800 certification exam preparation

Course ID **MB-800-PREP**. Original Skunkworks Academy preparation for Microsoft
Certified: Dynamics 365 Business Central Functional Consultant Associate.

Canonical publication target:
`https://www.skunkworksacademy.com/courses/mb-800-exam-preparation/`.
The Microsoft repository owns the source. The website composes an immutable
source revision through its normal reviewed release workflow. See
`RELEASE.md` for the actual release state; a target URL does not imply deployment.

## Included

- Eight separately navigable study modules, worked examples and conceptual visuals.
- Eight sandbox lab briefs, links to the existing 26-lab MB-800 course, and 23 retrieval checks.
- Four-week study plan, practical capstone and weighted self-review rubric.
- 100 original, publicly inspectable practice items: 71 single-answer, 21 multiple-answer and eight ordering items. Eighteen items include three fictional case contexts.
- A 50-question, 100-minute mock and an untimed 20-question practice mode.
- Review flags, keyboard-operable sequencing, autosave/resume, automatic expiry submission,
  per-domain marking, option explanations, remediation links, print and JSON export.
- Ten completed reports retained per browser, with clear-data controls and no PII collection.

## Exam alignment

The baseline is Microsoft's skills measured as of **30 June 2026**, checked
**16 November 2026**. Setup is 20–25%, financials 30–35%, sales/purchasing setup
10–15% and operations 30–35%. Full mocks select 11/16/6/17 items respectively
without replacement and shuffle both question and option order. A stored seed
makes an attempt reproducible. The countdown uses a persisted wall-clock
deadline, so closing or suspending the page does not pause it.

Every item is worth one point. Multiple-answer and sequence items require the
complete correct answer, without partial credit or negative marking. An 80%
practice benchmark is an Academy study aid. It is not Microsoft's scaled
passing score of 700 and is not a validated prediction of exam success.

Microsoft does not publish its live question bank, exact item count per sitting
or selection algorithm. This original simulation matches published time and
skill ranges, not confidential content, proctoring, labs or the complete
Pearson VUE experience. Use Microsoft's official exam sandbox as well.

## Build and check

```sh
npm ci --prefix AZ-400/web
node scripts/build-mb800-prep.mjs
node scripts/validate-mb800-prep.mjs
node --test tests/mb800-engine.test.mjs tests/mb800-ui.test.mjs
npm test --prefix AZ-400/web
npm run build --prefix AZ-400/web
python3 scripts/validate-course.py AZ-400/web/out/MB-800
```

CI additionally installs Chromium and runs `scripts/test-mb800-browser.cjs`
against the built artifact at `MB800_TEST_ORIGIN` (default port 4173). That gate
checks all 11 routes at 390/768/1440 px in both themes, executes six practice
workflows, and saves screenshots and axe reports. Do not call this gate passed
until its actual run succeeds.

Generated HTML uses the canonical Academy brand stylesheet and central header
and footer directly, with the owned-shell marker that prevents duplicate
navigation. Source authoring files and instructor notes are excluded from the
Pages artifact. Public practice explanations are intentionally included.

No enrolment, protected grading, cross-device progress, authentication or
official certification award is implemented by this static guide. A request
for instructor support uses the Academy's course-specific enquiry route.

## Maintenance

After a Microsoft outline change, update the objective matrix, modules, bank,
blueprints and displayed revision together. Run validation and browser gates,
review the changed source, update the immutable www source pin, deploy and
verify the canonical pages, mock and sitemap. Record human SME review and
sandbox execution separately from automated/source review.

Official references:

- [Certification and duration](https://learn.microsoft.com/en-us/credentials/certifications/d365-business-central-functional-consultant-associate/)
- [Current skills outline](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-800)
- [Exam experience and question types](https://learn.microsoft.com/en-us/credentials/support/exam-duration-question-types)
- [Scoring and score reports](https://learn.microsoft.com/en-us/credentials/support/exam-scoring-reports)

