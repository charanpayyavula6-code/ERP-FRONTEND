import React from 'react';
import StatsCards from '../StatsCards';
import { 
  Users, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export default function DashboardOverview({ 
  students, 
  onNavigate, 
  onEnrollStudent 
}) {
  const departments = [
    { name: 'Artificial Intelligence & DS', code: 'AI&DS', students: students.filter(s => s.department?.includes('Data Science')).length || 142, icon: '🤖' },
    { name: 'Computer Science & Engg', code: 'CSE', students: students.filter(s => s.department?.includes('Computer Science')).length || 240, icon: '💻' },
    { name: 'Information Technology', code: 'IT', students: students.filter(s => s.department?.includes('Information')).length || 180, icon: '🌐' },
    { name: 'AI & Machine Learning', code: 'AI&ML', students: students.filter(s => s.department?.includes('Machine Learning')).length || 120, icon: '🧠' },
    { name: 'Electronics & Comm Engg', code: 'ECE', students: students.filter(s => s.department?.includes('Electronics')).length || 160, icon: '⚡' },
    { name: 'Bio Technology', code: 'BIO-TECH', students: students.filter(s => s.department?.includes('Bio')).length || 95, icon: '🧬' }
  ];

  const recentStudents = students.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #70091b 0%, #991b1b 50%, #b91c1c 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 10px 25px rgba(112, 9, 27, 0.25)',
        border: '1px solid rgba(251, 191, 36, 0.3)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: '#f59e0b', color: '#70091b', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              PEC ERP v2.5
            </span>
            <span style={{ fontSize: '0.85rem', color: '#fed7aa', fontWeight: 600 }}>
              Academic Year 2026–27
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Welcome to Prathyusha Engineering College ERP
          </h2>
          <p style={{ color: '#fecaca', fontSize: '0.92rem', marginTop: '4px', maxWidth: '650px' }}>
            Autonomous Institution &bull; Affiliated to Anna University &bull; Approved by AICTE, New Delhi &bull; NAAC Accredited 'A' Grade
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ background: '#ffffff', color: '#70091b', fontWeight: 700 }}
            onClick={onEnrollStudent}
          >
            + Enroll Student
          </button>
          <button 
            className="btn" 
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
            onClick={() => onNavigate('students')}
          >
            View Student Directory <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Main KPI Stats */}
      <StatsCards students={students} />

      {/* Grid: Departments Breakdown & Recent Admissions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Department Portals */}
        <div className="content-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Academic Departments</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Undergraduate & Postgraduate Programs</p>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              onClick={() => onNavigate('academics')}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {departments.map((dept) => (
              <div 
                key={dept.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onClick={() => onNavigate('academics')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.3rem' }}>{dept.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{dept.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Code: {dept.code}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="roll-badge" style={{ background: '#fef2f2', color: '#991b1b', fontWeight: 700 }}>
                    {dept.students} Enrolled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admissions & Quick Notice */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Students Feed */}
          <div className="content-card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Student Admissions</h3>
              <button 
                className="btn btn-secondary" 
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                onClick={() => onNavigate('students')}
              >
                See All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentStudents.map((s) => (
                <div 
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div 
                      className="student-avatar" 
                      style={{ width: '34px', height: '34px', backgroundColor: s.avatarColor || '#991b1b', fontSize: '0.78rem' }}
                    >
                      {s.name ? s.name.charAt(0) : 'S'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.rollNo} &bull; {s.department}</div>
                    </div>
                  </div>
                  <span className="badge badge-success">{s.feeStatus || 'Paid'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Schedule Notice */}
          <div className="content-card" style={{ padding: '20px', borderLeft: '4px solid #b91c1c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Calendar size={18} color="#b91c1c" />
              <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Semester End Examination Portal</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Hall tickets generation and internal attendance compliance check for Anna University / Autonomous end-semester exams are now open.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
