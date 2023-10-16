import React, { useState } from "react";
import api from "../api"; // Adjust the path as needed

interface Certificate {
  id: number;
  unique_number: string;
  created_at: string;
  course: {
    id: number;
    name: string;
    description: string;
    created_at: string;
  };
}

interface ErrorResponse {
  message: string;
}

export const Search: React.FC = () => {
  const [certificateData, setCertificateData] = useState<Certificate | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    api
      .get<{ certificate: Certificate }>(`/certificates/${searchValue}`)
      .then((response) => {
        if (response.data.certificate) {
          setCertificateData(response.data.certificate);
          setError(null);
        } else {
          setError(
            "Certificate not found. Please enter a valid certificate number."
          );
          setCertificateData(null);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const errorResponse = err.response.data as ErrorResponse;
          setError(errorResponse.message || "An error occurred.");
        } else {
          setError("An error occurred.");
        }
        setCertificateData(null);
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Certificate Search</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Certificate Number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
        {error ? (
          <p className="text-red-600 mt-4">{error}</p>
        ) : certificateData ? (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Certificate Details</h2>
            <p>Certificate ID: {certificateData.id}</p>
            <p>Unique Number: {certificateData.unique_number}</p>
            <p>Created At: {certificateData.created_at}</p>

            <h2 className="text-lg font-semibold mt-4 mb-2">Course Details</h2>
            <p>Course ID: {certificateData.course.id}</p>
            <p>Course Name: {certificateData.course.name}</p>
            <p>Course Description: {certificateData.course.description}</p>
            <p>Course Created At: {certificateData.course.created_at}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
