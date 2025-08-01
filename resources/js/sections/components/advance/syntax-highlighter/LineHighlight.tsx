// project-imports
import MainCard from '@/components/MainCard';

// third-party
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows';
import SyntaxHighlighter from 'react-syntax-highlighter';
import useConfig from '@/hooks/useConfig';
import { ThemeMode } from '@/config';

// =============================|| SYNTAX HIGHLIGHTER - LINE HIGHLIGHT ||============================== //

export default function LineHighlightPage() {
  const { mode } = useConfig();
  return (
    <MainCard title="Line Highlight">
      <p>Highlights specific lines and/or line ranges.</p>
      <p>
        You specify the lines to be highlighted through the data-line attribute on the <code>{`<pre>`}</code> element, in the following
        simple format:
      </p>
      <ol>
        <li>A single number refers to the line with that number</li>
        <li>Ranges are denoted by two numbers, separated with a hyphen (-)</li>
        <li>Multiple line numbers or ranges are separated by commas.</li>
        <li>Whitespace is allowed anywhere and will be stripped off.</li>
      </ol>
      <h6 className="m-t-20 f-w-600">Usage:</h6>
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
          <pre data-line="2,4, 8-10">
            <code class="language-css">
                p {
                    color: red
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
          pre.line-numbers {
            position: relative;
            padding-left: 3.8em;
            counter-reset: linenumber;
          }

          pre.line-numbers > code {
            position: relative;
          }

          .line-numbers .line-numbers-rows {
            position: absolute;
            pointer-events: none;
            top: 0;
            font-size: 100%;
            left: -3.8em;
            width: 3em;
            /* works for line-numbers below 1000 lines */
            letter-spacing: -1px;
            border-end: 1px solid #999;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}
      </SyntaxHighlighter>
    </MainCard>
  );
}
