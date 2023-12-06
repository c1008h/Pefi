import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select'
import { genderList } from '../../constants/genders';
export default function AuthFormTemplate({ 
  fields, onSubmit, isAuthenticationForm, 
  disabled, hasRequirement, children, onChange }) {
    
    const [formData, setFormData] = useState({});
    const [other, setOther] = useState(false)

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

    const handleGenderSelect = (selectedOption) => {
        const selectedGender = selectedOption.value;
    
        if (selectedGender === 'other (specify)') {
          setOther(true);
        } else {
          setFormData((prevData) => ({ ...prevData, gender: selectedGender }));
          setOther(false);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            if (field.condition && !field.condition(formData)) return null;
      
            return (
              <Form.Group key={index}>
                <Form.Label style={{ textAlign: 'left' }}>{field.label}</Form.Label>
      
                {field.name === 'gender' && (
                  <>
                    <Select
                      options={genderList}
                      onChange={handleGenderSelect}
                    //   style={{ marginTop: 25 }}
                      placeholder={field.placeholder}
                    />
      
                    {other && (
                      <Form.Control
                        type='text'
                        name='gender'
                        value={formData.gender}
                        onChange={(e) => handleChange(e)}
                        placeholder='Custom Gender'
                        required
                        style={{ marginTop: 25 }}
                      />
                    )}
                  </>
                )}
      
                {field.name !== 'gender' && (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    isInvalid={field.isInvalid}
                    // style={{ marginTop: 25 }}
                  />
                )}
      
                {fields.validationFeedback ? (
                  <Form.Control.Feedback type='invalid'>
                    {fields.validationFeedback}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            );
          })}
          {children}
        </Form>
      );
}

AuthFormTemplate.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};