// react-bootstrap
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SWITCH - INLINE SWITCH ||============================== //

export default function InlineSwitch() {
  return (
    <MainCard title="Inline Switch">
      <Form>
        <div className="mb-3">
          <FormCheck className="form-switch custom-switch-v1">
            <FormCheck.Input className="input-primary" type="checkbox" />
            <FormCheck.Label>Inline 1</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch custom-switch-v1">
            <FormCheck.Input className="input-primary" type="checkbox" />
            <FormCheck.Label>Inline 2</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch custom-switch-v1">
            <FormCheck.Input className="input-primary" type="checkbox" />
            <FormCheck.Label>Inline 3</FormCheck.Label>
          </FormCheck>
        </div>
        <div className="mb-0">
          <Form.Label className="text-muted mb-3">With Checked State</Form.Label>
          <FormCheck className="form-switch custom-switch-v1">
            <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
            <FormCheck.Label>Inline 1</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch custom-switch-v1">
            <FormCheck.Input className="input-primary" type="checkbox" />
            <FormCheck.Label>Inline 2</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch custom-switch-v1">
            <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
            <FormCheck.Label>Inline 3</FormCheck.Label>
          </FormCheck>

          <br />
          <small className="form-text text-muted">
            Use class <code>form-check-inline</code>
          </small>
        </div>
      </Form>
    </MainCard>
  );
}
