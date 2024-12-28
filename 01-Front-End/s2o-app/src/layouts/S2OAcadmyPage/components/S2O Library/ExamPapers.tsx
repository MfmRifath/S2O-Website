import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamPaperList from './ExamPaperList';

interface ExamPaper {
  id: number;
  title: string;
  description: string;
  year: string;
}

const ExamPapersPage: React.FC = () => {
  const [examPapers, setExamPapers] = useState<ExamPaper[]>([]);

  useEffect(() => {
    fetchExamPapers();
  }, []);

  const fetchExamPapers = async () => {
    try {
      const response = await axios.get<ExamPaper[]>('http://localhost:8080/api/examPaper/all');
      setExamPapers(response.data);
    } catch (err: any) {
      console.error('Failed to fetch exam papers:', err);
    }
  };

  const handleDownload = async (id: number, title: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/examPaper/download/examPaper/${id}/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Failed to download the exam paper:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <ExamPaperList examPapers={examPapers} onDownload={handleDownload} />
      </div>
    </div>
  );
};

export default ExamPapersPage;