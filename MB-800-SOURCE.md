# MB-800 publication source

- Source repository: https://github.com/skunkworks-academy/MB-800-Business-Central-Functional-Consultant
- Source commit: d12fd7ea2dd50dc899d9d1f3ab42430d80d43af3
- Public route: https://microsoft.skunkworksacademy.com/MB-800/
- Generated with: `npm ci --ignore-scripts && npm run build` in the source repository.
- Output: course overview, setup guide, 26 HTML lab guides, original supporting files and MIT license.

To refresh, build the desired source revision, validate `site/` with its
`web/validate-course.py`, and replace only the generated `MB-800/` directory
with the contents of `site/`. Update this source commit, run the Microsoft
static build and route validation, then submit the publication PR. The existing
Pages workflow deploys the snapshot without cross-repository credentials.

The root featured listing and `assets/microsoft-catalog.js` entry route here.
The Academy course entry is retained when live Microsoft Learn data is loaded.
