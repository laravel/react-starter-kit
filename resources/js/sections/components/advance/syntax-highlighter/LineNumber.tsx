// project-imports

import MainCard from '@/components/MainCard';
import useConfig from '@/hooks/useConfig';

// third-party
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ThemeMode } from '@/config';

// ============================|| SYNTAX HIGHLIGHTER - LINE NUMBER ||============================== //

export default function LineNumberPage() {
  const { mode } = useConfig();
  return (
    <MainCard title="Line Number">
      <p>Line number at the beginning of code lines.</p>
      <p>
        Obviously, this is supposed to work only for code blocks ( <code>{`<pre><code>`}</code> ) and not for inline code. Add class
        line-numbers to your desired <code>{`<pre>`}</code> and line-numbers plugin will take care.
      </p>
      <p>
        Optional: You can specify the data-start (Number) attribute on the <code>{`<pre>`}</code> element. It will shift the line counter.
      </p>
      <h6 className="m-t-20 f-w-600">Usage:</h6>
      {/* @ts-ignore https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/539 */}
      <SyntaxHighlighter
        language="javascript"
        style={dark}
        customStyle={{
          backgroundColor: mode === ThemeMode.DARK ? '#1e1e1e' : '#f5f5f5',
          color: mode === ThemeMode.DARK ? '#fff' : '#000',
          borderRadius: 2
        }}
      >
        {`
          <pre class="line-numbers">
            <code class="language-css">
                p {
                    color: red;
                }
            </code>
          </pre>
        `}
      </SyntaxHighlighter>

      <h6 className="m-t-20 f-w-600">Example:</h6>
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
          (function() {
            if (typeof self==='undefined' || !self.Prism || !self.document) {
                return;
            }
          });
        `}
      </SyntaxHighlighter>
    </MainCard>
  );
}
