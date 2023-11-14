"use client"
import Layout from '../Components/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { useGetDonation } from '../hooks/useGetDonation';


const Dashboard = () =>{
  const {
    amountData,
    totalAmount,
    totalDonors,
    currentMonthIndexExpected,
  } = useGetDonation();
  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(new Date().getFullYear(), i, 1);
    return date.toLocaleString('default', { month: 'long' });
  });
  const initializeChartData = () => {
    return monthNames.map((month, index) => ({
      name: month,
      amount: 0,
    }));
  };
  const chartData = initializeChartData();
  let accumulatedAmount = 0;
  amountData.forEach((item, index) => {
    const dataIndex = (currentMonthIndexExpected - index + 12) % 12;
    if (index <= currentMonthIndexExpected) {
      accumulatedAmount += Number(item.amount);
      chartData[dataIndex].amount = accumulatedAmount;
    }
  });
  return (
    <Layout>
      <div className="flex-shrink-0 mr-24 h-[40vh] bg-white overflow-x-auto">
        <div className="flex-1 p-4 mt-16">
          <div className="flex gap-24 cursor-pointer ml-20">
            <div className="w-[340px] h-[16vh] bg-green-700 text-white mr-4 rounded-lg flex flex-col justify-center items-center">
              <p className='text-3xl font-merriweather'>Current Month</p>
              <p className='font-bold text-3xl'>{monthNames[currentMonthIndexExpected]}</p>
            </div>
            <div className="w-[340px] h-[16vh] bg-green-700 text-white mr-4 rounded-lg flex flex-col justify-center items-center">
              <p className='text-3xl font-merriweather'>Total Donors</p>
              <p className='font-bold text-2xl'>{totalDonors}</p>
            </div>
            <div className="w-[340px] h-[16vh] bg-red-700 text-white mr-4 rounded-lg flex flex-col justify-center items-center">
              <p className='text-3xl font-merriweather'>Total Raised</p>
              <p className='font-bold text-2xl'>{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" font-bold text-4xl font-merriweather">
      <p className='text-black -mt-36 ml-16'>Sponsorship Statistics</p>
      </div>
      <div className="mb-10 ml-6">
        <LineChart width={1400} height={650} data={chartData}>
          <XAxis dataKey="name">
            <Label value="Month" position="insideBottom" dy={7} />
          </XAxis>
          <YAxis>
            <Label value="Amount (KSh)" angle={-90} position="insideLeft" />
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


