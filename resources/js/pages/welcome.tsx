import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { NavPublic } from "@/components/nav-public";
import { HeroMain } from "@/components/hero-main";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <HeroMain />
        </>
    );
}
