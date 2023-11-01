import { createDonation } from "../utilities/utils";
import { useState } from "react";

interface DonationData {
  full_name: string;
  email: string;
  phone_number: string;
  amount: number;
}

const useCreateDonation = () => {
  const [donation, setDonation] = useState<DonationData | null>(null);

  const createNewDonation = async (DonationData: DonationData) => {
    try {
      const newDonation = await createDonation(DonationData);
      setDonation(newDonation);
    } catch (error) {
    }
  };

  return { donation, createNewDonation };
};

export default useCreateDonation;