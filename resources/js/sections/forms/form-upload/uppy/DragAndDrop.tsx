import { useEffect, useRef, useState } from 'react';

// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

// third-party
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

// project-imports
import MainCard from '@/components/MainCard';

// =====================|| UPPY - DRAG AND DROP ||====================== //

export default function FileUploader() {
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState('');
  const uppyRef = useRef<Uppy | null>(null);

  if (!uppyRef.current) {
    uppyRef.current = new Uppy({
      autoProceed: false
    });
  }

  useEffect(() => {
    const uppy = uppyRef.current;
    if (!uppy) return;

    const handleFileAdded = (file: any) => {
      setFiles((prevFiles) => {
        setError('');
        return [...prevFiles, file.name];
      });
    };

    const handleFileRemoved = (file: any) => {
      setFiles((prevFiles) => prevFiles.filter((f) => f !== file.name));
    };

    uppy.on('file-added', handleFileAdded);
    uppy.on('file-removed', handleFileRemoved);

    return () => {
      uppy.off('file-added', handleFileAdded);
      uppy.off('file-removed', handleFileRemoved);
    };
  }, []);

  return (
    <MainCard title="Drag and Drop Example">
      <DragDrop uppy={uppyRef.current} width="100%" height="270px" />

      {error && <Alert variant="danger">{error}</Alert>}

      <h5 className="mt-3">Uploaded files:</h5>
      <ListGroup>
        <ol>
          {files.map((file, index) => (
            <li key={index}>
              <p className="text-primary mb-0">{file}</p>
            </li>
          ))}
        </ol>
      </ListGroup>
    </MainCard>
  );
}
