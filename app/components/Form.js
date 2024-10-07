// components/Form.js
"use client"

import { useState } from 'react';
import axios from 'axios';
import InputWrapper from './InputWrapper';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send data to your backend
      const response = await axios.post('/api/submit', { name, email, age, location });
      
      // Open WhatsApp URL in a new tab
      window.open(response.data.url, '_blank');

      setSuccess(true); 
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[30vw] px-12 md:px-0 flex flex-col items-center justify-center gap-6">
      <h2 className="text-3xl text-center">Fill in your details below</h2>
      <InputWrapper label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <InputWrapper label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <InputWrapper label="Age" type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
      <InputWrapper label="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button type="submit" disabled={loading} className="w-full bg-foreground rounded text-background py-2 mt-4">{loading ? 'Sending...' : 'Submit'}</button>
      {success && <p>Message sent successfully!</p>}
    </form>
  );
};

export default Form;
