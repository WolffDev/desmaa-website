import * as React from "react";
import { StaticQuery, graphql, Link } from "gatsby";

import Page from "../../components/Page";
import Container from "../../components/Container";
import IndexLayout from "../../layouts/IndexLayout";

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

const SongsPage: React.FC = ({ children }) => (
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
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </Container>
                </Page>
            </IndexLayout>
        )}
    />
);

export default SongsPage;
