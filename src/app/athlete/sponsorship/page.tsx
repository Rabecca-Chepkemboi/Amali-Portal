"use client"
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Button from '@/app/atoms/Button';
import Buttons from '@/app/atoms/Buttons';
import Layout from '@/app/Components/Layout';
import useGetAthletes from '@/app/hooks/useGetAthletes';
import Image from 'next/image';
import Link from 'next/link';

interface AthletesData {
  id: number;
  full_name: string;
  email: string;
  age: string;
  phone_number: string;
  profile_picture: string;
  achievements: string;
  password: string;
  role: string;
}

const Sponsorship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { athletes } = useGetAthletes();
  const [filteredAthletes, setFilteredAthletes] = useState<AthletesData[]>([]);
  const [suggestions, setSuggestions] = useState<AthletesData[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<AthletesData | null>();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (athletes) {
      setFilteredAthletes(athletes.slice(0, itemsPerPage));
    }
  }, [athletes]);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = athletes.filter(
      (athlete) =>
        athlete.full_name.toLowerCase().includes(query) ||
        athlete.achievements.toLowerCase().includes(query)
    );
    if (filtered.length === 1) {
      setSelectedAthlete(filtered[0]);
    } else {
      setSelectedAthlete(null);
    }
    setFilteredAthletes(filtered);
  };

  const updateSuggestions = () => {
    const query = searchQuery.trim().toLowerCase();
    const suggested = athletes.filter(
      (athlete) =>
        athlete.full_name.toLowerCase().includes(query) ||
        athlete.achievements.toLowerCase().includes(query)
    );
    setSuggestions(suggested);
  };

  const handleSuggestionClick = (athlete: AthletesData) => {
    setSelectedAthlete(athlete);
    setSearchQuery(athlete.full_name);
    setSuggestions([]);
  };

  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredAthletes(athletes.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="bg-white w-[1600px] h-[100vh] fixed flex items-start ml-1 mt-10">
        <div className="ml-32" style={{ minHeight: '100px', overflowY: 'auto' }}>
          <div>
            <div className="relative mr-[732px] flex text-black items-center">
              <input
                type="text"
                className="w-[1300px] p-2 pl-8 border text-black border-gray-300 rounded-l font-merriweather"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateSuggestions();
                }}
              />
              <button className="bg-green-700 text-white rounded-r-full p-3 font-merriweather" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="bg-white border text-black border-gray-300 mr-4 rounded-b-lg absolute z-10 w-1/2">
              {Array.isArray(suggestions) &&
                suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-2 hover-bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.full_name}
                  </div>
                ))}
            </div>
          )}
          <div className="mt-10">
            <h2 className="text-red-700 text-3xl font-bold font-merriweather">Sponsorship</h2>
          </div>
          <div className="flex flex-wrap gap-10 mb-4">
            {Array.isArray(filteredAthletes) &&
              filteredAthletes.map((athlete, index) => (
                <i key={athlete.id}>
                  <div className="flex gap-2">
                    <div className="w-[310px] bg-gray-100 border border-gray-300 p-2 rounded-lg text-center">
                      <div className="w-[290px] h-[20vh] bg-gray-300 rounded-lg mx-auto overflow-hidden">
                        <Image
                          src={athlete.profile_picture}
                          alt={`Image of ${athlete.full_name}`}
                          width={200}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-4 font-bold text-xl text-black font-merriweather">{athlete.full_name}</p>
                      <hr className="my-4 border-t-8 text-black border-green-700 h-6 w-38" />
                      {index < 4 ? <Buttons /> : <Button />}
                    </div>
                    <div>
                      {selectedAthlete && selectedAthlete.id === athlete.id && (
                        <p className="mt-4 text-black text-xl font-merriweather">{athlete.phone_number}</p>
                      )}
                      {selectedAthlete && selectedAthlete.id === athlete.id && (
                        <p className="mt-4 text-black text-xl font-merriweather">{athlete.email}</p>
                      )}
                    </div>
                  </div>
                  {selectedAthlete && selectedAthlete.id === athlete.id && (
                    <p className="mt-4 text-black text-xl font-merriweather">
                      <span className="font-bold text-green-700">BIO AND ACHIEVEMENTS</span>
                      <br />
                      <br />
                      {athlete.achievements}
                    </p>
                  )}
                </i>
              ))}
          </div>
          {athletes && athletes.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-2 px-4 py-2 rounded-lg border text-blue-600 cursor-pointer ${
                    page === currentPage ? 'bg-blue-100' : ''
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Sponsorship;


