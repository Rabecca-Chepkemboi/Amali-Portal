"use client"
import React, { useState } from 'react';
import Layout from '../Components/Layout';
import useCreateDonation from '../hooks/useCreateDonation';


const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    amount: 0,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    amount: '',
  });
  const [isDonationSuccessful, setDonationSuccessful] = useState(false);

  const { createNewDonation } = useCreateDonation();

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
    let hasErrors = false;
    const newErrors = { ...errors };

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      const DonationData = {
        phone_number: formData.phoneNumber,
        amount: Number(formData.amount),
        full_name: formData.name,
        email: formData.email,
      };

      createNewDonation(DonationData)
        .then(() => {
          setDonationSuccessful(true);

          setTimeout(() => {
            setDonationSuccessful(false);
          }, 10000); 
        })
        .catch((error) => {
          alert("An error occurred while processing your payment.");
        });
    }
  };

  return (
    <Layout>
      <div className="bg-white w-[1800px] h-[100vh] fixed">
        <div className="ml-96">
          <p className="text-4xl mt-24 font-bold text-green-700">
            Your Sponsorship will make a difference
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify between w-3/4 md:w-1/1 p-6 rounded-lg">
          <div className="md:ml-36">
            <div>
              <h1 className="text-3xl mt-36 text-black font-bold">ENTER AMOUNT</h1>
              <input
                type="number"
                className={`border border-6 border-black text-black py-3 px-4 rounded-lg w-96 h-24 mt-24 ${
                  errors.amount ? 'border-red-500' : ''
                }`}
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
            </div>

            <div className="mt-96 text-4xl font-bold text-green-700">
              <a href="/">
                <h1>Become A Sponsor</h1>
              </a>
            </div>
          </div>
          <div className="ml-96 mt-36">
            <h2 className="text-3xl mb-8 text-black px-4 font-bold">YOUR DETAILS</h2>

            <form className="px-6 mt-18" onSubmit={handleSubmit}>
              <div>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="text-xl mb-2 text-black block font-bold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-5 text-black border border-gray-900 rounded-lg mt-2 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter Full Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="mb-6 mt-12">
                  <label
                    htmlFor="email"
                    className="text-xl text-black mb-2 font-bold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-5 text-black border border-gray-900 rounded-lg mt-2 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6 mt-12">
                <label
                  htmlFor="phoneNumber"
                  className="text-xl mb-2 text-black block font-bold"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-5 text-black border border-gray-900 rounded-lg mt-2 ${
                    errors.phoneNumber ? 'border-red-500' : ''
                  }`}
                  placeholder="254"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-green-700 text-white py-6 px-8 rounded-lg text-2xl w-96 cursor-pointer mt-12 whitespace-nowrap"
              >
                DONATE NOW
              </button>
            </form>
          </div>
        </div>
      </div>
      {isDonationSuccessful && (
        <p className="text-2xl ml-96 text-green-700 font-bold mt-6">
          Thank you for contributing to Amali. Your donation has been made successfully.
        </p>
      )}
    </Layout>
  );
};

export default Donation;

