// react-bootstrap
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';

// project-imports
import MainCard from '@/components/MainCard';

// ===============================|| SWITCH - SIZING ||============================== //

export default function SizingSwitch() {
  return (
    <MainCard title="Sizing">
      <Form>
        <div className="mb-3">
          <label>Small Switches</label>
          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-12" type="checkbox" />
            <FormCheck.Label>Default</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-12" type="checkbox" />
            <FormCheck.Label>Option 2</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-12" type="checkbox" disabled />
            <FormCheck.Label>Disabled</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-12" type="checkbox" defaultChecked />
            <FormCheck.Label>Checked</FormCheck.Label>
          </FormCheck>

          <small className="form-text text-muted">Some help text goes here</small>
        </div>

        <div className="mb-3">
          <label>Large Switches</label>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-16" type="checkbox" />
            <FormCheck.Label>Default</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-16" type="checkbox" />
            <FormCheck.Label>Option 2</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-16" type="checkbox" disabled />
            <FormCheck.Label>Disabled</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary f-16" type="checkbox" defaultChecked />
            <FormCheck.Label>Checked</FormCheck.Label>
          </FormCheck>
          <small className="form-text text-muted">Some help text goes here</small>
        </div>

        <div className="mb-3">
          <label>Color States</label>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-primary" type="checkbox" defaultChecked />
            <FormCheck.Label>primary</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-secondary" type="checkbox" defaultChecked />
            <FormCheck.Label>secondary</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-success" type="checkbox" defaultChecked />
            <FormCheck.Label>success</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-danger" type="checkbox" defaultChecked />
            <FormCheck.Label>danger</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-warning" type="checkbox" defaultChecked />
            <FormCheck.Label>warning</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-info" type="checkbox" defaultChecked />
            <FormCheck.Label>info</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-dark" type="checkbox" defaultChecked />
            <FormCheck.Label>dark</FormCheck.Label>
          </FormCheck>
          <small className="form-text text-muted">Some help text goes here</small>
        </div>

        <div className="mb-0">
          <label>Color States</label>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-primary" type="checkbox" defaultChecked />
            <FormCheck.Label>primary</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-secondary" type="checkbox" defaultChecked />
            <FormCheck.Label>secondary</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-success" type="checkbox" defaultChecked />
            <FormCheck.Label>success</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-danger" type="checkbox" defaultChecked />
            <FormCheck.Label>danger</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-warning" type="checkbox" defaultChecked />
            <FormCheck.Label>warning</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-info" type="checkbox" defaultChecked />
            <FormCheck.Label>info</FormCheck.Label>
          </FormCheck>

          <FormCheck className="form-switch">
            <FormCheck.Input className="input-light-dark" type="checkbox" defaultChecked />
            <FormCheck.Label>dark</FormCheck.Label>
          </FormCheck>
          <small className="form-text text-muted">Some help text goes here</small>
        </div>
      </Form>
    </MainCard>
  );
}
