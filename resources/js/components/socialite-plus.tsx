import FacebookIcon from "@/components/icons/facebook";
import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import GitHubIcon from "./icons/github";
import LinkedInIcon from "./icons/linkedin";

interface Provider {
    name: string;
    icon: "FacebookIcon" | "GitHubIcon" | "GoogleIcon" | "LinkedInIcon";
    branded: boolean;
}

interface SocialitePlusProps {
    providersConfig: {
        button_text: string;
        providers: Provider[];
    };
}

const getProviderClasses = (provider: Provider) => {
    if (!provider.branded) return;

    const styles: Record<string, string> = {
        Google: "bg-red-500 hover:bg-red-600 hover:text-white text-white",
        Facebook: "bg-blue-600 hover:bg-blue-700 hover:text-white text-white",
        GitHub: "bg-gray-900 hover:bg-gray-700 hover:text-white text-white",
        LinkedIn: "bg-blue-700 hover:bg-blue-800 hover:text-white text-white",
    };

    return styles[provider.name] || "";
};

const iconMap = {
    GoogleIcon: GoogleIcon,
    FacebookIcon: FacebookIcon,
    GitHubIcon: GitHubIcon,
    LinkedInIcon: LinkedInIcon,
};

export default function SocialitePlus({ providersConfig }: SocialitePlusProps) {
    return (
        <>
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <div className="bg-border h-px w-full" />
                </div>
                or
                <div className="flex-1">
                    <div className="bg-border h-px w-full" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {Object.values(providersConfig.providers).map((provider) => {
                    const IconComponent = iconMap[provider.icon];
                    return (
                        <Button
                            key={provider.name}
                            type="button"
                            dusk={`${provider.name}-login-button`}
                            variant="outline"
                            className={getProviderClasses(provider)}
                            tabIndex={5}
                            onClick={() =>
                                (window.location.href = route(
                                    "social.redirect",
                                    {
                                        provider: provider.name,
                                    },
                                ))
                            }
                        >
                            {IconComponent && (
                                <IconComponent className="size-6" />
                            )}
                            {providersConfig.button_text.replace(
                                "{provider}",
                                provider.name,
                            )}
                        </Button>
                    );
                })}
            </div>
        </>
    );
}
