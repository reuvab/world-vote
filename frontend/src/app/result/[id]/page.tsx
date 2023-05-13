'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getContract } from '@/utils/contract';
import { BigNumber } from 'ethers';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
  scales: {
    x: {
      display: false,
    },
  },
};

export default function Page({ params }: { params: { id: string } }) {
  const [poolTitle, setPoolTitle] = useState('');
  const [yesVotes, setYesVotes] = useState<BigNumber>(BigNumber.from(0));
  const [noVotes, setNoVotes] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    const fetchPoolInfo = async () => {
      //TODO: replace by smart contract call
      const contract = await getContract();
      const data = await contract.getPoll(params.id);

      console.log(data);
      const [poolTitle, , yesVotes, noVotes] = data;

      setPoolTitle(poolTitle);
      setYesVotes(yesVotes);
      setNoVotes(noVotes);
    };
    fetchPoolInfo();
  }, []);

  const data = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        axis: 'y',
        label: 'Votes',
        data: [yesVotes.toNumber(), noVotes.toNumber()],
        fill: false,
        backgroundColor: ['#4299E1', 'rgb(148 163 184)'],
        borderColor: ['rgb(120 113 108);', 'rgb(120 113 108);'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
    },
  };

  return (
    <div className='h-full flex flex-col justify-start gap-10'>
      <div className='flex flex-col'>
        <p className='text-gray-500 text-xs'>Survey {params.id}</p>
        <p className='font-bold text-lg'>Thank you for voting in this Survey:</p>
        <p className='pb-3 text-sm'>{poolTitle}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg'>Results</h1>
        <div className='flex flex-col'>
          <Bar data={data} options={options} />
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg'>Total Votes</h1>
        <p className='pb-4'>{yesVotes.add(noVotes).toString()}</p>
        <p className='text-xs text-gray-500'>This survey will finish in 25 minutes</p>
      </div>
    </div>
  );
}
