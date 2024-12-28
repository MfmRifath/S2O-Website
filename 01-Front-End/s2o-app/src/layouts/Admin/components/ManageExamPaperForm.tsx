import React, { useState } from 'react';

interface ExamPaper {
  id?: number;
  title: string;
  year: string;
}

interface ManageExamPapersFormProps {
  onSubmit: (formData: FormData, isEdit: boolean) => void;
  onCancel?: () => void;
  initialData?: ExamPaper;
}

const ManageExamPapersForm: React.FC<ManageExamPapersFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile && !initialData) {
      alert('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'examPaper',
      JSON.stringify({ title, year })
    );
    if (selectedFile) formData.append('file', selectedFile);

    onSubmit(formData, !!initialData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">{initialData ? 'Edit Exam Paper' : 'Add New Exam Paper'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Year</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">PDF File</label>
        <input type="file" onChange={handleFileChange} className="w-full" />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {initialData ? 'Update Exam Paper' : 'Add Exam Paper'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ManageExamPapersForm;