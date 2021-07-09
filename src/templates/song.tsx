import * as React from "react";
import { graphql } from "gatsby";

import IndexLayout from "../layouts/IndexLayout";
import Page from "../components/Page";
import Container from "../components/Container";
import styled from "styled-components";
import YouTube from "react-youtube";

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

interface YoutubeStringObj {
    indexStart: number;
    subLength: number;
    indexEnd: number;
    youtubeId: string;
}

const Heading = styled.h1`
    text-align: center;
`;

const SubHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    &:nth-child(odd) {
        &::before {
            content: "::";
            color: var(--onBackground);
        }
    }
`;

const SubHeadingInfo = styled.span`
    color: var(--onBackground);
    padding: 0 10px 0;
`;

const Description = styled.p`
    display: flex;
    justify-content: center;
`;

const VerseWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

const Verse = styled.div`
    grid-column: 2 / 3;
    margin-bottom: 20px;
`;

const Line = styled.p`
    margin-bottom: 5px;
`;

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
    const { songVers, music, title, videoUrl, date, author, description } = data.songsJson;
    const strObj: Partial<YoutubeStringObj> = {};
    if (!videoUrl.includes("none")) {
        const str = "/embed/";
        strObj.indexStart = videoUrl.indexOf(str);
        strObj.subLength = str.length;
        strObj.indexEnd = videoUrl.indexOf("?rel=0");
        strObj.youtubeId = videoUrl.substring(strObj.indexStart + strObj.subLength, strObj.indexEnd);
    }
    return (
        <IndexLayout>
            <Page>
                <Container>
                    <Heading>{title}</Heading>
                    <SubHeader>
                        <SubHeadingInfo>
                            {new Date(date).toLocaleDateString("da-DK", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </SubHeadingInfo>
                        {!author.includes("none") && <SubHeadingInfo>Tekst: {author}</SubHeadingInfo>}
                        {!music.includes("none") && <SubHeadingInfo>Musik: {music}</SubHeadingInfo>}
                    </SubHeader>

                    {!description.includes("null") && <Description>{description}</Description>}
                    <p>video: {videoUrl}</p>
                    <VerseWrapper>
                        {songVers.map((vers, i) => (
                            <Verse key={i}>
                                {vers.map((line, z) => (
                                    <Line key={z}>{line}</Line>
                                ))}
                            </Verse>
                        ))}
                    </VerseWrapper>
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
