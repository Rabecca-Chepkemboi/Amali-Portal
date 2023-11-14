import { useEffect, useState } from 'react';
import { getDonation } from '../utilities/utils';
interface DonationData {
  id: number;
  amount: number;
}
export const useGetDonation = () => {
  const [amountData, setAmountData] = useState<DonationData[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [activeButton, setActiveButton] = useState<'monthly' | 'weekly'>('monthly');
  const currentYear = new Date().getFullYear();
  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return date.toLocaleString('default', { month: 'long' });
  });
  const [currentMonthIndexExpected, setCurrentMonthIndexExpected] = useState(0);
  const [currentMonthIndexRemaining, setCurrentMonthIndexRemaining] = useState(0);
  const fetchData = async () => {
    try {
      const response = await getDonation();
      if (!response.donations) {
        console.error('Invalid data structure: "donations" array not found in the response.');
        return;
      }
      setAmountData(response.donations);
      const total = response.donations.reduce((acc: number, item: DonationData) => acc + Number(item.amount), 0);
      setTotalAmount(total);
      const uniqueDonors = new Set(response.donations.map((item: DonationData) => item.id));
      setTotalDonors(uniqueDonors.size);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchAmountExpected = async (currentMonthIndex: number) => {
    const currentMonthData = amountData.find((_, index) => index === currentMonthIndex);
    if (currentMonthData) {
      setAmountRemaining(currentMonthData.amount);
    }
  };
  const updateCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    setCurrentMonthIndexExpected(currentMonthIndex);
    setCurrentMonthIndexRemaining(currentMonthIndex);
    fetchAmountExpected(currentMonthIndex);
  };
  useEffect(() => {
    fetchData();
    updateCurrentMonth();
    const interval = setInterval(updateCurrentMonth, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return {
    amountData,
    totalAmount,
    totalDonors,
    currentMonthIndexExpected,
    amountRemaining,
    activeButton,
    setActiveButton,
  };
};









