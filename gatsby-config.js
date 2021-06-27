module.exports = {
    siteMetadata: {
        title: "De Sma",
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
        // {
        //     resolve: "gatsby-transformer-remark",
        //     options: {
        //         plugins: [
        //             {
        //                 resolve: "gatsby-remark-responsive-iframe",
        //                 options: {
        //                     wrapperStyle: "margin-bottom: 1rem",
        //                 },
        //             },
        //             "gatsby-remark-prismjs",
        //             "gatsby-remark-copy-linked-files",
        //             "gatsby-remark-smartypants",
        //             {
        //                 resolve: "gatsby-remark-images",
        //                 options: {
        //                     maxWidth: 1140,
        //                     quality: 90,
        //                     linkImagesToOriginal: false,
        //                 },
        //             },
        //         ],
        //     },
        // },
        "gatsby-transformer-json",
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: "https://desmaa.dk",
            },
        },
        "gatsby-plugin-typescript",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-image",
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                diaplayName: true,
            },
        },
    ],
};
