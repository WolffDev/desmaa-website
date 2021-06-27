import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { ThemeProvider } from "styled-components";

import Header from "../components/Header";
import LayoutRoot from "../components/LayoutRoot";
import LayoutMain from "../components/LayoutMain";
import { useTheme } from "../utils/useTheme";

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
            const { theme, themeLoaded, getFonts } = useTheme();
            const [selectedTheme, setSelectedTheme] = useState(theme);

            useEffect(() => {
                setSelectedTheme(theme);
            }, [themeLoaded]);

            return (
                <>
                    {themeLoaded && (
                        <ThemeProvider theme={selectedTheme}>
                            <LayoutRoot>
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
                            </LayoutRoot>
                        </ThemeProvider>
                    )}
                </>
            );
        }}
    />
);

export default IndexLayout;
