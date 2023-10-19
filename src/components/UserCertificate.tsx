import React, { useState } from "react";
import api from "../api"; // Replace with your actual API instance for the third API
import { CertificateTable } from "./CertificateTable";

interface Certificate {
  id: number;
  unique_number: string;
  website_name: string;
  user_id: number;
  course: {
    name: string;
    description: string;
  };
}

export const UserCertificate: React.FC = () => {
  const [memberId, setMemberId] = useState("");
  const [certificates, setCertificates] = useState<{
    [websiteName: string]: Certificate[];
  }>({});
  const [error, setError] = useState<string | null>(null);

  const groupCertificatesByWebsite = (certificates: Certificate[]) => {
    const groupedCertificates: Record<string, Certificate[]> = {};
    certificates.forEach((certificate) => {
      const websiteName = certificate.website_name;
      if (!groupedCertificates[websiteName]) {
        groupedCertificates[websiteName] = [];
      }
      groupedCertificates[websiteName].push(certificate);
    });
    return groupedCertificates;
  };

  const handleRequest = async () => {
    if (!memberId || memberId.length < 10 || memberId.length > 10) {
      setError("Please provide a member ID.");
      return;
    }

    try {
      const response = await api.get(`/user/certificates/${memberId}`);

      if (
        response.data.certificates &&
        response.data.certificates.certificates.length > 0
      ) {
        const groupedCertificates = groupCertificatesByWebsite(
          response.data.certificates.certificates
        );
        // Check if the response contains certificates
        setCertificates(groupedCertificates);
        setError(null);
      } else {
        setError("No certificates found in the response.");
      }
    } catch (error) {
      console.error("Error sending certificate request:", error);
      setError("An error occurred while fetching certificates.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Request your certificates</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Member ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleRequest}
          className="bg-blue-500 text-white p-2 rounded-lg hover-bg-blue-600"
        >
          Request Certificates
        </button>
        {error && <div className="text-red-600 py-4">{error}</div>}
      </div>

      {Object.keys(certificates).map((websiteName) => (
        <div key={websiteName}>
          <h2 className="text-2xl font-bold mt-4">{websiteName}</h2>
          <CertificateTable certificates={certificates[websiteName]} />
        </div>
      ))}
    </div>
  );
};
