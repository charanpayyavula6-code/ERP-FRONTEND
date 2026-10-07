import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Users, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  Building
} from 'lucide-react';

export default function AcademicsPage({ onEnrollStudent }) {
  const [selectedDept, setSelectedDept] = useState('AI&DS');

  const deptData = [
    {
      id: 'AI&DS',
      name: 'Department of Artificial Intelligence and Data Science',
      code: 'AIDS',
      established: 2020,
      hod: 'Dr. S. Karthikeyan, Ph.D.',
      intake: 120,
      labs: 4,
      faculty: 16,
      curriculum: 'R-2023 Autonomous CBCS',
      description: 'Pioneering cutting-edge education in Big Data, Machine Learning, Deep Neural Networks, and Predictive Analytics.',
      courses: ['Deep Learning Systems', 'Big Data Engineering', 'Natural Language Processing', 'Cloud Computing & MLOps']
    },
    {
      id: 'CSE',
      name: 'Department of Computer Science and Engineering',
      code: 'CSE',
      established: 2001,
      hod: 'Dr. M. Premkumar, M.E., Ph.D.',
      intake: 240,
      labs: 8,
      faculty: 28,
      curriculum: 'NBA Accredited R-2023',
      description: 'Empowering software architects with comprehensive foundations in full-stack development, distributed computing, algorithms, and cybersecurity.',
      courses: ['Full Stack Web Development', 'Distributed Systems', 'Compiler Design', 'Advanced Algorithms']
    },
    {
      id: 'IT',
      name: 'Department of Information Technology',
      code: 'IT',
      established: 2001,
      hod: 'Dr. P. Rajesh, Ph.D.',
      intake: 180,
      labs: 6,
      faculty: 22,
      curriculum: 'NBA Accredited R-2023',
      description: 'Specializing in Enterprise Software Engineering, DevOps pipelines, Web Architectures, and Cloud Networking.',
      courses: ['DevOps & CI/CD', 'Mobile Application Development', 'Database Administration', 'Information Security']
    },
    {
      id: 'AI&ML',
      name: 'Department of AI and Machine Learning',
      code: 'AIML',
      established: 2021,
      hod: 'Dr. V. Lakshmi, M.Tech., Ph.D.',
      intake: 120,
      labs: 4,
      faculty: 14,
      curriculum: 'R-2023 Autonomous',
      description: 'Focusing on Computer Vision, Generative AI models, Robotics, and Autonomous Cognitive Systems.',
      courses: ['Computer Vision', 'Reinforcement Learning', 'Generative AI', 'Robotics & Automation']
    },
    {
      id: 'ECE',
      name: 'Department of Electronics and Communication Engineering',
      code: 'ECE',
      established: 2001,
      hod: 'Dr. G. Ramesh, Ph.D.',
      intake: 180,
      labs: 7,
      faculty: 24,
      curriculum: 'NBA Accredited R-2023',
      description: 'Excellence in VLSI Design, Embedded Systems, IoT, Satellite Communications, and Signal Processing.',
      courses: ['VLSI Circuit Design', 'Embedded IoT Systems', 'Wireless Communications', 'Digital Signal Processing']
    },
    {
      id: 'BT',
      name: 'Department of Biotechnology',
      code: 'BIO-TECH',
      established: 2005,
      hod: 'Dr. K. Anitha, Ph.D.',
      intake: 60,
      labs: 5,
      faculty: 12,
      curriculum: 'R-2023 Autonomous',
      description: 'Advancing research in Genetic Engineering, Bioprocess Technology, Bioinformatics, and Immunotechnology.',
      courses: ['Genetic Engineering', 'Bioprocess Principles', 'Bioinformatics', 'Immunology']
    }
  ];

  const current = deptData.find(d => d.id === selectedDept) || deptData[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Academic Departments & Curriculum</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Prathyusha Engineering College &bull; Autonomous Regulations & Department Profiles
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={onEnrollStudent}
        >
          + Enroll New Student
        </button>
      </div>

      {/* Department Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {deptData.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDept(dept.id)}
            className={`btn ${selectedDept === dept.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {dept.code}
          </button>
        ))}
      </div>

      {/* Department Details View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Main Info Card */}
        <div className="content-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ background: '#fef2f2', color: '#991b1b', padding: '4px 10px', borderRadius: '4px', fontWeight: 800, fontSize: '0.85rem' }}>
              {current.code}
            </span>
            <span className="badge badge-success">{current.curriculum}</span>
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
            {current.name}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
            {current.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Head of Department</div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '4px' }}>{current.hod}</div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Annual Seat Intake</div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '4px', color: '#b91c1c' }}>{current.intake} Seats</div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Faculty Members</div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '4px' }}>{current.faculty} Professors</div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Research Laboratories</div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '4px' }}>{current.labs} Specialized Labs</div>
            </div>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>Key Academic Core Courses:</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {current.courses.map((course, i) => (
              <span key={i} style={{ padding: '6px 12px', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>
                &bull; {course}
              </span>
            ))}
          </div>
        </div>

        {/* Academic Regulations & Downloads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="content-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>Academic Regulations & Syllabus</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} color="#991b1b" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>R-2023 Curriculum & Syllabi</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PDF &bull; 2.4 MB</div>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }} onClick={() => window.open('https://prathyusha.edu.in/academic-courses-syllabus/', '_blank')}>
                  <ExternalLink size={12} /> View
                </button>
              </div>

              <div style={{ padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={18} color="#f59e0b" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Credit Structure & Grading</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>10.0 CGPA Scale &bull; 165 Credits</div>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }} onClick={() => window.open('https://prathyusha.edu.in/academic-courses-regulations/', '_blank')}>
                  <ExternalLink size={12} /> View
                </button>
              </div>
            </div>
          </div>

          <div className="content-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(153,27,27,0.06), rgba(245,158,11,0.06))' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#991b1b', marginBottom: '6px' }}>Autonomous Examination Cell</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Continuous Internal Assessment (CIA) marks and semester grade points are synced with the Anna University controller portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
