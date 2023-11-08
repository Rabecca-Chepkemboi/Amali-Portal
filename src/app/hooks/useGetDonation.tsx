import { useEffect, useState } from 'react';
import { getDonation } from '../utilities/utils';

interface DonationData {
  name: string;
  amount: number;
}

export const useGetDonation = () => {
  const [amountData, setAmountData] = useState<DonationData[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountExpected, setAmountExpected] = useState(0);
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
      const data = await getDonation();
      setAmountData(data);
      const total = data.reduce((acc: number, item: { amount: any; }) => acc + Number(item.amount), 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAmountExpected = async (currentMonthIndex: number) => {
    try {
      const response = await getDonation(); // Adjust this API call as needed
      if (response.ok) {
        const data: DonationData = await response.json();
        setAmountExpected(data.amount);
        const currentMonthData = amountData.find((_, index) => index === currentMonthIndex);
        if (currentMonthData) {
          setAmountRemaining(currentMonthData.amount);
        }
      } else {
        console.error('Failed to fetch expected amount:', response.status);
      }
    } catch (error) {
      console.error('Error fetching expected amount:', error);
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
  }, [updateCurrentMonth]); 

  const chartData = amountData.map((item, index) => ({
    name: monthNames[index],
    amount: item.amount,
  }));

  const handleButtonClick = (buttonType: 'monthly' | 'weekly') => {
    setActiveButton(buttonType);
  };

  return {
    amountData,
    totalAmount,
    currentMonthIndexExpected,
    amountRemaining,
    activeButton,
    handleButtonClick,
  };
};

export default useGetDonation;













// import { useEffect, useState } from 'react';
// import { getDonation } from '../utilities/utils';


// interface DonationData {
//   name: string;
//   amount: number;
// }

// export const useGetDonation = () => {
//   const [amountData, setAmountData] = useState<DonationData[]>([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [amountExpected, setAmountExpected] = useState(0);
//   const [amountRemaining, setAmountRemaining] = useState(0);
//   const [activeButton, setActiveButton] = useState<'monthly' | 'weekly'>('monthly');
//   const currentYear = new Date().getFullYear();
//   const monthNames = Array.from({ length: 12 }, (_, i) => {
//     const date = new Date(currentYear, i, 1);
//     return date.toLocaleString('default', { month: 'long' });
//   });
//   const [currentMonthIndexExpected, setCurrentMonthIndexExpected] = useState(0);
//   const [currentMonthIndexRemaining, setCurrentMonthIndexRemaining] = useState(0);

//   const fetchData = async () => {
//     const data = await getDonation();
//     setAmountData(data);
//     const total = data.reduce((acc: number, item: DonationData) => acc + Number(item.amount), 0);
//     setTotalAmount(total);
//   };

//   const fetchAmountExpected = async (currentMonthIndex: number) => {
//     const response = await getDonation();
//     if (response.ok) {
//       const data: DonationData = await response.json();
//       setAmountExpected(data.amount);
//       const currentMonthData = amountData.find((_, index) => index === currentMonthIndex);
//       if (currentMonthData) {
//         setAmountRemaining(currentMonthData.amount);
//       }
//     }
//   };

//   const updateCurrentMonth = () => {
//     const currentDate = new Date();
//     const currentMonthIndex = currentDate.getMonth();
//     setCurrentMonthIndexExpected(currentMonthIndex);
//     setCurrentMonthIndexRemaining(currentMonthIndex);
//     fetchAmountExpected(currentMonthIndex);
//   };

//   useEffect(() => {
//     fetchData();
//     updateCurrentMonth();
//     const interval = setInterval(updateCurrentMonth, 60000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, [updateCurrentMonth]);

//   const chartData = amountData.map((item, index) => ({
//     name: monthNames[index],
//     amount: item.amount,
//   }));

//   const handleButtonClick = (buttonType: 'monthly' | 'weekly') => {
//     setActiveButton(buttonType);
//   };

//   return {
//     amountData,
//     totalAmount,
//     currentMonthIndexExpected,
//     amountRemaining,
//     activeButton,
//     handleButtonClick,
//   };
// };


// export default useGetDonation;