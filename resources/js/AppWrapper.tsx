import { useDirectionEffect } from '@/hooks/use-direction-effect';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  useDirectionEffect();
  return <>{children}</>;
}
