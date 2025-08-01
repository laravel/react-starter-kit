import { useEffect, useState } from 'react';

// third-party
import { Editor } from '@tinymce/tinymce-react';

// project-imports
import MainCard from '@/components/MainCard';
import { getResolvedTheme, setResolvedTheme } from '@/components/setResolvedTheme';
import { ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

const initialValues = `<p style="text-align: center;">
<img title="TinyMCE Logo" src="//www.tiny.cloud/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" />
</p>

<h2 style="text-align: center;">Welcome to the TinyMCE editor demo!</h2>
<h5 style="text-align: center;" data-mce-style="text-align: center;">Note, this includes some "enterprise/premium" features.<br>Visit the <a href="https://www.tiny.cloud/pricing" data-mce-href="https://www.tiny.cloud/pricing">pricing page</a> to learn more about our premium plugins.</h5>

<p>Please try out the features provided in this full featured example.</p>
<h2>Got questions or need help?</h2>

<ul>
<li>Our <a href="https://www.tiny.cloud/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
<li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
<li>We also offer enterprise-grade support as part of <a href="https://www.tiny.cloud/pricing">TinyMCE premium plans</a>.</li>
</ul>

<h2>A simple table to play with</h2>

<table style="border-collapse: collapse; width: 100%;" border="1">
<thead>
  <tr>
    <th>Product</th>
    <th>Cost</th>
    <th>Really?</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>TinyMCE</td>
    <td>Free</td>
    <td>YES!</td>
  </tr>
  <tr>
    <td>Plupload</td>
    <td>Free</td>
    <td>YES!</td>
  </tr>
</tbody>
</table>

<h2>Found a bug?</h2>

<p>
If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.
</p>

<h2>Finally ...</h2>

<p>
Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.
</p>
<p>
Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.
</p>`;

// =============================|| TINY MCE - ALL FEATURES ||============================== //

export default function TinyMCEwithAllFeatures() {
  const { mode } = useConfig();
  const resolvedTheme = getResolvedTheme(mode);
  setResolvedTheme(mode);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
  }, [resolvedTheme]);

  return (
    <MainCard title="TinyMCE with All Features">
      <Editor
        key={editorKey}
        initialValue={initialValues}
        init={{
          height: 500,
          menubar: false,
          toolbar: 'undo redo | cut copy paste | bold italic | link image | alignleft aligncenter alignright alignjustify',
          plugins: 'link image code',
          statusbar: false,
          skin: resolvedTheme === ThemeMode.DARK ? 'oxide-dark' : 'oxide',
          content_css: resolvedTheme === ThemeMode.DARK ? 'dark' : 'default',
          content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }'
        }}
      />
    </MainCard>
  );
}
