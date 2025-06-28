import React, { memo, useState } from 'react';
import Pagination from './common/Pagination';
import './UsageTable.css';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from './useSocket';

interface Metric {
  memory: { total: number; used: number; free: number };
  disk: { fs: string; size: number; used: number; use: number }[];
  createdAt: string;
}

interface Props {
  history: Metric[];
}

const UsageTable: React.FC<Props> = ({ history }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [latest, setLatest] = useState<Metric[] | null>(history);
  
  const {user} = useAuth();


  const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;

  if(user){
      useSocket(user.id, (newMetric: Metric) => {
        console.log("newMetric: ", newMetric);
          setLatest([newMetric, ...latest ?? []]);
      });
    }

  const totalPages = Math.ceil((latest ? latest.length : 0) / pageSize);
  const paginatedData = (latest ?? []).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-4">
      <h2 className="h5 fw-semibold mb-3">Memory & Disk Usage History</h2>

      {/* Scrollable table container */}
      <div>
        <div className="table-responsive"  style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="table table-striped table-sticky table-bordered table-hover align-middle text-center mb-0">
            <thead className="table-dark sticky-top">
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Used Memory</th>
                <th scope="col">Used Disk (%)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((metric, idx) => {
                const diskUseAvg =
                  metric.disk.reduce((acc, d) => acc + d.use, 0) / metric.disk.length;
                return (
                  <tr key={idx}>
                    <td>{new Date(metric.createdAt).toLocaleTimeString()}</td>
                    <td>{formatBytes(metric.memory.used)}</td>
                    <td>{diskUseAvg.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination placed outside the scroll container */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default memo(UsageTable);
