interface Certificate {
  id?: number;
  unique_number: string;
  course: {
    name: string;
    description: string;
  };
}

interface CertificateTableProps {
  certificates: Certificate[];
}

export const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
}) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Unique Number</th>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate, index) => (
            <tr key={index} className="border-t text-center">
              <td className="px-4 py-2">{certificate.unique_number}</td>
              <td className="px-4 py-2">{certificate.course.name}</td>
              <td className="px-4 py-2">{certificate.course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
