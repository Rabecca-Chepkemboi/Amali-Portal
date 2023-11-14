import { useState, useEffect } from "react";
import { getAthleteDetails } from "@/app/utilities/utils";


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

const GetDetail = ({ params: { athleteId } }: { params: { athleteId: number } }) => {
  const [athleteDetail, setAthleteDetail] = useState<AthletesData | null>(null);

  useEffect(() => {
    const fetchAthleteDetail = async () => {
      try {
        const athleteDetailData = await getAthleteDetails(athleteId);
        console.log("Athlete Detail Data:", athleteDetailData);
        setAthleteDetail(athleteDetailData);
      } catch (error) {
        console.error("Error fetching athlete details:", error);
      }
    };

    fetchAthleteDetail();
  }, [athleteId]);

  return  { ...athleteDetail };
};

export default GetDetail;