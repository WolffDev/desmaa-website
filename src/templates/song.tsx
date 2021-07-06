import * as React from "react";
import { graphql } from "gatsby";

import IndexLayout from "../layouts/IndexLayout";
import Page from "../components/Page";
import Container from "../components/Container";
import styled from "styled-components";

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
            id: string;
            songVers: string[][];
            music: string;
            slug: string;
            tags: string[];
            title: string;
            videoUrl: string;
            date: string;
            description: string;
            author: string;
        };
    };
}

const Verse = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Line = styled.p`
    margin-bottom: 5px;
`;

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
    const { id, songVers, music, slug, tags, title, videoUrl, date, author, description } = data.songsJson;
    return (
        <IndexLayout>
            <Page>
                <Container>
                    <h1>{data.songsJson.title}</h1>
                    {songVers.map((vers, i) => (
                        <Verse key={i}>
                            {vers.map((line, z) => (
                                <Line key={z}>{line}</Line>
                            ))}
                        </Verse>
                    ))}
                </Container>
            </Page>
        </IndexLayout>
    );
};

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
