import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

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

const NotifyStudent: React.FC = () => {
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
        toast.error('Error searching students');
      }
    } catch (error) {
      toast.error('Error searching students');
    } finally {
      setIsSearching(false);
    }
  };

  const sendNotification = async () => {
    if (!selectedCertificate || !email.trim()) {
      toast.error('Please select a student and enter an email address');
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
        toast.success('Notification sent successfully!');
        setEmail('');
        setSelectedCertificate(null);
        setSearchQuery('');
        setSearchResults([]);
      } else {
        const errorText = await response.text();
        toast.error(`Error sending notification: ${errorText}`);
      }
    } catch (error) {
      toast.error('Error sending notification');
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notify Student</h2>
          <p className="text-gray-600">
            Search for a student and send them a notification about their certificate.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Students
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter student name or certificate ID..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Search Results</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {searchResults.map((certificate) => (
                <div
                  key={certificate.id}
                  onClick={() => setSelectedCertificate(certificate)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCertificate?.id === certificate.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{certificate.studentName}</div>
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
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Selected Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-900">{selectedCertificate.studentName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Certificate ID:</span>
                <span className="ml-2 text-gray-900">{selectedCertificate.certificateId}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Degree:</span>
                <span className="ml-2 text-gray-900">{selectedCertificate.degree}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Date Issued:</span>
                <span className="ml-2 text-gray-900">{selectedCertificate.dateIssued}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Grade:</span>
                <span className="ml-2 text-gray-900">{selectedCertificate.grade}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">QQI Level:</span>
                <span className="ml-2 text-gray-900">{selectedCertificate.qqiLevel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student's email address..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setEmail('');
              setSelectedCertificate(null);
              setSearchQuery('');
              setSearchResults([]);
            }}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear
          </button>
          <button
            onClick={sendNotification}
            disabled={!selectedCertificate || !email.trim() || isSending}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSending ? 'Sending...' : 'Send Notification'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyStudent; 