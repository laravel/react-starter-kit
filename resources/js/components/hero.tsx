import type React from 'react';
import MasonryGallery from './masonryGallery';
import { HeroProps } from '@/pages/type';





const Hero: React.FC<HeroProps> = ({ headline, subtext, showCta = true, ctaText = 'Start Your Collection', ctaLink = '/create',  }) => {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-16 text-center">
                    <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">{headline}</h1>
                    <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-600">{subtext}</p>
                    {showCta && (
                        <a
                            href={ctaLink}
                            className="bg-primary hover:bg-primary-dark inline-block transform rounded-lg px-8 py-4 text-lg font-medium text-white shadow-lg transition-colors duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {ctaText}
                        </a>
                    )}
                </div>

                <div className="mb-12 px-2">
                    <MasonryGallery />
                </div>
            </div>
        </div>
    );
};

export default Hero;
