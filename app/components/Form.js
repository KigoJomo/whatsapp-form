// components/Form.js
"use client"

import {useState} from 'react';
import InputWrapper from './InputWrapper';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!name || !email || !age || !location) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError(''); // Clear any previous error messages
        setSuccess(false); // Clear success message before new submission

        try {
            // Send data to your backend
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, age, location}),
            });

            // Open WhatsApp URL in a new tab
            window.open(response.data.url, '_blank');

            setSuccess(true);
        } catch (err) {
            console.error('Error sending data:', err);
            setError('Failed to submit the form. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full md:w-[30vw] px-12 md:px-0 flex flex-col items-center justify-center gap-6"
            aria-live="polite"
        >
            <h2 className="text-3xl text-center mb-4">Fill in your details below</h2>

            <InputWrapper
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <InputWrapper
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <InputWrapper
                id="age"
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <InputWrapper
                id="location"
                label="Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading || !name || !email || !age || !location} // Disable when loading or fields are empty
                className={`w-full rounded text-background py-2 mt-4 ${loading ? 'bg-gray-400' : 'bg-foreground'}`}
            >
                {loading ? 'Sending...' : 'Submit'}
            </button>

            {/* Success and error messages */}
            {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
    );
};

export default Form;
