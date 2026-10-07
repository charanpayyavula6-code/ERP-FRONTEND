import React, { useState } from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  CreditCard, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, studentCount }) {
  const [imgError, setImgError] = useState(false);

  // Official Prathyusha Engineering College logo URLs
  const collegeLogoUrl = "https://image-static.collegedunia.com/public/college_data/images/logos/1580288789PrathyushaCollegeLogo.jpg";

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Student Directory', icon: Users, badge: studentCount },
    { id: 'academics', label: 'Courses & Depts', icon: BookOpen },
    { id: 'attendance', label: 'Attendance Hub', icon: CalendarCheck },
    { id: 'fees', label: 'Fees & Billing', icon: CreditCard },
    { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="college-logo-container">
          {!imgError ? (
            <img 
              src={collegeLogoUrl} 
              alt="Prathyusha Engineering College Logo" 
              className="college-logo-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="brand-logo-icon">
              <GraduationCap size={22} />
            </div>
          )}
        </div>
        <div className="college-title-box">
          <div className="college-name">PRATHYUSHA</div>
          <div className="college-subname">Engineering College</div>
        </div>
      </div>

      {/* College Accreditation Banner */}
      <div className="sidebar-accreditation">
        <span className="pec-tag">PEC ERP</span>
        <span className="naac-tag">Autonomous &bull; NAAC 'A'</span>
      </div>

      {/* Navigation list */}
      <nav className="sidebar-nav">
        <div className="nav-section-title">Academic Portals</div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                  fontWeight: 700
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="nav-section-title" style={{ marginTop: '16px' }}>Administration</div>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
        >
          <Settings size={18} />
          <span>System Settings</span>
        </button>
        <button 
          onClick={() => window.open('https://prathyusha.edu.in', '_blank')}
          className="nav-link"
        >
          <Building2 size={18} />
          <span>College Official Website</span>
        </button>
      </nav>

      {/* Sidebar Footer / User Profile */}
      <div className="sidebar-footer">
        <div className="user-profile-badge">
          <div className="avatar">PEC</div>
          <div className="user-info-text">
            <div className="name">Admin Director</div>
            <div className="role">Registrar & ERP Cell</div>
          </div>
          <ShieldCheck size={16} color="#fbbf24" style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </aside>
  );
}
