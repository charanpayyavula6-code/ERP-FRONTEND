import React from 'react';
import { Users, UserCheck, Award, WalletCards, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function StatsCards({ students }) {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  
  // Calculate average attendance
  const avgAttendance = totalStudents > 0 
    ? Math.round(students.reduce((acc, curr) => acc + (Number(curr.attendance) || 0), 0) / totalStudents)
    : 0;

  // Calculate fee collection percentage
  const paidFeesCount = students.filter(s => s.feeStatus === 'Paid').length;
  const feeCollectionRate = totalStudents > 0 
    ? Math.round((paidFeesCount / totalStudents) * 100) 
    : 0;

  return (
    <div className="stats-grid">
      {/* Total Students */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Total Enrollment</div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-trend positive">
            <ArrowUpRight size={14} />
            <span>+12% this academic year</span>
          </div>
        </div>
        <div className="stat-icon-wrapper blue">
          <Users size={24} />
        </div>
      </div>

      {/* Active Students */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Active Students</div>
          <div className="stat-value">{activeStudents}</div>
          <div className="stat-trend positive">
            <CheckCircle2 size={14} />
            <span>{totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0}% active status</span>
          </div>
        </div>
        <div className="stat-icon-wrapper purple">
          <UserCheck size={24} />
        </div>
      </div>

      {/* Average Attendance */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Avg. Attendance Rate</div>
          <div className="stat-value">{avgAttendance}%</div>
          <div className={`stat-trend ${avgAttendance >= 75 ? 'positive' : 'warning'}`}>
            <span>{avgAttendance >= 75 ? 'Optimal compliance' : 'Below 75% threshold'}</span>
          </div>
        </div>
        <div className="stat-icon-wrapper green">
          <Award size={24} />
        </div>
      </div>

      {/* Fee Clearance */}
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Fee Clearance Rate</div>
          <div className="stat-value">{feeCollectionRate}%</div>
          <div className="stat-trend neutral">
            <span>{paidFeesCount} / {totalStudents} Accounts cleared</span>
          </div>
        </div>
        <div className="stat-icon-wrapper orange">
          <WalletCards size={24} />
        </div>
      </div>
    </div>
  );
}
