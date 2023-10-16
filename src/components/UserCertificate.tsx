import React, { useState } from "react";
import api from "../api";
import { CertificateTable } from "./CertificateTable";

interface CertificateResponse {
  certificate: Array<{
    unique_number: string;
    course: {
      name: string;
      description: string;
    };
  }>;
}

export const UserCertificate: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<CertificateResponse | null>(null);

  const handleRequest = async () => {
    if (!email || !password) {
      alert("Please provide both email and password."); // Basic validation
      return;
    }

    try {
      const requestData = {
        email: email,
        password: password,
      };

      const response = await api.post("/get-certificates", requestData);

      if (response.data.certificate) {
        // Check if the response contains certificates
        setResponse(response.data);
      } else {
        alert("No certificates found in the response.");
      }
    } catch (error) {
      console.error("Error sending certificate request:", error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          Request your data from EaseLearn website
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleRequest}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Request Certificates
        </button>
      </div>

      {response && response.certificate && response.certificate.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Certificates</h2>
          <CertificateTable certificates={response.certificate} />
        </div>
      )}
    </div>
  );
};
