import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import BasicUsage from '@/sections/components/advance/syntax-highlighter/BasicUsage';
import CssMarkup from '@/sections/components/advance/syntax-highlighter/CssMarkup';
import HtmlMarkup from '@/sections/components/advance/syntax-highlighter/HtmlMarkup';
import LineHighlight from '@/sections/components/advance/syntax-highlighter/LineHighlight';
import LineNumber from '@/sections/components/advance/syntax-highlighter/LineNumber';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| ADVANCED - SYNTAX HIGHLIGHTER ||============================== //

export default function SyntaxHighlighterPage() {
  return (
    <>
      <AppLayout>
        <Head title="Syntax Highlighter" />
        <ReferenceHeader
          caption="Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind."
          link="https://github.com/react-syntax-highlighter/react-syntax-highlighter#readme"
        />
        <BasicUsage />
        <HtmlMarkup />
        <CssMarkup />
        <LineNumber />
        <LineHighlight />
      </AppLayout>
    </>
  );
}
