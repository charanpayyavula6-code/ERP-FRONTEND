import React from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen, 
  CreditCard, 
  Activity,
  Edit2,
  Trash2
} from 'lucide-react';

export default function StudentDetailModal({
  isOpen,
  student,
  onClose,
  onEdit,
  onDelete
}) {
  if (!isOpen || !student) return null;

  const initials = student.name
    ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'ST';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--info-bg)',
              color: 'var(--info)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={16} />
            </div>
            <h2>Student Profile</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="profile-detail-card">
            {/* Hero Profile Header */}
            <div className="profile-hero">
              <div 
                className="profile-hero-avatar"
                style={{ backgroundColor: student.avatarColor || '#4f46e5' }}
              >
                {initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{student.name}</h3>
                  <span className="roll-badge">{student.rollNo}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px', color: 'var(--text-secondary)', fontSize: '0.86rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BookOpen size={14} /> {student.department} ({student.semester})
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> Admitted: {student.admissionDate || '2023-08-15'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Grid Info */}
            <div className="profile-grid">
              {/* Contact Information */}
              <div className="profile-item">
                <div className="label">Institutional Email</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                  <Mail size={14} color="var(--primary)" />
                  <span>{student.email}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="label">Contact Phone</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                  <Phone size={14} color="var(--primary)" />
                  <span>{student.phone}</span>
                </div>
              </div>

              {/* Academic Metrics */}
              <div className="profile-item">
                <div className="label">Cumulative GPA / CGPA</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                  <Award size={16} />
                  <span>{Number(student.gpa).toFixed(2)} / 10.00</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="label">Class Attendance</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={16} color="var(--info)" />
                  <span>{student.attendance}% Verified</span>
                </div>
              </div>

              {/* Financial & Status */}
              <div className="profile-item">
                <div className="label">Tuition Fee Clearance</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CreditCard size={16} color="var(--warning)" />
                  <span>{student.feeStatus}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="label">Enrollment Status</div>
                <div className="value">
                  <span className={`badge ${student.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {student.status}
                  </span>
                </div>
              </div>

              {/* Residential Address */}
              <div className="profile-item" style={{ gridColumn: 'span 2' }}>
                <div className="label">Residential Address</div>
                <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                  <MapPin size={16} color="var(--text-muted)" />
                  <span>{student.address || 'Address not registered on portal'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => {
              onClose();
              onDelete(student);
            }}
          >
            <Trash2 size={16} />
            <span>Delete Student</span>
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <Edit2 size={16} />
            <span>Edit Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
