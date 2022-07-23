import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Page from "../components/Page";
import Container from "../components/Container";
import IndexLayout from "../layouts/IndexLayout";
import SongList from "../components/SongList";

interface SongEdge {
    node: {
        title: string;
        slug: string;
        description: string;
    };
}
interface StaticQueryProps {
    allSongsJson: {
        edges: SongEdge[];
    };
}

const IndexPage: React.FC = () => {
    return (
        <StaticQuery
            query={graphql`
                query SongsQuery {
                    allSongsJson {
                        edges {
                            node {
                                title
                                slug
                                description
                            }
                        }
                    }
                }
            `}
            render={(data: StaticQueryProps) => (
                <IndexLayout>
                    <Page>
                        <Container>
                            <SongList edges={data.allSongsJson.edges} />
                        </Container>
                    </Page>
                </IndexLayout>
            )}
        />
    );
};

export default IndexPage;
