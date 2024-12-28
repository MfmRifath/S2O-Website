import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManageExamPapersForm from '../components/ManageExamPaperForm';
import ExamPaperList from '../../S2OAcadmyPage/components/S2O Library/ExamPaperList';

interface ExamPaper {
  id: number;
  title: string;
  year: string;
}

const ManageExamPapersPage: React.FC = () => {
  const [examPapers, setExamPapers] = useState<ExamPaper[]>([]);
  const [editingExamPaper, setEditingExamPaper] = useState<ExamPaper | null>(null);

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

  const handleFormSubmit = async (formData: FormData, isEdit: boolean) => {
    try {
      const endpoint = isEdit
        ? `http://localhost:8080/api/examPaper/edit/examPaper/${editingExamPaper?.id}`
        : 'http://localhost:8080/api/examPaper/add/examPaper';

      const method = isEdit ? axios.put : axios.post;
      await method(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setEditingExamPaper(null);
      fetchExamPapers();
    } catch (err) {
      console.error('Failed to save the exam paper:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this exam paper?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/examPaper/delete/examPaper/${id}`);
      fetchExamPapers();
    } catch (err) {
      console.error('Failed to delete the exam paper:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Manage Exam Papers</h1>
        <ManageExamPapersForm
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingExamPaper(null)}
          initialData={editingExamPaper || undefined}
        />
        <ExamPaperList
          examPapers={examPapers}
          onEdit={(examPaper) => setEditingExamPaper({
            id: examPaper.id,
            title: examPaper.title,
            year: examPaper.year
          })}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ManageExamPapersPage;