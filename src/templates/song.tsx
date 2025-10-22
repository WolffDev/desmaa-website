import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import YouTube from "react-youtube";

import IndexLayout from "../layouts/IndexLayout";
import Page from "../components/Page";
import Container from "../components/Container";
import Divider from "../components/shared/Divider";
import { breakpoints, dimensions } from "../styles/variables";
import AddToFavourite from "../components/AddToFavourite";

interface PageTemplateProps {
    data: {
        mdx: {
            frontmatter: {
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
    };
    children: React.ReactNode;
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
    flex-direction: column;
    align-items: start;
    margin-bottom: 30px;

    &:nth-child(odd) {
        &::before {
            content: "::";
            color: var(--onBackground);
        }
    }

    @media (min-width: ${breakpoints.sm}px) {
        flex-direction: row;
        justify-content: center;
    }
`;

const SubHeadingInfo = styled.span`
    color: var(--shadesGrey);
    font-size: ${dimensions.fontSize.small}px;
    padding: 0 10px 0;
`;

const Description = styled.p`
    margin: 0 auto;
    max-width: ${breakpoints.md}px;
`;

const FavouriteWrapper = styled.p`
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 0 auto;
    max-width: ${breakpoints.md}px;
    height: 45px;
`;

const VerseWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

const MDXContent = styled.div`
    grid-column: 2 / 3;

    h2 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
        color: var(--onBackground);

        &:first-child {
            margin-top: 0;
        }
    }

    p {
        margin-bottom: 5px;
        line-height: 1.8;
        white-space: pre-line;
    }
`;

const Verse = styled.div`
    grid-column: 2 / 3;
    margin-bottom: 30px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Line = styled.p`
    margin-bottom: 5px;
`;

const YoutubeWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const PageTemplate: React.FC<PageTemplateProps> = ({ data, children }) => {
    const { frontmatter } = data.mdx;
    const { music, title, videoUrl, date, author, description, tags, slug } = frontmatter;

    const videoObj: Partial<YoutubeStringObj> = {};
    const containsVideo = !videoUrl.includes("none");

    if (containsVideo) {
        const str = "/embed/";
        videoObj.indexStart = videoUrl.indexOf(str);
        videoObj.subLength = str.length;
        videoObj.indexEnd = videoUrl.indexOf("?");
        videoObj.youtubeId = videoUrl.substring(videoObj.indexStart + videoObj.subLength, videoObj.indexEnd);
    }

    return (
        <IndexLayout description={description} title={title} keywords={tags.join(" ")}>
            <Page>
                <Container>
                    <Heading>{title}</Heading>
                    <SubHeader>
                        <SubHeadingInfo>
                            Sang tilføjet d.{" "}
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

                    <FavouriteWrapper>
                        <AddToFavourite slug={slug} title={title} />
                    </FavouriteWrapper>
                    <Divider />

                    <VerseWrapper>
                        <MDXContent>{children}</MDXContent>
                    </VerseWrapper>

                    <Divider />

                    {containsVideo && (
                        <YoutubeWrapper>
                            <YouTube videoId={videoObj.youtubeId} opts={{ width: "auto" }} />
                        </YoutubeWrapper>
                    )}
                </Container>
            </Page>
        </IndexLayout>
    );
};

export default PageTemplate;

export const query = graphql`
    query PageTemplateQuery($slug: String!) {
        mdx(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
                videoUrl
                author
                music
                description
                tags
                slug
                date
            }
        }
    }
`;
