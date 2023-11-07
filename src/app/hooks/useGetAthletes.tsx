// import { getAthletes } from "../utilities/utils";
// import { useEffect, useState } from "react";

// interface AthletesData {
//   id: number;
//   full_name: string;
//   email: string;
//   age: string;
//   phone_number: string;
//   profile_picture: string;
//   achievements: string;
//   password: string;
//   role: string;
// }


// const useGetAthletes = () => {
//   const [athletes, setAthletes] = useState<AthletesData[]>([]);


//   useEffect(() => {
//     const fetchAthletes = async () => {
//         const fetchedAthletes = await getAthletes();
//         setAthletes(fetchedAthletes);
    
//     };

//     fetchAthletes();
//   }, []);

//   return { athletes };
// };

// export default useGetAthletes;




import { getAthletes } from "../utilities/utils";
import { useEffect, useState } from "react";

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

const useGetAthletes = () => {
  const [athletes, setAthletes] = useState<AthletesData[]>([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      const fetchedAthletes = await getAthletes();
      setAthletes(fetchedAthletes);
    };

    fetchAthletes();
  }, []);

  return { athletes };
};

export default useGetAthletes;