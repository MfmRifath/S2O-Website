import React from 'react';

interface StudentDTO {
  id: number;
  name: string;
  stream: string;
  year: string;
  nic: string;
}

interface SubjectDTO {
  id: number;
  name: string;
  stream: string;
}

interface ExamDTO {
  id: number;
  name: string;
  date: string;
}

export interface MarkDTO {
  id: number;
  studentDTO: StudentDTO;
  subjectDTO: SubjectDTO;
  examDTO: ExamDTO;
  marks: number;
  maxMarks: number;
  rank?: number;
  zScore?: number;
}

interface ResultSheetProps {
  results: MarkDTO[];
}

export const ResultSheet: React.FC<ResultSheetProps> = ({ results }) => {
  if (results.length === 0) {
    return <p className="text-center text-gray-500">No results available.</p>;
  }

  // Assume all entries belong to the same student and exam.
  const { studentDTO, examDTO, rank, zScore } = results[0];
  const totalObtained = results.reduce((sum, mark) => sum + mark.marks, 0);
  const totalMax = results.reduce((sum, mark) => sum + mark.maxMarks, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="result-sheet"
      className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden my-8 transition-transform transform hover:scale-105"
    >
      {/* Header */}
      <div className="bg-blue-700 px-8 py-4">
        <h2 className="text-4xl text-white font-extrabold text-center">
          {examDTO.name} Results
        </h2>
      </div>
      {/* Student Information */}
      <div className="px-8 py-4 border-b border-gray-300">
        <p className="text-xl">
          <span className="font-bold text-gray-700">Student:</span> {studentDTO.name}{' '}
          <span className="text-gray-600">({studentDTO.nic})</span>
        </p>
        <p className="text-xl">
          <span className="font-bold text-gray-700">Stream:</span> {studentDTO.stream}{' '}
          <span className="font-bold text-gray-700 ml-4">Year:</span> {studentDTO.year}
        </p>
      </div>
      {/* Marks Table */}
      <div className="p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Marks Obtained
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Maximum Marks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((mark) => (
                <tr key={mark.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{mark.subjectDTO.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{mark.marks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{mark.maxMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Totals, Rank and Z-Score */}
        <div className="mt-6 flex flex-col md:flex-row md:justify-end md:space-x-8">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">
              Total: {totalObtained} / {totalMax}
            </p>
          </div>
          {rank !== undefined && (
            <div className="text-right mt-4 md:mt-0">
              <p className="text-2xl font-bold text-gray-800">Rank: {rank}</p>
            </div>
          )}
          {zScore !== undefined && (
            <div className="text-right mt-4 md:mt-0">
              <p className="text-2xl font-bold text-gray-800">
                Z-Score: {zScore.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Footer with Print Button */}
      <div className="px-8 py-4 bg-gray-100 text-right">
        <button
          onClick={handlePrint}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Print Result
        </button>
      </div>
    </div>
  );
};