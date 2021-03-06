import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import Nav from "../components/Nav";
import LayoutMain from "../components/LayoutMain";
import Footer from "../components/Footer";

interface StaticQueryProps {
    site: {
        siteMetadata: {
            title: string;
            description: string;
            keywords: string;
        };
    };
}

interface IProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const IndexLayout: React.FC<IProps> = ({ children, title, description, keywords }) => (
    <StaticQuery
        query={graphql`
            query IndexLayoutQuery {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `}
        render={(data: StaticQueryProps) => {
            return (
                <>
                    <Helmet
                        title={title || data.site.siteMetadata.title}
                        meta={[
                            {
                                name: "description",
                                content: description || data.site.siteMetadata.description,
                            },
                            { name: "keywords", content: keywords || data.site.siteMetadata.keywords },
                        ]}
                    />
                    <Nav title={data.site.siteMetadata.title} />
                    <LayoutMain>{children}</LayoutMain>
                    <Footer />
                </>
            );
        }}
    />
);

export default IndexLayout;
