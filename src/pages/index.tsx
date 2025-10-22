import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Page from "../components/Page";
import Container from "../components/Container";
import IndexLayout from "../layouts/IndexLayout";
import SongList from "../components/SongList";

interface SongEdge {
    node: {
        frontmatter: {
            title: string;
            slug: string;
            description: string;
        };
    };
}
interface StaticQueryProps {
    allMdx: {
        edges: SongEdge[];
    };
}

const IndexPage: React.FC = () => {
    return (
        <StaticQuery
            query={graphql`
                query SongsQuery {
                    allMdx(sort: { frontmatter: { date: DESC } }) {
                        edges {
                            node {
                                frontmatter {
                                    title
                                    slug
                                    description
                                }
                            }
                        }
                    }
                }
            `}
            render={(data: StaticQueryProps) => (
                <IndexLayout>
                    <Page>
                        <Container>
                            <SongList edges={data.allMdx.edges} />
                        </Container>
                    </Page>
                </IndexLayout>
            )}
        />
    );
};

export default IndexPage;
