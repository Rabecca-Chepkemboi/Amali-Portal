

"use client"
import React, { useState, useEffect } from 'react';
import { getAthleteDetails } from '@/app/utilities/utils';

interface AthleteDetailProps {
  params: { athleteId: number };
}

const AthleteDetail = ({ params: { athleteId } }: AthleteDetailProps) => {
  const [athleteDetail, setAthleteDetail] = useState<any>(null);

  useEffect(() => {
    const fetchAthleteDetail = async () => {
      try {
        const athleteDetailData = await getAthleteDetails(athleteId);
        console.log('Athlete Detail Data:', athleteDetailData);
        setAthleteDetail(athleteDetailData);
      } catch (error) {
        console.error('Error fetching athlete details:', error);
      }
    };

    fetchAthleteDetail();
  }, [athleteId]);

  return (
    <div className="flex justify-center text-black items-center h-screen">
      {athleteDetail && (
        <div className="text-center">
          {/* <img
            src={`athleteDetail.profile_picture${athleteDetail}`}
            alt={athleteDetail.full_name}
            className="mx-auto"
          /> */}
          <h2 className="text-2xl font-bold mt-4">{athleteDetail.full_name}</h2>
          <p className="mt-2">Bio: {athleteDetail.achievements}</p>
          <p className="mt-2 font-bold">Email: {athleteDetail.email}</p>
          <p className="mt-2">Age: {athleteDetail.age}</p>
          <p className="mt-2">Phone Number: {athleteDetail.phone_number}</p>
        </div>
      )}
    </div>
  );
};

export default AthleteDetail;

