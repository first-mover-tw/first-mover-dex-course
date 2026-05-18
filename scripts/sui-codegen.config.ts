import type { SuiCodegenConfig } from "@mysten/codegen";

const config: SuiCodegenConfig = {
  output: "./_generated",
  packages: [
    // {
    //   package: "@local-pkg/amm",
    //   packageName: "amm",
    //   path: "../amm/",
    // },
    {
      package: "@local-pkg/jarek_coin",
      packageName: "jarek_coin",
      path: "../jarek_coin/",
    },
  ],
};

export default config;
