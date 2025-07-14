import { useDirectionEffect } from '@/hooks/use-direction-effect';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    useDirectionEffect(); // <-- applies RTL or LTR on language change
    return <>{children}</>;
}
