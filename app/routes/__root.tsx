import { Outlet, ScrollRestoration, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header } from "~/components/Header";
import "~/styles/globals.css";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "De Smaa - Danske Børnesange",
            },
            {
                name: "description",
                content: "Samling af danske børnesange med tekster og melodier",
            },
        ],
        scripts: [
            {
                defer: true,
                "data-domain": "desmaa.dk",
                src: "https://plausible.io/js/script.js",
            },
        ],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Header />
            <main className="pt-20 pb-12 min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="da" className="h-full">
            <head>
                <HeadContent />
            </head>
            <body className="h-full bg-bg-light dark:bg-bg-dark text-on-bg-light dark:text-on-bg-dark transition-colors duration-200">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

function Footer() {
    return (
        <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <p className="mb-2">© {new Date().getFullYear()} De Smaa. Alle rettigheder forbeholdes.</p>
            <p className="text-xs">
                Background image from{" "}
                <a
                    href="https://www.freepik.com/vectors/background"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    balasoiu - www.freepik.com
                </a>
            </p>
        </footer>
    );
}
