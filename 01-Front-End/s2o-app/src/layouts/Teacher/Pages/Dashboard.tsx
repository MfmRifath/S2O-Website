import React from 'react';
import MarksList from '../components/MarkList';
import PerformanceByStream from '../components/PerformenceByStream';
import PerformanceBySubject from '../components/PerfomenceBySubject';
import StudentManagement from '../components/StudentManagement';
import SubjectManagement from '../components/SubjectManagement';
import ExamManagement from '../components/ExamManagement';

const TeacherDashBoard: React.FC = () => {
  const [activePage, setActivePage] = React.useState<string>('MarksList');

  const renderPage = () => {
    switch (activePage) {
      case 'MarksList':
        return <MarksList />;
      case 'PerformanceByStream':
        return <PerformanceByStream />;
      case 'PerformanceBySubject':
        return <PerformanceBySubject />;
      case 'StudentManagement':
        return <StudentManagement />;
      case 'SubjectManagement':
        return <SubjectManagement />;
      case 'ExamManagement':
        return <ExamManagement />;
      default:
        return <MarksList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === 'MarksList' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActivePage('MarksList')}
          >
            Marks List
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === 'PerformanceByStream' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActivePage('PerformanceByStream')}
          >
            Performance by Stream
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === 'PerformanceBySubject' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActivePage('PerformanceBySubject')}
          >
            Performance by Subject
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === 'ExamManagement' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActivePage('ExamManagement')}
          >
            Exam Management
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === 'PerformanceByStream' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActivePage('PerformanceByStream')}
          >
            Performance by Stream
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === 'SubjectManagement' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActivePage('SubjectManagement')}
          >
            Subject Management
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">{renderPage()}</main>
    </div>
  );
};

export default TeacherDashBoard;