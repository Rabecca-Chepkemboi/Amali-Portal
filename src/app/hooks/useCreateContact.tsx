import { useState } from 'react';
import { createContact } from '../utilities/utils';

export const useCreateContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      valid = false;
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      valid = false;
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      valid = false;
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message) {
      valid = false;
      newErrors.message = 'Message is required';
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await createContact(formData);

      if (response.status === 500) {
        setSuccessMessage('Message failed');
      } else {
        setSuccessMessage('Message sent successfully');
      }

      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setSuccessMessage('Message failed');
    }
  };

  return { formData, errors, successMessage, handleChange, handleSubmit };
};