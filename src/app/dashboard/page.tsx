"use client"
import { useGetDonation } from '../hooks/useGetDonation';
import Layout from '../Components/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


const Dashboard = () => {
  const {
    amountData,
    totalAmount,
    currentMonthIndexExpected,
    amountRemaining,
    activeButton,
    handleButtonClick,
  } = useGetDonation();

  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(new Date().getFullYear(), i, 1);
    return date.toLocaleString('default', { month: 'long' });
  });

  const chartData = amountData.map((item, index) => ({
    name: monthNames[index],
    amount: Number(item.amount),
  }));


  return (
    <Layout>
      <div className="flex w-[1800px] h-[100vh] fixed bg-white">
        <div className="flex-1 p-4 mt-24">
          <div className="flex justify-between mb-4">
            <div className="flex items-center ml-auto">
              <div></div>
            </div>
          </div>
          <div className="flex gap-32 cursor-pointer ml-64">
            <div className="w-[300px] h-[14vh] bg-green-700 text-white ml-4 rounded-lg flex flex-col justify-center items-center">
              <p className='text-3xl font-merriweather'>Current Month</p>
              <p className='font-bold text-3xl'>{monthNames[currentMonthIndexExpected]}</p>
            </div>
            <div className="w-[300px] h-[14vh] bg-green-700 text-white mr-4 rounded-lg flex flex-col justify-center items-center">
              <p className='text-3xl font-merriweather'>Amount</p>
              <p className='font-bold text-2xl'>{amountRemaining}</p>
            </div>
            <div className="w-[300px] h-[14vh] bg-red-700 text-white mr-4 rounded-lg flex flex-col justify-center items-center">
              <p className='text-3xl font-merriweather'>Total Raised</p>
              <p className='font-bold text-2xl'>{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-96 font-bold ml-48 text-4xl text-black fixed font-merriweather'> <p>Sponsorship Statistics</p></div>
      <div className="ml-32 mt-[440px] fixed">
        <LineChart width={1410} height={650} data={chartData}>
          <XAxis dataKey="name">
            <Label value="Month" position="insideBottom" dy={7} />
          </XAxis>
          <YAxis>
            <Label value="Amount (USD)" angle={-90} position="insideLeft" />
          </YAxis>
          <CartesianGrid stroke="#006400" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#006400" className="mt-10" />
        </LineChart>
      </div>
    </Layout>
  );
};
export default Dashboard;