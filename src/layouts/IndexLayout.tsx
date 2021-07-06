import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import Header from "../components/Header";
import LayoutMain from "../components/LayoutMain";

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
                    <Header title={data.site.siteMetadata.title} />
                    <LayoutMain>{children}</LayoutMain>
                </>
            );
        }}
    />
);

export default IndexLayout;
