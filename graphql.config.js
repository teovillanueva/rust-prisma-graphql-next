const path = require("path");

/** @type {import("graphql-config").IGraphQLConfig} */
const config = {
  projects: {
    default: {
      documents:
        path.join(__dirname, "./apps/front-end") + "/**/*.{ts,tsx,graphql,gql}",
      schema: ["http://localhost:8000/graphql"],
      extensions: {
        codegen: {
          generates: {
            "./apps/front-end/__generated__/page.tsx": {
              plugins: ["graphql-codegen-apollo-next-ssr"],
              preset: "import-types",
              presetConfig: {
                typesPath: "./graphql",
              },
              config: {
                documentMode: "external",
                importDocumentNodeExternallyFrom: "./graphql",
                reactApolloVersion: 3,
                withHooks: true,
                contextType: "ApolloClientContext",
                contextTypeRequired: true,
                apolloClientInstanceImport: "../lib/with-apollo",
                apolloStateKey: "__APOLLO_STATE__",
              },
            },
            "./apps/front-end/__generated__/apollo-helpers.ts": {
              plugins: ["typescript-apollo-client-helpers"],
            },
            "./apps/front-end/__generated__/graphql.ts": {
              plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
              ],
            },
          },
        },
      },
    },
  },
};

module.exports = config;
