import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import StudentDetailModal from './components/StudentDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import Toast from './components/Toast';

// Sub-pages
import DashboardOverview from './components/pages/DashboardOverview';
import AcademicsPage from './components/pages/AcademicsPage';
import AttendanceHub from './components/pages/AttendanceHub';
import FeesBilling from './components/pages/FeesBilling';
import ReportsPage from './components/pages/ReportsPage';
import SettingsPage from './components/pages/SettingsPage';

import { studentApi, getApiConfig } from './services/api';
import { UserPlus } from 'lucide-react';

const DEPARTMENTS = [
  'Artificial Intelligence and Data Science',
  'Artificial Intelligence and Machine Learning',
  'Computer Science and Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering',
  'Mechanical Engineering',
  'Bio Technology',
  'Cyber Security',
  'Master of Business Administration'
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('edupulse_theme') || 'light');
  
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');

  // Student Data & Status
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('All');

  // Modal States
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [apiConfig, setApiConfigState] = useState(getApiConfig());

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Theme
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('edupulse_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * HTTP GET: Fetch Students
   */
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await studentApi.getAll({
        search: searchQuery,
        department: selectedDepartment,
        feeStatus: selectedFeeStatus
      });
      setStudents(response.data || []);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedDepartment, selectedFeeStatus]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  /**
   * Handle Create or Update Student in MySQL
   */
  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent && editingStudent.id) {
        await studentApi.update(editingStudent.id, formData);
        addToast(
          'success',
          'Database Updated',
          `Updated student record for "${formData.name}" in MySQL Workbench.`
        );
      } else {
        await studentApi.create(formData);
        addToast(
          'success',
          'Student Inserted in Database',
          `Successfully saved "${formData.name}" to MySQL Workbench via Spring Boot.`
        );
      }
      setIsAddEditModalOpen(false);
      setEditingStudent(null);
      await fetchStudents();
    } catch (err) {
      console.error('Save error:', err);
      addToast(
        'error',
        'Database Error',
        err.message || 'Could not save student to MySQL Workbench. Check if Spring Boot is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Quick update for student from any subpage (e.g. attendance / fees)
   */
  const handleUpdateStudentDirect = async (id, updatedData) => {
    try {
      await studentApi.update(id, updatedData);
      addToast('success', 'Record Updated', `Updated student details for ${updatedData.name}.`);
      await fetchStudents();
    } catch (err) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  /**
   * View Student Details
   */
  const handleViewStudent = async (student) => {
    try {
      const res = await studentApi.getById(student.id);
      setViewingStudent(res.data || student);
      setIsDetailModalOpen(true);
    } catch (err) {
      setViewingStudent(student);
      setIsDetailModalOpen(true);
    }
  };

  /**
   * Open Edit Modal
   */
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setIsAddEditModalOpen(true);
  };

  /**
   * Open Add Modal
   */
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsAddEditModalOpen(true);
  };

  /**
   * Open Delete Confirmation
   */
  const handleOpenDelete = (student) => {
    setDeletingStudent(student);
    setIsDeleteModalOpen(true);
  };

  /**
   * Delete Student from MySQL Database
   */
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      await studentApi.delete(deletingStudent.id);
      addToast(
        'success',
        'Record Deleted from Database',
        `Student "${deletingStudent.name}" (${deletingStudent.rollNo}) removed from MySQL Workbench.`
      );
      setIsDeleteModalOpen(false);
      setDeletingStudent(null);
      await fetchStudents();
    } catch (err) {
      console.error('Delete error:', err);
      addToast(
        'error',
        'Delete Operation Failed',
        err.message || 'Could not delete student from MySQL Workbench.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Reset Database
   */
  const handleResetDatabase = async () => {
    try {
      const initial = await studentApi.resetDatabase();
      setStudents(initial);
      addToast('info', 'Database Reset', 'Reset ERP database to default sample records.');
    } catch (err) {
      addToast('error', 'Reset Failed', err.message);
    }
  };

  // Render content based on activeTab
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview 
            students={students} 
            onNavigate={setActiveTab} 
            onEnrollStudent={handleOpenAdd} 
          />
        );

      case 'students':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="page-header">
              <div className="page-header-info">
                <h1>Student Directory</h1>
                <p>Prathyusha Engineering College &bull; Student Records & MySQL Database</p>
              </div>
              <div className="action-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={handleOpenAdd}
                >
                  <UserPlus size={17} />
                  <span>Enroll New Student</span>
                </button>
              </div>
            </div>

            <StudentTable 
              students={students}
              isLoading={isLoading}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              selectedFeeStatus={selectedFeeStatus}
              setSelectedFeeStatus={setSelectedFeeStatus}
              departments={DEPARTMENTS}
              onViewStudent={handleViewStudent}
              onEditStudent={handleOpenEdit}
              onDeleteStudent={handleOpenDelete}
              onOpenAddModal={handleOpenAdd}
            />
          </div>
        );

      case 'academics':
        return (
          <AcademicsPage onEnrollStudent={handleOpenAdd} />
        );

      case 'attendance':
        return (
          <AttendanceHub 
            students={students} 
            onUpdateStudent={handleUpdateStudentDirect} 
          />
        );

      case 'fees':
        return (
          <FeesBilling 
            students={students} 
            onUpdateStudent={handleUpdateStudentDirect} 
          />
        );

      case 'reports':
        return (
          <ReportsPage students={students} />
        );

      case 'settings':
        return (
          <SettingsPage onResetDatabase={handleResetDatabase} />
        );

      default:
        return (
          <DashboardOverview 
            students={students} 
            onNavigate={setActiveTab} 
            onEnrollStudent={handleOpenAdd} 
          />
        );
    }
  };

  return (
    <div className="app-layout">
      {/* ERP Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentCount={students.length} 
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Navbar */}
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
          apiConfig={apiConfig}
          onOpenApiSettings={() => setActiveTab('settings')}
          onRefreshData={fetchStudents}
          isLoading={isLoading}
        />

        {/* Dynamic Page Container */}
        <main className="page-container">
          {renderActiveTabContent()}
        </main>
      </div>

      {/* Add / Edit Student Modal (POST / PUT) */}
      <StudentModal 
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSubmit={handleSaveStudent}
        initialData={editingStudent}
        isSubmitting={isSubmitting}
        departments={DEPARTMENTS}
      />

      {/* View Student 360 Profile Modal (GET by ID) */}
      <StudentDetailModal 
        isOpen={isDetailModalOpen}
        student={viewingStudent}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Delete Confirmation Modal (DELETE) */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        student={deletingStudent}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* API Config Modal */}
      <ApiSettingsModal 
        isOpen={isApiSettingsOpen}
        onClose={() => setIsApiSettingsOpen(false)}
        onConfigSaved={(conf) => {
          setApiConfigState(conf);
          fetchStudents();
        }}
        onResetDatabase={handleResetDatabase}
      />

      {/* Real-time Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
