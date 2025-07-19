import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  degree: string;
  grade: string;
  qqiLevel: string;
  dateIssued: string;
  signedBy: string;
  institution: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const searchStudents = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.SEARCH_STUDENTS}?query=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setMessage('Error searching students');
      }
    } catch (error) {
      setMessage('Error searching students');
    } finally {
      setIsSearching(false);
    }
  };

  const sendNotification = async () => {
    if (!selectedCertificate || !email.trim()) {
      setMessage('Please select a student and enter an email address');
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(API_ENDPOINTS.SEND_NOTIFICATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificateId: selectedCertificate.id,
          email: email.trim()
        })
      });

      if (response.ok) {
        setMessage('Notification sent successfully!');
        setEmail('');
        setSelectedCertificate(null);
        setTimeout(() => {
          onClose();
          setMessage('');
        }, 2000);
      } else {
        const errorText = await response.text();
        setMessage(`Error sending notification: ${errorText}`);
      }
    } catch (error) {
      setMessage('Error sending notification');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchStudents();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Notify Student</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Students
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter student name..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Search Results</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((certificate) => (
                <div
                  key={certificate.id}
                  onClick={() => setSelectedCertificate(certificate)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCertificate?.id === certificate.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{certificate.studentName}</div>
                  <div className="text-sm text-gray-600">
                    {certificate.degree} - {certificate.certificateId}
                  </div>
                  <div className="text-xs text-gray-500">
                    Issued: {certificate.dateIssued}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Student Details */}
        {selectedCertificate && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Selected Student</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {selectedCertificate.studentName}
              </div>
              <div>
                <span className="font-medium">Certificate ID:</span> {selectedCertificate.certificateId}
              </div>
              <div>
                <span className="font-medium">Degree:</span> {selectedCertificate.degree}
              </div>
              <div>
                <span className="font-medium">Date Issued:</span> {selectedCertificate.dateIssued}
              </div>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student's email address..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-3 rounded-md ${
            message.includes('Error') || message.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={sendNotification}
            disabled={!selectedCertificate || !email.trim() || isSending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Send Notification'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal; 