import { useEffect, useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import LinearProgress from 'react-bootstrap/ProgressBar';

// third-party
import * as yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';
import { Row, RowData, Table } from '@tanstack/react-table';

type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: string | number) => void;
  selectedRow: Record<string, boolean>;
};

type RowEditProps<T extends RowData> = {
  getValue: () => any;
  row: Row<T>;
  column: any;
  table: Table<T> & { options: { meta?: TableMeta } };
};

// ==============================|| REACT TABLE - EDITABLE ROW ||============================== //

export default function RowEditable<T extends RowData>({ getValue: initialValue, row, column: { id, columnDef }, table }: RowEditProps<T>) {
  const [value, setValue] = useState(initialValue);
  const tableMeta = table.options.meta;

  const onChange = (e: any) => {
    setValue(e.target?.value);
  };

  const onBlur = () => {
    tableMeta!.updateData(row.index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const ShowStatus = (value: string) => {
    switch (value) {
      case 'Complicated':
        return <Badge bg="light-danger">Complicated</Badge>;
      case 'Relationship':
        return <Badge bg="light-success">Relationship</Badge>;
      case 'Single':
      default:
        return <Badge bg="light-info">Single</Badge>;
    }
  };

  let element;
  let userInfoSchema;
  switch (id) {
    case 'email':
      userInfoSchema = yup.object().shape({
        userInfo: yup.string().email('Enter valid email ').required('Email is required')
      });
      break;
    case 'age':
      userInfoSchema = yup.object().shape({
        userInfo: yup
          .number()
          .typeError('Age must be number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years')
          .max(65, 'You must be at most 65 years')
      });
      break;
    case 'visits':
      userInfoSchema = yup.object().shape({
        userInfo: yup.number().typeError('Visits must be number').required('Visits are required')
      });
      break;
    default:
      userInfoSchema = yup.object().shape({
        userInfo: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required')
      });
      break;
  }

  const isEditable = tableMeta?.selectedRow[row.id];

  switch (columnDef.dataType) {
    case 'text':
      element = (
        <>
          {isEditable ? (
            <Formik
              initialValues={{
                userInfo: value
              }}
              enableReinitialize
              validationSchema={userInfoSchema}
              onSubmit={() => {}}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <FormikForm>
                  <Form.Group controlId={`${row.index}-${id}`}>
                    <Form.Control
                      type="text"
                      value={values.userInfo}
                      name="userInfo"
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        onBlur();
                      }}
                      isInvalid={touched.userInfo && Boolean(errors.userInfo)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.userInfo && typeof errors.userInfo === 'string' ? errors.userInfo : null}
                    </Form.Control.Feedback>
                  </Form.Group>
                </FormikForm>
              )}
            </Formik>
          ) : (
            value
          )}
        </>
      );
      break;
    case 'select':
      element = (
        <>
          {isEditable ? (
            <Form.Group controlId="editable-select">
              <Form.Select value={value} onChange={onChange} onBlur={onBlur}>
                <option value="Complicated">Complicated</option>
                <option value="Relationship">Relationship</option>
                <option value="Single">Single</option>
              </Form.Select>
            </Form.Group>
          ) : (
            ShowStatus(value)
          )}
        </>
      );
      break;
    case 'progress':
      element = (
        <>
          {isEditable ? (
            <Form.Group>
              <Form.Range value={value} min={0} max={100} step={1} onBlur={onBlur} onChange={(e) => setValue(e.target.value)} />
            </Form.Group>
          ) : (
            <LinearProgress now={value} label={`${value}%`} />
          )}
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }

  return element;
}
