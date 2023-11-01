"use client"
import React from 'react';
import Layout from '../Components/Layout';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { useCreateContact } from '../hooks/useCreateContact';


const Contact = () => {
  const { formData, errors, successMessage, handleChange, handleSubmit } = useCreateContact();
  return (
    <Layout>
      <div className="bg-white w-[1800px] h-[100vh] fixed justify-center mb-24 items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row justify between w-full md:w-1/1 mb-20 ml-24 rounded-lg">
            <div className="md:order-2">
              <h1 className="text-5xl ml-96 font-bold text-green-700 mt-24 font-merriweather">
                Contact Us
              </h1>
              <div className="flex flex-col md:flex-row">
                <div className="flex-column mt-64">
                  <div className="md:flex-1 md:mr-6 mt-4 ml-24">
                    <p className="text-3xl text-black font-merriweather">Name</p>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-none border-b-6 text-black border-gray-300 mt-4 w-full focus:outline-none focus:border-green-700"
                      placeholder="Enter Name"
                    />
                    <span className="text-red-500">{errors.name}</span>
                    <hr className="my-4 border-t-3 border-black h-6 w-96" />
                  </div>
                  <div className="md:flex-1 md:mr-6 mt-12 ml-24">
                    <p className="text-3xl text-black font-merriweather">Email</p>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-none border-b-6 text-black border-gray-300 mt-4 w-full focus:outline-none focus:border-green-700"
                      placeholder="Enter Email"
                    />
                    <span className="text-red-500">{errors.email}</span>
                    <hr className="my-4 border-t-3 border-black h-6 w-96" />
                  </div>
                  <div className="md:flex-1 md:mr-6 mt-12 ml-24">
                    <p className="text-3xl text-black font-merriweather">Message</p>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="border-none text-black border-b-6 border-gray-300 mt-4 w-full focus:outline-none focus:border-green-700"
                      placeholder="Type your message here"
                      rows={3}
                    />
                    <span className="text-red-500">{errors.message}</span>
                    <hr className="my-4 border-t-3 border-black h-6 w-96" />
                  </div>
                </div>
                <div className="md:flex-1 mt-8 md:mt-0 ml-64">
                  <button
                    type="submit"
                    className="bg-green-700 border-6 border-gray-500 text-white py-64 px-12 rounded-lg w-full h-32 mt-64 ml-36 cursor-pointer font-merriweather hover:border-green-700 flex flex-col justify-center items-center"
                  >
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-24 font-merriweather">INFO</h1>
                      <p className="mb-24">
                        <a href="mailto:amaliathletes@gmail.com">
                          <FaEnvelope className="inline-block mr-5 text-4xl" />
                          amaliathletes@gmail.com
                        </a>
                      </p>
                      <p>
                        <a href="tel:+254759942644">
                          <FaPhone className="inline-block mr-2 text-4xl mb-2" />
                          +254 759942644
                        </a>
                      </p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <button className="bg-green-700 text-white text-3xl py-4 px-4 w-96 h-24 ml-24 rounded-lg font-merriweather cursor-pointer text-center">
                  SEND
                </button>
                {successMessage && <p className="text-green-700 mt-2 ml-24">{successMessage}</p>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default Contact;