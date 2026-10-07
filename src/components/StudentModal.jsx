import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, AlertCircle, Sparkles } from 'lucide-react';

export default function StudentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
  departments
}) {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNo: '',
    department: 'Computer Science',
    semester: '1st Sem',
    gpa: '3.5',
    attendance: '85',
    feeStatus: 'Paid',
    status: 'Active',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        rollNo: initialData.rollNo || '',
        department: initialData.department || 'Computer Science',
        semester: initialData.semester || '1st Sem',
        gpa: String(initialData.gpa ?? '3.5'),
        attendance: String(initialData.attendance ?? '85'),
        feeStatus: initialData.feeStatus || 'Paid',
        status: initialData.status || 'Active',
        address: initialData.address || ''
      });
    } else {
      // Defaults for new student
      setFormData({
        name: '',
        email: '',
        phone: '',
        rollNo: `2024CS${Math.floor(100 + Math.random() * 900)}`,
        department: 'Computer Science',
        semester: '1st Sem',
        gpa: '3.60',
        attendance: '90',
        feeStatus: 'Paid',
        status: 'Active',
        address: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Full name is required';
    if (!formData.email.trim()) {
      err.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = 'Please provide a valid email';
    }
    if (!formData.rollNo.trim()) err.rollNo = 'Roll number is required';
    if (!formData.phone.trim()) err.phone = 'Phone number is required';
    if (isNaN(Number(formData.gpa)) || Number(formData.gpa) < 0 || Number(formData.gpa) > 10.0) {
      err.gpa = 'GPA / CGPA must be between 0.0 and 10.0';
    }
    if (isNaN(Number(formData.attendance)) || Number(formData.attendance) < 0 || Number(formData.attendance) > 100) {
      err.attendance = 'Attendance must be between 0% and 100%';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isEditMode ? <Save size={16} /> : <UserPlus size={16} />}
            </div>
            <h2>{isEditMode ? 'Edit Student Details' : 'Enroll New Student'}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group form-group-full">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Institutional Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Roll No */}
              <div className="form-group">
                <label className="form-label">Roll Number *</label>
                <input
                  type="text"
                  name="rollNo"
                  className={`form-input ${errors.rollNo ? 'error' : ''}`}
                  placeholder="e.g. 2024CS101"
                  value={formData.rollNo}
                  onChange={handleChange}
                />
                {errors.rollNo && <span className="error-text">{errors.rollNo}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">Contact Phone *</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              {/* Department */}
              <div className="form-group">
                <label className="form-label">Department / Branch *</label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div className="form-group">
                <label className="form-label">Current Semester *</label>
                <select
                  name="semester"
                  className="form-select"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  {['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'].map((sem) => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              {/* GPA / CGPA Input Field */}
              <div className="form-group">
                <label className="form-label">Cumulative GPA / CGPA (0.0 - 10.0) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10.0"
                  name="gpa"
                  className={`form-input ${errors.gpa ? 'error' : ''}`}
                  placeholder="e.g. 8.75"
                  value={formData.gpa}
                  onChange={handleChange}
                />
                {errors.gpa && <span className="error-text">{errors.gpa}</span>}
              </div>

              {/* Attendance */}
              <div className="form-group">
                <label className="form-label">Attendance Percentage (0-100%) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="attendance"
                  className={`form-input ${errors.attendance ? 'error' : ''}`}
                  value={formData.attendance}
                  onChange={handleChange}
                />
                {errors.attendance && <span className="error-text">{errors.attendance}</span>}
              </div>

              {/* Fee Status */}
              <div className="form-group">
                <label className="form-label">Tuition Fee Status</label>
                <select
                  name="feeStatus"
                  className="form-select"
                  value={formData.feeStatus}
                  onChange={handleChange}
                >
                  <option value="Paid">Paid (Receipt Generated)</option>
                  <option value="Pending">Pending (Invoice Sent)</option>
                  <option value="Overdue">Overdue (Notice Issued)</option>
                </select>
              </div>

              {/* Academic Status */}
              <div className="form-group">
                <label className="form-label">Enrollment Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active Student</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive / Suspended</option>
                </select>
              </div>

              {/* Residential Address */}
              <div className="form-group form-group-full">
                <label className="form-label">Permanent / Residential Address</label>
                <textarea
                  name="address"
                  className="form-input"
                  rows={2}
                  placeholder="Door No, Street Name, City, District, State & PIN Code (e.g. No. 45, Gandhi Road, Chennai, Tamil Nadu - 600028)"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ resize: 'vertical', minHeight: '60px' }}
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isEditMode ? <Save size={16} /> : <UserPlus size={16} />}
              <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Enroll Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
