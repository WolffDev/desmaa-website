import * as React from "react";
import { graphql } from "gatsby";

import IndexLayout from "../layouts/IndexLayout";
import Page from "../components/Page";
import Container from "../components/Container";

interface PageTemplateProps {
    data: {
        site: {
            siteMetadata: {
                title: string;
                description: string;
                author: {
                    name: string;
                    url: string;
                };
            };
        };
        songsJson: {
            title: string;
        };
    };
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => (
    <IndexLayout>
        <Page>
            <Container>
                <h1>{data.songsJson.title}</h1>
            </Container>
        </Page>
    </IndexLayout>
);

export default PageTemplate;

export const query = graphql`
    query PageTemplateQuery($slug: String!) {
        site {
            siteMetadata {
                title
                description
                author {
                    name
                    url
                }
            }
        }
        songsJson(slug: { eq: $slug }) {
            id
            songVers
            music
            slug
            tags
            title
            videoUrl
            date
            description
            author
        }
    }
`;
