import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ButtonTemplate } from './Landing';

export default function FormTemplate({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const initialData = {};
    fields.forEach((field) => {
      initialData[field.name] = field.value || '';
    })
    setFormData(initialData);
  }, [fields])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleUpdateClick = () => setIsEditMode(true);

  const handleCancelClick = () => setIsEditMode(false);

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, index) => {
        if (field.condition && !field.condition(formData)) {
          return null;
        }

        return (
          <Form.Group key={index}>
            <Form.Label>{field.label}</Form.Label>
            {isEditMode ? (
              <Form.Control 
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ) : (
              <Form.Control value={field.value} disabled />
            )}
          </Form.Group>
        )
      })}

      {isEditMode ? (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <ButtonTemplate title="Save" type="submit" btnStyle='round'/>
          <ButtonTemplate title="Cancel" onClick={handleCancelClick} btnStyle='round'/>
        </div>
      ) : (
        <ButtonTemplate title="Update" onClick={handleUpdateClick} btnStyle='round' />
      )}
    </Form>
  )
}

FormTemplate.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      condition: PropTypes.func,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};