import React, { memo, useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { useAuth } from '@/context/AuthContext';
import { Metric } from '@/types/Metric';

interface Props {
  metrics: Metric[];
}

const RealTimeMetrics: React.FC<Props> = ({ metrics }) => {
  const [latest, setLatest] = useState<Metric | null>(null);
  const {user} = useAuth();
  
    useEffect(() => {
    if (metrics.length > 0) {
      setLatest(metrics[0]);
    }
  }, [metrics]);

if(user){
  useSocket(user.id, (newMetric: Metric) => {
    console.log("newMetric: ", newMetric);
    setLatest(newMetric);
  });
}



  if (!latest) return <div>No metrics available</div>;

  return (
    <div>
      <h2>Latest System Metrics</h2>
      <div>
        <strong>CPU Load:</strong> {latest.cpu.load.toFixed(2)}%
      </div>
      <div>
        <strong>Memory Used:</strong> {(latest.memory.used / 1024 / 1024 / 1024).toFixed(2)} GB / {(latest.memory.total / 1024 / 1024 / 1024).toFixed(2)} GB
      </div>
      <div>
        <strong>Disk Usage:</strong>
        {latest.disk.map((d) => (
          <div key={d.fs}>
            {d.fs} - {d.use.toFixed(2)}%
          </div>
        ))}
      </div>
      <div>
        <strong>Network:</strong>
        {latest.network.map((n) => (
          <div key={n.iface}>
            {n.iface}: RX {n.rx_bytes} bytes, TX {n.tx_bytes} bytes
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(RealTimeMetrics);