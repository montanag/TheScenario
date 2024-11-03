import React from 'react';
import { Formik, Form, Field } from 'formik';
import Data from '../models/data';
import * as DataApi from '../api/data';

// Could make this type more robust with props = createProps | updateProps
interface Props {
  create?: boolean;
  data?: Data;
  onCreate?: (request: DataApi.PostData) => void;
  onUpdate?: (id: string, request: DataApi.PatchData) => void;
  onDelete?: (id: string) => void;
}

const DataItem: React.FC<Props> = ({ create = false, data, onCreate, onUpdate, onDelete }) => {

  const initialValues = {
    data: data?.data || '',
  };

  const handleSave = (values: { data: string }) => {
    if (create) {
      onCreate && onCreate({ data: values.data });
      return;
    }
    if (!data?.id) {
      console.error("Couldn't update data, no ID found");
      return;
    }
    onUpdate && onUpdate(data.id, { data: values.data });
  };

  const handleDelete = () => {
    if (!data?.id) {
      console.error("Couldn't delete data, no ID found");
      return;
    }
    onDelete && onDelete(data.id);
  };

  return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSave(values)}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className='data-item'>
            {!create && (
              <div className='meta-data'>
                <h3>{data?.id}</h3>
                <div className='time-data'>
                  <span><strong>Created:</strong> {data?.created}</span>
                  <span><strong>Updated:</strong> {data?.updatedAt}</span>
                </div>
              </div>
            )}
            <Field
              name="data"
              placeholder="Enter data"
              component="input"
              className="data-input"
            />
            <div className='button-container'>
              <button type="submit">Save</button>
              {!create && (
                <button type="button" className='danger' onClick={handleDelete}>
                  Delete
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
  );
};

export default DataItem;
