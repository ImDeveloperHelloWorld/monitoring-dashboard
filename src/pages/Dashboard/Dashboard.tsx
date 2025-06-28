import { useEffect, useState } from 'react';
import CpuGauge from '../../components/CpuGauge';
import UsageTable from '..//../components/UsageTable';
import { fetchMetrics } from '../../api/index';
import RealTimeMetrics from '@/components/RealTimeMetrics';
import Spinner from '@/components/Spinner';

interface Metric {
    cpu: { load: number };
    memory: { total: number; used: number; free: number };
    disk: { fs: string; size: number; used: number; use: number }[];
    network: { iface: string; rx_bytes: number; tx_bytes: number }[];
    createdAt: string;
}

const Dashboard = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log("number of render dashboard component");
    
    const getData = async () => {
        try {
            setLoading(true);
            const data = await fetchMetrics();            
            setMetrics(data.data);
        } catch (err) {
            setError('Failed to load metrics.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex-grow-1 p-3 bg-white overflow-auto position-relative" style={{ minHeight: 'calc(100vh - 56px)'}}>{loading && <Spinner/>}
        <div className="p-8 ">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {error && <p className="text-red-500">{error}</p>}
            {metrics.length > 0 && (
                <>
                    <CpuGauge cpuLoad={metrics[0].cpu.load} />
                    <UsageTable history={metrics} />
                    <RealTimeMetrics metrics={metrics} />
                </>
            )}

        </div>
        </div>
    );
};

export default Dashboard;
