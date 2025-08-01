import { useState, useId } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| COLOR PICKER CARD ||============================== //

export default function ColorPickerCard({ color, onColorChange }: { color: string; onColorChange?: (color: string) => void }) {
  const [selectedColor, setSelectedColor] = useState(color);

  // Generate a unique ID for the component
  const uniqueId = useId();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    if (onColorChange) onColorChange(event.target.value);
  };

  const triggerColorPicker = (id: string) => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) inputElement.click();
  };

  // Include the unique ID in the color input ID
  const colorInputId = `color-picker-${uniqueId}`;

  return (
    <MainCard className="border p-3 shadow-none mb-0" bodyClassName="p-0">
      <Stack direction="horizontal" gap={2} className="align-items-center justify-content-start">
        <Form.Control
          id={colorInputId}
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="position-absolute overflow-hidden border-0 p-0 rounded-circle wid-25 hei-25 cursor-pointer"
        />
        <div onClick={() => triggerColorPicker(colorInputId)} style={{ cursor: 'pointer' }}>
          <div className="border-0 p-0 rounded-circle wid-25 hei-25 cursor-pointer" style={{ backgroundColor: selectedColor }}></div>
        </div>
        <p className="mb-0">{selectedColor}</p>
      </Stack>
    </MainCard>
  );
}
