// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// API endpoints
export const API_ENDPOINTS = {
  CERTIFICATES: `${API_BASE_URL}/api/certificates`,
  VERIFY_CERTIFICATE: (memoHash: string) => `${API_BASE_URL}/api/certificates/verify/${memoHash}`,
  NCI_TOKEN: `${API_BASE_URL}/api/ncitoken`,
  SEARCH_STUDENTS: `${API_BASE_URL}/api/notifications/search-students`,
  SEND_NOTIFICATION: `${API_BASE_URL}/api/notifications/send-notification`,
}; 