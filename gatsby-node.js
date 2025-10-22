const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    const analyzerMode = process.env.INTERACTIVE_ANALYZE ? "server" : "json";

    if (stage === "build-javascript") {
        actions.setWebpackConfig({
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode,
                    reportFileName: `./__build/bundlereport.json`,
                }),
            ],
        });
    }
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//     const { createNodeField } = actions;

//     // Sometimes, optional fields tend to get not picked up by the GraphQL
//     // interpreter if not a single content uses it. Therefore, we're putting them
//     // through `createNodeField` so that the fields still exist and GraphQL won't
//     // trip up. An empty string is still required in replacement to `null`.

//     switch (node.internal.type) {
//         case "MarkdownRemark": {
//             const { permalink, layout } = node.frontmatter;
//             const { relativePath } = getNode(node.parent);

//             let slug = permalink;

//             if (!slug) {
//                 slug = `/${relativePath.replace(".md", "")}/`;
//             }

//             // Used to generate URL to view this content.
//             createNodeField({
//                 node,
//                 name: "slug",
//                 value: slug || "",
//             });

//             // Used to determine a page layout.
//             createNodeField({
//                 node,
//                 name: "layout",
//                 value: layout || "",
//             });
//             break;
//         }
//         default: {
//             throw Error("Error in gastby node");
//         }
//     }
// };

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const allMdxSongs = await graphql(`
        {
            allMdx {
                edges {
                    node {
                        frontmatter {
                            slug
                            layout
                        }
                        internal {
                            contentFilePath
                        }
                    }
                }
            }
        }
    `);

    if (allMdxSongs.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query.');
    }

    const songTemplate = path.resolve(`./src/templates/song.tsx`);

    allMdxSongs.data.allMdx.edges.forEach(({ node }) => {
        const { slug, layout } = node.frontmatter;

        createPage({
            path: `sange/${slug}`,
            component: `${songTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                slug,
            },
        });
    });
};
