import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from './useSocket';
import { memo, useState } from 'react';
import { Metric } from '@/types/Metric';


ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  cpuLoad: number;
};

const CpuGauge = ({ cpuLoad }: Props) => {
  const [latest, setLatest] = useState<number | null>(cpuLoad);
  const alertThreshold = 80;
  const isOverloaded = cpuLoad > alertThreshold;


  const {user} = useAuth();

  if(user){
    useSocket(user.id, (newMetric: Metric) => {
      console.log("newMetric: ", newMetric);
      const newCPU: number = newMetric.cpu.load;
      setLatest(newCPU);
    });
  }

  const data = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        data: [latest ?? 0, 100 - (latest ?? 0)],
        backgroundColor: [isOverloaded ? '#dc3545' : '#007bff', '#e9ecef'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: 200 }}>
      <h3>CPU Usage</h3>
      <Doughnut data={data} />
      <p>{latest !== null ? latest.toFixed(2) : 'N/A'}%</p>
      {isOverloaded && (
        <div className="mt-3 text-danger fw-semibold">
          ⚠ High CPU usage detected!
        </div>
      )}
    </div>
    
  );
};

export default memo(CpuGauge);
