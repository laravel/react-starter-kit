// third party
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

// ==============================|| EDITOR - QUILL ||============================== //

export default function ReactQuillDemo({ value, onChange }: Props) {
  return (
    <ReactQuill
      modules={{
        toolbar: {
          container: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'video', 'formula'],
            ['image', 'code']
          ]
        }
      }}
      {...(value && { value })}
      {...(onChange && { onChange })}
    />
  );
}
