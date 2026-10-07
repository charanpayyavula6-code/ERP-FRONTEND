import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Check, 
  RotateCcw, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Activity 
} from 'lucide-react';
import { studentApi } from '../../services/api';

export default function SettingsPage({ onResetDatabase }) {
  const [pingStatus, setPingStatus] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  const testConnection = async () => {
    setIsPinging(true);
    setPingStatus(null);
    try {
      const isOnline = await studentApi.ping();
      setPingStatus(isOnline ? 'online' : 'offline');
    } catch {
      setPingStatus('offline');
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>System & Database Administration</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Prathyusha Engineering College ERP &bull; Server Connection & MySQL Workbench Integration
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Spring Boot REST API Status Card */}
        <div className="content-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Server size={20} color="#991b1b" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Spring Boot Backend Status</h3>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            The frontend connects directly to your Spring Boot REST backend mapped to MySQL database on port <code>8080</code>.
          </p>

          <div style={{ padding: '14px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>REST API Base URL</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#991b1b', marginTop: '4px', fontFamily: 'monospace' }}>
              http://localhost:8080/api/students
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={testConnection}
              disabled={isPinging}
            >
              <Activity size={16} />
              <span>{isPinging ? 'Testing Connection...' : 'Test Backend Connection'}</span>
            </button>

            {pingStatus === 'online' && (
              <span className="badge badge-success" style={{ padding: '6px 12px' }}>
                &bull; Connected to Spring Boot
              </span>
            )}
            {pingStatus === 'offline' && (
              <span className="badge badge-warning" style={{ padding: '6px 12px' }}>
                &bull; Port 8080 Not Reachable (Local Fallback Active)
              </span>
            )}
          </div>
        </div>

        {/* Database Management Card */}
        <div className="content-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Database size={20} color="#f59e0b" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>MySQL Workbench Sync</h3>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            All student CRUD actions (Enroll, Update, Delete) are sent to MySQL Workbench via standard REST operations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
              <strong>MySQL Database Configuration:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                Driver: <code>com.mysql.cj.jdbc.Driver</code> &bull; Schema: <code>students_db</code>
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              style={{ color: '#b45309', width: '100%', justifyContent: 'center' }}
              onClick={onResetDatabase}
            >
              <RotateCcw size={15} />
              <span>Reset Sample Records</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
