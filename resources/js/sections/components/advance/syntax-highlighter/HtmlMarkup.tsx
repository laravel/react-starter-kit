// project-imports
import MainCard from '@/components/MainCard';
import useConfig from '@/hooks/useConfig';

// third-party
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ThemeMode } from '@/config';

// =============================|| SYNTAX HIGHLIGHTER - HTML MARKUP ||============================== //

export default function HtmlMarkupPage() {
  const { mode } = useConfig();
  return (
    <MainCard title="HTML Markup ">
      <p>Use the following code to use HTML syntax highlighter.</p>
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
          <pre>
            <code class="language-markup">
                HTML CODE ...
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
          <div class="card">
            <div class="card-header">
                <h5>Hello card</h5>
                <span> lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                <div class="card-header-right">
                    <i class="icofont icofont-rounded-down"/>
                    <i class="icofont icofont-refresh"/>
                    <i class="icofont icofont-close-circled"/>
                </div>
            </div>
            <div class="card-body">
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                </p>
            </div>
          </div>
      `}
      </SyntaxHighlighter>
    </MainCard>
  );
}
