import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AuthFormTemplate({ 
  fields, 
  onSubmit, 
  isAuthenticationForm, 
  disabled, 
  hasRequirement,
  children,
  onChange
}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const initialData = {};
        fields.forEach((field) => {
            initialData[field.name] = field.value || '';
        })
        setFormData(initialData);
    }, [fields, disabled])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        onChange({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    console.log(disabled)

    return (

        <Form onSubmit={handleSubmit}>
            {fields.map((field, index) => {
                if (field.condition && !field.condition(formData)) {
                return null;
                }

                return (
                    <>
                        <Form.Group key={index} >
                            {/* <Form.Label style={{textAlign:'left'}}>
                                {field.label}
                            </Form.Label> */}
                        
                            <Form.Control 
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required
                                isInvalid={field.isInvalid}
                                style={{marginTop:25}}
                            />
                        </Form.Group>

                        {  fields.validationFeedback ? (
                            <Form.Control.Feedback type='invalid'>
                            {fields.validationFeedback}
                            </Form.Control.Feedback>
                        ) : null}

                    </>
                )
            })}
            {children}
        </Form>
    )
}

AuthFormTemplate.propTypes = {
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