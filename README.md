# Microsoft Learning Hub

The live hub is https://microsoft.skunkworksacademy.com/ and is published by
`.github/workflows/az400-pages.yml` from `main`. The root `index.html`, `assets/`
and course snapshots are assembled by `AZ-400/web/build-static.cjs` into
`AZ-400/web/out/`. The workflow adds/verifies the Academy v10 shell and deploys
that artifact with GitHub Pages. `CNAME` retains the existing custom domain.
The historical README describing a redirect was superseded by the current hub.

## MB-800 Business Central Functional Consultant

Public route: https://microsoft.skunkworksacademy.com/MB-800/

`MB-800/` is a generated HTML snapshot from
`skunkworks-academy/MB-800-Business-Central-Functional-Consultant`.
See `MB-800-SOURCE.md` for its exact source revision and refresh instructions.
A static featured card provides discovery without JavaScript. The interactive
catalog also includes the course before and after live Microsoft Learn loading.

## Build and validate

```sh
cd AZ-400/web
npm ci
npm run build
cd ../..
python scripts/validate-course.py AZ-400/web/out/MB-800
python -m http.server 8000 --directory AZ-400/web/out
```

PRs run the existing build and MB-800 route validation without deployment.
Merging into `main` publishes using the existing Pages workflow. Changes to
`MB-800/**` trigger it, as do hub assets and the build script. The Jekyll
configuration and other course sources remain available; this workflow's
published output continues to be determined by the static build script.
