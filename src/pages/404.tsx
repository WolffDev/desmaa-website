import React from "react";
import { Link } from "gatsby";
import Page from "../components/Page";
import IndexLayout from "../layouts/IndexLayout";
import Container from "../components/Container";

// styles

// markup
const NotFoundPage = () => {
    return (
        <IndexLayout>
            <Page>
                <Container>
                    <h1>Ikke fundet</h1>
                </Container>
            </Page>
        </IndexLayout>
    );
};

export default NotFoundPage;
