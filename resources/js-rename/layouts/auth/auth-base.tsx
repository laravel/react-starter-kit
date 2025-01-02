import AuthLayoutTemplate from "@/layouts/auth/AuthSimpleLayout";

export default function AuthLayout({
    children,
    ...props // Collect all other props passed to this component
}: { children: React.ReactNode }) {
    return (
        <AuthLayoutTemplate {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}