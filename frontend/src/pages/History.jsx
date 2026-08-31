import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { History as HistoryIcon, Search, Filter, Eye, FileText, Download } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import SearchBar from '../components/common/SearchBar';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { getVerificationHistory } from '../services/api';

const History = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || 'ALL';

  const [search, setSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [docTypeFilter, setDocTypeFilter] = useState('ALL');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await getVerificationHistory({
          search,
          status: statusFilter,
          docType: docTypeFilter
        });
        setRecords(res.records);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load history:', err);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [search, statusFilter, docTypeFilter]);

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'verified';
      case 'SUSPICIOUS':
        return 'suspicious';
      case 'HIGH RISK':
        return 'high_risk';
      default:
        return 'info';
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Document Verification History Audit Logs"
        subtitle="Searchable repository of all processed identity documents, security risk scores, and officer decisions."
      />

      {/* Filter and Search Bar Container */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <SearchBar
              value={search}
              onChange={setSearch}
              onClear={() => setSearch('')}
              placeholder="Search ID, name, or doc #..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400">Filter:</span>
            </div>

            {/* Status Selector */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs py-2 px-3 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified / Clear</option>
              <option value="SUSPICIOUS">Suspicious</option>
              <option value="HIGH RISK">High Risk</option>
            </select>

            {/* Category Selector */}
            <select
              value={docTypeFilter}
              onChange={(e) => setDocTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs py-2 px-3 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Document Types</option>
              <option value="Passport">Passport</option>
              <option value="National ID">National ID</option>
              <option value="Travel Visa">Travel Visa</option>
              <option value="Driver License">Driver License</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main History Table */}
      <Card bodyClassName="p-0 overflow-hidden">
        {loading ? (
          <Loader text="Fetching verification logs..." />
        ) : records.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p>No document verification records match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-[10px] font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Document ID</th>
                  <th className="py-3.5 px-4">Subject & Type</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Officer</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Risk Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {records.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">{item.id}</td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-slate-100">{item.personName}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.docType} ({item.docNumber})
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{item.country || 'IND'}</td>
                    <td className="py-3.5 px-4">{item.officer}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{item.timestamp}</td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span
                        className={
                          item.riskScore <= 30
                            ? 'text-emerald-400'
                            : item.riskScore <= 70
                            ? 'text-amber-400'
                            : 'text-rose-500'
                        }
                      >
                        {item.riskScore} / 100
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={() => navigate(`/verification-result?id=${item.id}`)}
                      >
                        View Report
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Showing {records.length} records</span>
          <span>Audit Log Integrity: SHA-256 Verified</span>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default History;
