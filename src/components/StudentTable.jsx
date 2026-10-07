import React from 'react';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Search, 
  SlidersHorizontal, 
  Download, 
  Inbox, 
  ChevronRight,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  selectedDepartment,
  setSelectedDepartment,
  selectedFeeStatus,
  setSelectedFeeStatus,
  departments,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onOpenAddModal
}) {
  const getFeeBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Overdue': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  const getAttendanceBarColor = (att) => {
    const val = Number(att) || 0;
    if (val >= 85) return '#10b981';
    if (val >= 75) return '#06b6d4';
    if (val >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const exportToCSV = () => {
    if (students.length === 0) return;
    const headers = ['ID,Name,Email,RollNo,Department,Semester,GPA,Attendance,FeeStatus,Status'];
    const rows = students.map(s => 
      `"${s.id}","${s.name}","${s.email}","${s.rollNo}","${s.department}","${s.semester}",${s.gpa},${s.attendance}%,"${s.feeStatus}","${s.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_erp_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="content-card">
      {/* Toolbar / Filters */}
      <div className="card-header-toolbar">
        <div className="toolbar-filters">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <SlidersHorizontal size={15} />
            <span>Filter:</span>
          </div>

          {/* Department Filter */}
          <select 
            className="select-filter"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Fee Status Filter */}
          <select 
            className="select-filter"
            value={selectedFeeStatus}
            onChange={(e) => setSelectedFeeStatus(e.target.value)}
          >
            <option value="All">All Fee Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="toolbar-actions">
          <button 
            className="btn btn-secondary"
            onClick={exportToCSV}
            title="Export current table view to CSV"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Student Info</th>
              <th>Roll Number</th>
              <th>Department & Sem</th>
              <th>Address / Location</th>
              <th>Academic CGPA</th>
              <th>Attendance</th>
              <th>Fee Status</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--primary)' }}>
                    <span>Loading student records...</span>
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="table-empty-state">
                    <Inbox size={48} />
                    <h3>No student records found</h3>
                    <p>No matches for current query filters or database is empty.</p>
                    <button 
                      className="btn btn-primary" 
                      style={{ marginTop: '16px' }}
                      onClick={onOpenAddModal}
                    >
                      + Enroll New Student
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const initials = student.name
                  ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                  : 'ST';
                return (
                  <tr key={student.id}>
                    {/* Student Identity */}
                    <td>
                      <div className="student-identity-cell">
                        <div 
                          className="student-avatar" 
                          style={{ backgroundColor: student.avatarColor || '#6366f1' }}
                        >
                          {initials}
                        </div>
                        <div className="student-names">
                          <div className="full-name">{student.name}</div>
                          <div className="email">{student.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Roll No */}
                    <td>
                      <span className="roll-badge">{student.rollNo || 'N/A'}</span>
                    </td>

                    {/* Dept & Semester */}
                    <td>
                      <div style={{ fontWeight: 600 }}>{student.department}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{student.semester}</div>
                    </td>

                    {/* Residential Address */}
                    <td>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={student.address || 'No address provided'}>
                        {student.address || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Not provided</span>}
                      </div>
                    </td>

                    {/* GPA / CGPA */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <span>{Number(student.gpa).toFixed(2)}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/ 10.0</span>
                      </div>
                    </td>

                    {/* Attendance */}
                    <td>
                      <div className="attendance-progress-wrap">
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                          <span>{student.attendance}%</span>
                        </div>
                        <div className="attendance-bar-bg">
                          <div 
                            className="attendance-bar-fill" 
                            style={{ 
                              width: `${Math.min(student.attendance, 100)}%`,
                              backgroundColor: getAttendanceBarColor(student.attendance)
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Fee Status */}
                    <td>
                      <span className={`badge ${getFeeBadgeClass(student.feeStatus)}`}>
                        {student.feeStatus}
                      </span>
                    </td>

                    {/* Academic Status */}
                    <td>
                      <span className={`badge ${student.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                        {student.status || 'Active'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {/* View */}
                        <button 
                          className="action-icon-btn view"
                          title="View Student Profile"
                          onClick={() => onViewStudent(student)}
                        >
                          <Eye size={16} />
                        </button>

                        {/* Edit */}
                        <button 
                          className="action-icon-btn edit"
                          title="Edit Student Details"
                          onClick={() => onEditStudent(student)}
                        >
                          <Edit3 size={16} />
                        </button>

                        {/* Delete */}
                        <button 
                          className="action-icon-btn delete"
                          title="Delete Student"
                          onClick={() => onDeleteStudent(student)}
                        >
                          <Trash2 size={16} />
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
  );
}
