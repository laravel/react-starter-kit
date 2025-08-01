import { ChangeEvent, useRef, useState } from 'react';

// react-bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import ColorPickerCard from '@/components/cards/ColorPickerCard';
import MainCard from '@/components/MainCard';

// assets
import ImgStar from '@assets/images/admin/img-star.png';

// preset data
const presets = [
  { title: 'Preset 1', colors: ['#17ba92', '#4aedc5', '#a5f6e2'], active: false },
  { title: 'Preset 2', colors: ['#c39b22', '#f6ce55', '#fbe7aa'], active: false },
  { title: 'Preset 3', colors: ['#0387c4', '#36baf7', '#9bddfb'], active: true },
  { title: 'Preset 4', colors: ['#5b6b79', '#bec8d0', '#f3f5f7'], active: false }
];

// color data
const otherColorOptions = [
  {
    id: 'other_1',
    title: 'Nav Bar & Footer Background',
    description: 'Fixed, scrolling & email',
    colorClass: 'text-green-400',
    hexCode: '#4AEDC5'
  },
  {
    id: 'other_2',
    title: 'Navigation Bar Link',
    description: 'Links when nav bar is fixed',
    colorClass: 'text-red-500',
    hexCode: '#F44236'
  },
  {
    id: 'other_3',
    title: 'Navigation Bar',
    description: 'Links when nav bar is scrolling',
    colorClass: 'text-green-200',
    hexCode: '#A5F6E2'
  },
  {
    id: 'other_4',
    title: 'Homepage Headings & Subtitle',
    description: 'When a background is set',
    colorClass: 'text-gray-400',
    hexCode: '#BEC8D0'
  },
  {
    id: 'other_5',
    title: 'Course Page Heading & Subtitle',
    description: 'When a Background is set',
    colorClass: 'text-gray-200',
    hexCode: '#F3F5F7'
  },
  {
    id: 'other_6',
    title: 'Headings',
    description: '<h2> to <h5>',
    colorClass: 'text-gray-500',
    hexCode: '#8996A4'
  },
  {
    id: 'other_7',
    title: 'Body text',
    description: '<body> , <p>',
    colorClass: 'text-gray-800',
    hexCode: '#1D2630'
  },
  {
    id: 'other_8',
    title: 'Buttons & Links',
    description: '<a> , <button>',
    colorClass: 'text-green-500',
    hexCode: '#1DE9B6'
  }
];

// =============================|| SITE - THEME SITE ||============================== //

export default function ThemeSite() {
  const [selectedFont, setSelectedFont] = useState('0');
  const [colorOptions, setColorOptions] = useState(otherColorOptions);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const fontMap: Record<string, string> = {
    '0': '"Open Sans", sans-serif',
    '1': '"Inter", sans-serif',
    '2': '"Popince", sans-serif',
    '3': '"Roboto", sans-serif'
  };

  const handleFontChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
  };

  const handleColorChange = (id: string, newColor: string) => {
    setColorOptions((prev) => prev.map((option) => (option.id === id ? { ...option, color: newColor } : option)));
  };

  return (
    <>
      <h5>Logo & Branding</h5>
      <p className="text-muted mb-4">
        Incorporate a custom logo and favicon, and fine-tune your school thumbnail to enhance its appearance and branding
      </p>
      <Row className="g-3">
        <Col sm={12} md={4}>
          <p className="mb-2">Logo & Branding</p>
          <Form action="/file-upload" className="dropzone dz-clickable" onClick={handleClick}>
            <div className="dz-default align-item-center my-4" style={{ cursor: 'pointer' }}>
              <Form.Control type="file" name="file" multiple className="dz-button" style={{ display: 'none' }} ref={fileInputRef} />
              Drop files here to upload
            </div>
          </Form>
        </Col>
        <Col sm={12} md={4}>
          <p className="mb-2">Thumbnail</p>
          <Form action="/file-upload" className="dropzone dz-clickable" onClick={handleClick}>
            <div className="dz-default align-item-center my-4">
              <Form.Control type="file" name="file" multiple className="dz-button" style={{ display: 'none' }} ref={fileInputRef} />
              Drop files here to upload
            </div>
          </Form>
        </Col>
        <Col sm={12} md={4}>
          <p className="mb-2">Favicon</p>
          <Form action="/file-upload" className="dropzone dz-clickable" onClick={handleClick}>
            <div className="dz-default align-item-center my-4">
              <Form.Control type="file" name="file" multiple className="dz-button" style={{ display: 'none' }} ref={fileInputRef} />
              Drop files here to upload
            </div>
          </Form>
        </Col>
      </Row>
      <hr className="my-4 border-top border-secondary border-opacity-50" />
      <Stack direction="horizontal" className="align-items-center mb-4">
        <div className="flex-shrink-0">
          <Image src={ImgStar} alt="img" fluid />
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className="mb-1">Able pro Branding</h6>
          <p className="mb-0 text-muted">
            Personalize your school and eliminate Able Pro branding from your school website, emails, and products. To access this feature,
            upgrade to the Professional plan.
          </p>
        </div>
      </Stack>

      <h5>Font Family</h5>
      <p className="text-muted mb-4">Change the font used across your school.</p>
      <MainCard className="border">
        <Form.Select className="w-auto mb-3" value={selectedFont} onChange={handleFontChange}>
          <option value="0" defaultValue="0">
            Open Sans
          </option>
          <option value="1">Inter</option>
          <option value="2">Popince</option>
          <option value="3">Roboto</option>
        </Form.Select>
        <p className="mb-0 text-muted" style={{ fontFamily: fontMap[selectedFont] }}>
          Make your school your own and remove Teachable branding from your school website, emails, and all products. Upgrade to the
          Professional plan to use this feature.
        </p>
      </MainCard>

      <h5>Color Palette</h5>
      <p className="text-muted mb-4">
        Select a predefined color scheme to establish consistency across your site and products. Alternatively, customize your own color
        palette to reflect your unique branding and preferences.
      </p>
      <MainCard className="border">
        <Row className="row g-4 mb-4">
          {presets.map(({ title, colors, active }, index) => (
            <Col key={index} md={6} xl={3}>
              <div className={`admin-color-block ${active === true ? 'active' : ''}`}>
                <h6 className="mb-1">{title}</h6>
                <p className="text-muted text-sm mb-2">Theme Color</p>
                <MainCard className="border p-3 shadow-none mb-0" bodyClassName="p-0">
                  <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center">
                    {colors.map((color, index) => (
                      <Form.Control
                        readOnly
                        key={index}
                        type="color"
                        value={color}
                        className="border-0 p-0 rounded-circle wid-25 hei-25 cursor-pointer"
                      />
                    ))}
                  </Stack>
                </MainCard>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          {colorOptions.map((item, index) => (
            <Col md={6} xl={3} key={index}>
              <h6 className="mb-1">{item.title}</h6>
              <p className="text-muted text-sm mb-2">{item.description}</p>
              <ColorPickerCard color={item.hexCode} onColorChange={(newColor) => handleColorChange(item.id, newColor)} />
            </Col>
          ))}
        </Row>
      </MainCard>
    </>
  );
}
