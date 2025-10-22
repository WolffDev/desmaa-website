module.exports = {
    siteMetadata: {
        title: "De Smaa",
        description: "",
        keywords: "sange, børn, godnat, godnat sange, sange til børn",
        siteUrl: "https://desmaa.dk",
        author: {
            name: "Desmaa",
            url: "https://desmaa.dk",
            email: "kontakt@desmaa.dk",
        },
    },
    plugins: [
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "sange",
                path: `${__dirname}/src/content/songs`,
            },
        },
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [".mdx", ".md"],
            },
        },
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: "https://desmaa.dk",
            },
        },
        "gatsby-plugin-typescript",
        "gatsby-plugin-dark-mode",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-styled-components",
            options: {
                displayName: true,
            },
        },
        "gatsby-plugin-sitemap",
    ],
};
