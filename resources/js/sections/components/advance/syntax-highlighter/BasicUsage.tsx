// project-imports
import MainCard from '@/components/MainCard';

// third-party
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows';
import SyntaxHighlighter from 'react-syntax-highlighter';
import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';

// ============================|| SYNTAX HIGHLIGHTER - BASIC USAGE ||============================== //

export default function BasicUsagePage() {
  const { mode } = useConfig();
  return (
    <MainCard title="Basic Usage">
      <p>
        The recommended way to mark up a code block (both for semantics and for Prism) is a <code> {`<pre>`} </code> element with a{' '}
        <code>{`<code>`}</code> element inside, like so:
      </p>
      <h6 className="m-t-20 f-w-600">Code:</h6>
      {/* @ts-ignore https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/539 */}
      <SyntaxHighlighter
        language="javascript"
        style={dark}
        customStyle={{
          backgroundColor: mode === ThemeMode.DARK ? '#1e1e1e' : '#f5f5f5',
          borderRadius: 2
        }}
      >
        {`
<pre>
  <code class="language-css">
      p {
        color: #1abc9c
        }
  </code>
 </pre>
 `}
      </SyntaxHighlighter>
    </MainCard>
  );
}
