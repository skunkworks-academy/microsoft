import createMDX from "@next/mdx";
import path from "path";

const withMDX = createMDX({ extension: /\.mdx?$/ });

export default withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  outputFileTracingRoot: path.join(process.cwd()),
  experimental: { mdxRs: true },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.0.191:3000"
  ]
});
