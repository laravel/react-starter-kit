import { lazy, type ReactNode, Suspense } from 'react';

// project-imports
import Loader from '@/components/Loader';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));
interface SimpleLayout {
    children: ReactNode
}
// ==============================|| SIMPLE - LAYOUT ||============================== //
export default ({ children, ...props }: SimpleLayout) => (
    <Suspense fallback={<Loader />}>
      <div
        data-pc-preset="preset-1"
        data-pc-sidebar-caption="true"
        data-pc-direction="ltr"
        data-pc-theme="light"
        className="landing-page"
        {...props}
      >
        <Header />
        {children}
        <FooterBlock />
      </div>
    </Suspense>
  );
