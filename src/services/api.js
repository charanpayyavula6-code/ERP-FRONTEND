/**
 * Spring Boot Student REST API Service
 * Directly connected to: http://localhost:8080/api/students
 */

const SPRING_BOOT_URL = 'http://localhost:8080/api/students';
const PROXY_URL = '/api/students';
const CONFIG_KEY = 'edupulse_api_config';

export const getApiConfig = () => {
  const conf = localStorage.getItem(CONFIG_KEY);
  if (!conf) return { isMock: false, baseUrl: 'http://localhost:8080/api' };
  try { return JSON.parse(conf); } catch { return { isMock: false, baseUrl: 'http://localhost:8080/api' }; }
};

export const setApiConfig = (config) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

/**
 * Format payload sending all common entity field variations
 * so Spring Boot JPA / Hibernate / MySQL Workbench maps every column automatically.
 */
export const formatPayloadForDatabase = (formData) => {
  const gpaVal = parseFloat(formData.gpa) || 0.0;
  const attendanceVal = parseInt(formData.attendance, 10) || 0;

  return {
    // Standard names
    name: formData.name?.trim(),
    fullName: formData.name?.trim(),
    studentName: formData.name?.trim(),

    email: formData.email?.trim(),
    studentEmail: formData.email?.trim(),

    phone: formData.phone?.trim(),
    phoneNumber: formData.phone?.trim(),
    contactNumber: formData.phone?.trim(),

    rollNo: formData.rollNo?.trim(),
    roll_no: formData.rollNo?.trim(),
    rollNumber: formData.rollNo?.trim(),

    department: formData.department,
    dept: formData.department,
    branch: formData.department,

    semester: formData.semester,
    sem: formData.semester,

    gpa: gpaVal,
    cgpa: gpaVal,

    attendance: attendanceVal,
    attendancePercentage: attendanceVal,

    feeStatus: formData.feeStatus || 'Paid',
    fee_status: formData.feeStatus || 'Paid',
    paymentStatus: formData.feeStatus || 'Paid',

    status: formData.status || 'Active',
    academicStatus: formData.status || 'Active',

    address: formData.address?.trim() || '',
    residentialAddress: formData.address?.trim() || '',

    admissionDate: formData.admissionDate || new Date().toISOString().split('T')[0],
    admission_date: formData.admissionDate || new Date().toISOString().split('T')[0],

    avatarColor: formData.avatarColor || '#4f46e5'
  };
};

/**
 * Helper to normalize any student entity returned by MySQL / Spring Boot
 */
const normalizeStudent = (s, idx = 0) => {
  if (!s) return null;
  const avatarColors = ['#4f46e5', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  return {
    id: String(s.id ?? s._id ?? s.studentId ?? (idx + 1)),
    name: s.name || s.fullName || s.studentName || 'Student',
    email: s.email || s.studentEmail || '',
    phone: s.phone || s.phoneNumber || s.contactNumber || '',
    rollNo: s.rollNo || s.roll_no || s.rollNumber || `CS-${idx + 1}`,
    department: s.department || s.dept || s.branch || 'Computer Science',
    semester: s.semester || s.sem || '1st Sem',
    gpa: Number(s.gpa ?? s.cgpa ?? 0.0),
    attendance: Number(s.attendance ?? s.attendancePercentage ?? 0),
    feeStatus: s.feeStatus || s.fee_status || s.paymentStatus || 'Paid',
    status: s.status || s.academicStatus || 'Active',
    admissionDate: s.admissionDate || s.admission_date || '2024-08-01',
    address: s.address || s.residentialAddress || '',
    avatarColor: s.avatarColor || avatarColors[idx % avatarColors.length]
  };
};

/**
 * Helper function to execute request with fallback between direct port 8080 and Vite proxy
 */
async function executeApiRequest(pathAndQuery = '', options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  // Primary: Try direct Spring Boot URL
  const directUrl = `${SPRING_BOOT_URL}${pathAndQuery}`;
  // Secondary: Try proxy URL
  const proxyUrl = `${PROXY_URL}${pathAndQuery}`;

  let lastError = null;

  // Try direct fetch first
  try {
    const response = await fetch(directUrl, {
      ...options,
      headers
    });
    return response;
  } catch (err) {
    lastError = err;
    console.warn(`Direct fetch to ${directUrl} failed, trying proxy ${proxyUrl}...`, err.message);
  }

  // Try proxy fetch
  try {
    const response = await fetch(proxyUrl, {
      ...options,
      headers
    });
    return response;
  } catch (err) {
    console.error(`Proxy fetch to ${proxyUrl} also failed:`, err.message);
    throw new Error(
      `Cannot connect to Spring Boot at http://localhost:8080/api/students. Please ensure your Spring Boot application is running and MySQL connection is active. (${lastError?.message || err.message})`
    );
  }
}

export const studentApi = {
  /**
   * Check connection status to Spring Boot
   */
  async ping() {
    try {
      const res = await executeApiRequest('', { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * 1. GET ALL STUDENTS FROM MYSQL DATABASE
   */
  async getAll(params = {}) {
    let query = '';
    const qParams = [];
    if (params.search) qParams.push(`search=${encodeURIComponent(params.search)}`);
    if (params.department && params.department !== 'All') qParams.push(`department=${encodeURIComponent(params.department)}`);
    if (qParams.length > 0) query = `?${qParams.join('&')}`;

    const response = await executeApiRequest(query, { method: 'GET' });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`Spring Boot GET failed (HTTP ${response.status}): ${errBody || response.statusText}`);
    }

    const raw = await response.json();
    const list = Array.isArray(raw) ? raw : (raw?.content || raw?.data || []);
    const normalized = list.map((item, idx) => normalizeStudent(item, idx));
    return { data: normalized };
  },

  /**
   * 2. GET SINGLE STUDENT BY ID
   */
  async getById(id) {
    const response = await executeApiRequest(`/${id}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Student with ID ${id} not found in database (HTTP ${response.status})`);
    }
    const raw = await response.json();
    return { data: normalizeStudent(raw?.data || raw) };
  },

  /**
   * 3. INSERT STUDENT INTO MYSQL WORKBENCH VIA POST
   */
  async create(formData) {
    const payload = formatPayloadForDatabase(formData);
    console.log('Sending POST payload to Spring Boot:', payload);

    const response = await executeApiRequest('', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error('Spring Boot POST Error:', response.status, errBody);
      throw new Error(`Spring Boot rejected save (HTTP ${response.status}): ${errBody || response.statusText}. Check MySQL constraints / column mapping.`);
    }

    // Parse response
    let saved = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const raw = await response.json().catch(() => null);
      saved = raw ? normalizeStudent(raw.data || raw) : null;
    }

    return { 
      data: saved || payload,
      success: true
    };
  },

  /**
   * 4. UPDATE STUDENT IN MYSQL VIA PUT
   */
  async update(id, formData) {
    const payload = formatPayloadForDatabase(formData);
    console.log(`Sending PUT payload to Spring Boot for ID ${id}:`, payload);

    const response = await executeApiRequest(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...payload, id })
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error('Spring Boot PUT Error:', response.status, errBody);
      throw new Error(`Spring Boot rejected update (HTTP ${response.status}): ${errBody || response.statusText}`);
    }

    let updated = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const raw = await response.json().catch(() => null);
      updated = raw ? normalizeStudent(raw.data || raw) : null;
    }

    return { 
      data: updated || { ...payload, id },
      success: true
    };
  },

  /**
   * 5. DELETE STUDENT FROM MYSQL VIA DELETE
   */
  async delete(id) {
    console.log(`Sending DELETE request to Spring Boot for ID ${id}`);
    const response = await executeApiRequest(`/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error('Spring Boot DELETE Error:', response.status, errBody);
      throw new Error(`Spring Boot rejected delete (HTTP ${response.status}): ${errBody || response.statusText}`);
    }

    return { success: true };
  }
};
