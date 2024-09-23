import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [responseData, setResponseData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mwbackend.vercel.app/submit', formData);
            
            setResponseData(response.data);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className='flex h-screen w-full items-center'>
          <div className="container w-[50%]  ">
            <h1 className="text-2xl font-bold mb-6 text-center">Contact Form</h1>
            <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
            onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  type="text" id="name" name="name" placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}></input>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  type="email" id="email" name="email" placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}></input>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="message">Message</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                   name="message"  
                   value={formData.message}
                   onChange={handleChange} ></textarea>
              </div>
             
              <button
                className="w-full bg-gray-800 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit">Send</button>
            </form>
          </div>
         
            <div className="form-data bg-gray-800 h-full w-[50%] flex justify-center items-center text-gray-300">
            {responseData && (
                <div className='border-2 border-gray-200 p-10 hover:bg-indigo-600 hover:text-white transition duration-300 cursor-default'>
                    <h2 className='text-2xl font-bold mb-6'>Response from server</h2>
                    <p><span className='text-xl font-semibold'>Name:</span> {responseData.name}</p>
                    <p><span className='text-xl font-semibold'>Email:</span> {responseData.email}</p>
                    <p><span className='text-xl font-semibold'>Message:</span> {responseData.message}</p>
                </div>
            )}
            </div>
            
        </div>
    );
};

export default App;
