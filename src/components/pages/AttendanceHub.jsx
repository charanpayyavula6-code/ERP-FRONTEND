import React, { useState } from 'react';
import { 
  CalendarCheck, 
  AlertTriangle, 
  CheckCircle2, 
  SlidersHorizontal, 
  Users, 
  Clock,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export default function AttendanceHub({ students, onUpdateStudent }) {
  const [filterDept, setFilterDept] = useState('All');
  const [filterThreshold, setFilterThreshold] = useState('All');

  const filtered = students.filter(s => {
    if (filterDept !== 'All' && s.department !== filterDept) return false;
    const att = Number(s.attendance) || 0;
    if (filterThreshold === 'Low' && att >= 75) return false;
    if (filterThreshold === 'Warning' && (att < 75 || att >= 85)) return false;
    if (filterThreshold === 'Optimal' && att < 85) return false;
    return true;
  });

  const lowAttendanceCount = students.filter(s => Number(s.attendance) < 75).length;
  const optimalCount = students.filter(s => Number(s.attendance) >= 85).length;
  const avgAttendance = students.length > 0
    ? Math.round(students.reduce((acc, curr) => acc + (Number(curr.attendance) || 0), 0) / students.length)
    : 0;

  const departments = Array.from(new Set(students.map(s => s.department))).filter(Boolean);

  const handleQuickAttendance = (student, change) => {
    const current = Number(student.attendance) || 0;
    const nextVal = Math.min(100, Math.max(0, current + change));
    if (onUpdateStudent) {
      onUpdateStudent(student.id, { ...student, attendance: nextVal });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Attendance Compliance Hub</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Prathyusha Engineering College &bull; Real-time Anna University & Autonomous Attendance Tracking (75% Minimum Required)
        </p>
      </div>

      {/* Metric Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Average Attendance</div>
            <div className="stat-value">{avgAttendance}%</div>
            <div className="stat-trend positive">
              <CheckCircle2 size={14} />
              <span>Campus Overall Average</span>
            </div>
          </div>
          <div className="stat-icon-wrapper green">
            <CalendarCheck size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Optimal Attendance (&ge;85%)</div>
            <div className="stat-value">{optimalCount}</div>
            <div className="stat-trend positive">
              <span>Exam Eligible Direct</span>
            </div>
          </div>
          <div className="stat-icon-wrapper blue">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">At Risk (&lt;75% Attendance)</div>
            <div className="stat-value" style={{ color: '#dc2626' }}>{lowAttendanceCount}</div>
            <div className="stat-trend warning">
              <AlertTriangle size={14} color="#dc2626" />
              <span style={{ color: '#dc2626' }}>Notice Required</span>
            </div>
          </div>
          <div className="stat-icon-wrapper orange">
            <TrendingDown size={24} color="#dc2626" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="content-card">
        <div className="card-header-toolbar">
          <div className="toolbar-filters">
            <SlidersHorizontal size={16} color="var(--text-muted)" />
            <select
              className="select-filter"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              className="select-filter"
              value={filterThreshold}
              onChange={(e) => setFilterThreshold(e.target.value)}
            >
              <option value="All">All Compliance Levels</option>
              <option value="Optimal">Optimal (&ge;85%)</option>
              <option value="Warning">Warning (75% - 84%)</option>
              <option value="Low">Critical Shortage (&lt;75%)</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Name & Roll No</th>
                <th>Department</th>
                <th>Current Attendance</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Quick Adjust</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No students match the attendance filter.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const att = Number(s.attendance) || 0;
                  const isLow = att < 75;
                  const isWarning = att >= 75 && att < 85;

                  return (
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isLow ? '#dc2626' : isWarning ? '#d97706' : '#15803d' }}>
                            {att}%
                          </span>
                          <div style={{ width: '100px', height: '6px', background: 'var(--bg-card-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${att}%`, 
                                height: '100%', 
                                background: isLow ? '#dc2626' : isWarning ? '#f59e0b' : '#10b981' 
                              }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        {isLow ? (
                          <span className="badge badge-danger">Shortage (&lt;75%)</span>
                        ) : isWarning ? (
                          <span className="badge badge-warning">Borderline</span>
                        ) : (
                          <span className="badge badge-success">Eligible</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => handleQuickAttendance(s, -1)}
                            title="Decrease 1%"
                          >
                            -1%
                          </button>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => handleQuickAttendance(s, 1)}
                            title="Increase 1%"
                          >
                            +1%
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
