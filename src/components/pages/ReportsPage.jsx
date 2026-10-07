import React from 'react';
import { 
  BarChart3, 
  Award, 
  TrendingUp, 
  Download, 
  FileSpreadsheet, 
  PieChart, 
  CheckCircle2, 
  Star 
} from 'lucide-react';

export default function ReportsPage({ students }) {
  const total = students.length;
  const avgGpa = total > 0 
    ? (students.reduce((acc, curr) => acc + (Number(curr.gpa) || 0), 0) / total).toFixed(2)
    : '0.00';

  const distinctionCount = students.filter(s => Number(s.gpa) >= 8.5).length;
  const firstClassCount = students.filter(s => Number(s.gpa) >= 7.0 && Number(s.gpa) < 8.5).length;

  const topStudents = [...students].sort((a, b) => (Number(b.gpa) || 0) - (Number(a.gpa) || 0)).slice(0, 5);

  const downloadFullReport = () => {
    const headers = ['Roll No,Name,Department,Semester,GPA/CGPA,Attendance,Fee Status,Academic Status'];
    const rows = students.map(s => `"${s.rollNo}","${s.name}","${s.department}","${s.semester}",${s.gpa},${s.attendance}%,"${s.feeStatus}","${s.status}"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PEC_Academic_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Academic Analytics & Performance Reports</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Prathyusha Engineering College &bull; Semester CGPA Analytics & Institutional Metrics
          </p>
        </div>

        <button className="btn btn-primary" onClick={downloadFullReport}>
          <Download size={16} />
          <span>Export Master CSV Report</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Campus Average CGPA</div>
            <div className="stat-value">{avgGpa} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 10.0</span></div>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>Above Benchmark Target</span>
            </div>
          </div>
          <div className="stat-icon-wrapper green">
            <Award size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Distinction Tier (&ge;8.5 CGPA)</div>
            <div className="stat-value">{distinctionCount}</div>
            <div className="stat-trend positive">
              <Star size={14} />
              <span>High Academic Achievers</span>
            </div>
          </div>
          <div className="stat-icon-wrapper purple">
            <Star size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">First Class Tier (7.0 - 8.4)</div>
            <div className="stat-value">{firstClassCount}</div>
            <div className="stat-trend neutral">
              <span>{total > 0 ? Math.round((firstClassCount / total) * 100) : 0}% of Student Body</span>
            </div>
          </div>
          <div className="stat-icon-wrapper blue">
            <BarChart3 size={24} />
          </div>
        </div>
      </div>

      {/* Top Academic Rankers Card */}
      <div className="content-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
          Top Academic Achievers & Rankers
        </h3>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Department</th>
                <th>CGPA (Scale 10.0)</th>
                <th>Attendance</th>
                <th>Academic Status</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((s, idx) => (
                <tr key={s.id}>
                  <td>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: idx === 0 ? '#fbbf24' : idx === 1 ? '#cbd5e1' : idx === 2 ? '#fed7aa' : 'var(--bg-card-subtle)',
                      color: idx === 0 ? '#78350f' : 'inherit',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem'
                    }}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.rollNo}</div>
                  </td>
                  <td>{s.department}</td>
                  <td>
                    <span style={{ fontWeight: 800, color: '#15803d', fontSize: '0.95rem' }}>
                      {Number(s.gpa).toFixed(2)}
                    </span>
                  </td>
                  <td>{s.attendance}%</td>
                  <td>
                    <span className="badge badge-success">Top Tier</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
