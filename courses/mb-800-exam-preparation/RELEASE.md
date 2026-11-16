# Release evidence — 16 November 2026

State: **authored and tested; rendered CI verification in progress**.

## Verified

- Eight modules, eleven generated routes, eight lab briefs, 23 retrieval checks,
  100 original practice questions and three fictional case contexts.
- Current Microsoft certification page and skills outline checked on 16 November 2026.
- Primary/additional question references: 83 distinct official URLs returned HTTP 200.
- Course validator: identity, safe nested routes, local assets, remediation links,
  exact domain counts, shared-shell entries, manifest and eleven unique sitemap routes.
- Fifteen engine/DOM workflow tests: 500 random blueprint forms, unique selection,
  stable restore, marking, multi-select/order, expiry, feedback boundary, flagging,
  complete report retention and unavailable/corrupt storage behaviour.
- Existing Microsoft hub test suite: three tests pass. Existing MB-800 route
  validator: 28 pages pass. Full Microsoft static artifact builds.
- Canonical theme/header/footer resources returned HTTP 200.
- Companion www composition: nine tests pass against the generated source,
  including manifest/sitemap publication and course registration query prefill.

## Outstanding release evidence

- New PR checks are executing. The initial PR run
  [43797199079](https://github.com/skunkworks-academy/microsoft/actions/runs/43797199079)
  passed the build, source/DOM tests and route checks, then exposed Playwright
  1.55 incompatibility with the new Ubuntu 26 default runner. The workflow now
  pins Ubuntu 24.04 so the existing browser version has a supported OS.
- Rendered browser/axe/viewport tests have been added as a required workflow step,
  but are **not verified**. Local browser launch/preview was unavailable in this
  environment. No screenshots or visual pass is claimed.
- Independent human Business Central SME sign-off and execution of the new
  sandbox labs remain pending. The public content does not claim either occurred.
- Source PRs must pass the existing checks and review controls before merge.
  No checks or protections are bypassed.
- The intended canonical route returned HTTP 404 during this session. Production
  course publication, exam start/review, nested assets, global shell and sitemap
  still need verification after the normal deployment succeeds.

This file describes evidence, not an accreditation, WCAG conformance certificate
or official exam-equivalence claim.

