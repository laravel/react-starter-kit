import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import SimpleLayout from '@/layouts/Simple';

import AppsSection from '@/sections/landing/AppsBlock';
import CallToActionBlock from '@/sections/landing/CallToActionBlock';
import FeatureBlock from '@/sections/landing/FeatureBlock';
import FeatureBlock2 from '@/sections/landing/FeatureBlock2';
import HeaderSection from '@/sections/landing/HeaderBlock';
import HelpFullComponent from '@/sections/landing/HelpFullBlock';
import LayoutsBlock from '@/sections/landing/LayoutsBlock';
import NumberBlock from '@/sections/landing/NumberBlock';
import PricingBlock from '@/sections/landing/PricingBlock';
import TestimonialBlock from '@/sections/landing/TestimonialBlock';
import TrustedBySection from '@/sections/landing/TrustedByBlock';

import '@assets/scss/landing.scss';

export default function Welcome() {
    

    return (
        <>
            <SimpleLayout>
                <header className="header" id="home">
                    <HeaderSection />
                </header>
                <FeatureBlock />
                <NumberBlock />
                <LayoutsBlock />
                <CallToActionBlock />
                <HelpFullComponent />
                <FeatureBlock2 />
                <AppsSection />
                <PricingBlock />
                <TestimonialBlock />
                <TrustedBySection />
            </SimpleLayout>
        </>
    );
}
