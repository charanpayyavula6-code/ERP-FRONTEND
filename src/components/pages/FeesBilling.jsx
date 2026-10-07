import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  FileText, 
  Receipt,
  Search
} from 'lucide-react';

export default function FeesBilling({ students, onUpdateStudent }) {
  const [filterFee, setFilterFee] = useState('All');
  const [search, setSearch] = useState('');

  const paidList = students.filter(s => s.feeStatus === 'Paid');
  const pendingList = students.filter(s => s.feeStatus === 'Pending');
  const overdueList = students.filter(s => s.feeStatus === 'Overdue');

  const filtered = students.filter(s => {
    if (filterFee !== 'All' && s.feeStatus !== filterFee) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q);
    }
    return true;
  });

  const handleToggleFeeStatus = (student, newStatus) => {
    if (onUpdateStudent) {
      onUpdateStudent(student.id, { ...student, feeStatus: newStatus });
    }
  };

  const generateReceipt = (student) => {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Fee Receipt - ${student.name}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #70091b; padding-bottom: 20px; }
            .title { font-size: 20px; font-weight: bold; color: #70091b; }
            .details { margin: 30px 0; line-height: 1.8; }
            .badge { display: inline-block; padding: 4px 10px; background: #ecfdf5; color: #047857; font-weight: bold; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">PRATHYUSHA ENGINEERING COLLEGE</div>
            <div>Autonomous &bull; NAAC 'A' Grade</div>
            <h3>TUITION FEE OFFICIAL RECEIPT</h3>
          </div>
          <div class="details">
            <p><strong>Student Name:</strong> ${student.name}</p>
            <p><strong>Roll Number:</strong> ${student.rollNo}</p>
            <p><strong>Department:</strong> ${student.department} (${student.semester})</p>
            <p><strong>Payment Status:</strong> <span class="badge">${student.feeStatus}</span></p>
            <p><strong>Tuition Fee Paid:</strong> ₹85,000 / Semester</p>
            <p><strong>Transaction Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <p style="margin-top: 50px; text-align: right;"><strong>Accounts Officer / Registrar</strong></p>
        </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Tuition Fees & Billing Management</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Prathyusha Engineering College &bull; Academic Year 2026-27 Fee Collection & Vouchers
        </p>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Cleared Accounts</div>
            <div className="stat-value">{paidList.length}</div>
            <div className="stat-trend positive">
              <CheckCircle size={14} />
              <span>Full Payment Received</span>
            </div>
          </div>
          <div className="stat-icon-wrapper green">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Pending Invoices</div>
            <div className="stat-value" style={{ color: '#d97706' }}>{pendingList.length}</div>
            <div className="stat-trend warning">
              <Clock size={14} />
              <span>Due in Current Cycle</span>
            </div>
          </div>
          <div className="stat-icon-wrapper orange">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Overdue Notices</div>
            <div className="stat-value" style={{ color: '#dc2626' }}>{overdueList.length}</div>
            <div className="stat-trend warning">
              <AlertCircle size={14} color="#dc2626" />
              <span style={{ color: '#dc2626' }}>Reminder Dispatched</span>
            </div>
          </div>
          <div className="stat-icon-wrapper orange">
            <AlertCircle size={24} color="#dc2626" />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="content-card">
        <div className="card-header-toolbar">
          <div className="toolbar-filters">
            <select
              className="select-filter"
              value={filterFee}
              onChange={(e) => setFilterFee(e.target.value)}
            >
              <option value="All">All Payment Statuses</option>
              <option value="Paid">Paid Accounts</option>
              <option value="Pending">Pending Accounts</option>
              <option value="Overdue">Overdue Accounts</option>
            </select>
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <input 
              type="text"
              placeholder="Search student fee records..."
              className="form-input"
              style={{ paddingLeft: '32px', fontSize: '0.82rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Details</th>
                <th>Department</th>
                <th>Status</th>
                <th>Update Payment</th>
                <th style={{ textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No fee records found for current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.rollNo}</div>
                    </td>
                    <td>
                      <div>{s.department}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.semester}</div>
                    </td>
                    <td>
                      <span className={`badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                        {s.feeStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        className="select-filter"
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        value={s.feeStatus}
                        onChange={(e) => handleToggleFeeStatus(s, e.target.value)}
                      >
                        <option value="Paid">Mark as Paid</option>
                        <option value="Pending">Mark as Pending</option>
                        <option value="Overdue">Mark as Overdue</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          onClick={() => generateReceipt(s)}
                          title="Generate Official PEC Receipt"
                        >
                          <Receipt size={14} /> Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
