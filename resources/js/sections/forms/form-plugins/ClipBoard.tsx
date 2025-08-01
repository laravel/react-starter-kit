import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';

// third party
import copy from 'copy-to-clipboard';

// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../../branding.json';

// =============================|| FORM PLUGINS - CLIPBOARD ||============================== //

export default function ClipBoardPage() {
  const [text1, setText1] = useState(`${branding.brandName} React Admin Template`);
  const [text2, setText2] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );
  const [text3] = useState(
    'Lorem ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga.'
  );

  const handleCopy = (text: string) => {
    copy(text);
  };

  return (
    <MainCard>
      <Form>
        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            Copy from TextField
          </Col>
          <Col lg={6} md={9} sm={12}>
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                value={text1}
                onChange={(e) => {
                  setText1(e.target.value);
                }}
                placeholder="Type some value to copy"
              />

              <Button className="hei-55" onClick={() => handleCopy(text1)}>
                <i className="ph ph-copy" />
              </Button>
            </InputGroup>
            <small>
              You can do by adding a <code>data-clipboard-target</code> attribute in your trigger element
            </small>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            Cut text from another element
          </Col>
          <Col lg={6} md={9} sm={12}>
            <Form.Control
              className="mb-2"
              as="textarea"
              rows={6}
              onChange={(e) => setText2(e.target.value)}
              value={text2}
              placeholder="Type some value to cut"
            />
            <small>
              you can define a <code>data-clipboard-action</code> attribute to specify if you want to either <code>copy</code> or{' '}
              <code>cut</code> content
            </small>
            <br />
            <Stack direction="horizontal" gap={2}>
              <Button variant="danger" className="mt-2" onClick={() => handleCopy(text2)}>
                Text clipboard
              </Button>
              <Button
                variant="secondary"
                className="mt-2"
                onClick={() => {
                  handleCopy(text2);
                  setText2('');
                }}
              >
                Cut to clipboard
              </Button>
            </Stack>
          </Col>
        </Row>

        <Row>
          <Col lg={3} sm={12} className="col-form-label text-lg-end">
            Copy From Container
          </Col>
          <Col lg={6} md={9} sm={12}>
            <div style={{ border: '4px solid rgba(234, 234, 234, 0.5)', padding: 10 }}>{text3}</div>
            <Button onClick={() => handleCopy(text3)} className="mt-2">
              Copy to clipboard
            </Button>
          </Col>
        </Row>
      </Form>
    </MainCard>
  );
}
