import React from 'react';
import MarksList from '../components/MarkList';
import PerformanceByStream from '../components/PerformenceByStream';
import PerformanceBySubject from '../components/PerfomenceBySubject';
import StudentManagement from '../components/StudentManagement';
import SubjectManagement from '../components/SubjectManagement';
import ExamManagement from '../components/ExamManagement';
import LeaderBoard from '../components/LeaderBoard';
import TotalMarksLeaderBoard from '../components/TotalMarksLeaderBoard';

const TeacherDashBoard: React.FC = () => {
  const [activePage, setActivePage] = React.useState<string>('MarksList');

  const menuItems = [
    { id: 'MarksList', label: 'Marks List' },
    { id: 'StudentManagement', label: 'Student Management' },
    { id: 'PerformanceByStream', label: 'Performance by Stream' },
    { id: 'PerformanceBySubject', label: 'Performance by Subject' },
    { id: 'ExamManagement', label: 'Exam Management' },
    { id: 'SubjectManagement', label: 'Subject Management' },
    { id: 'LeaderBoard', label: 'LeaderBoard' },
    { id: 'TotalMarksLeaderBoard', label: 'TotalMarksLeaderBoard' },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'MarksList':
        return <MarksList />;
      case 'StudentManagement':
        return <StudentManagement />;
      case 'PerformanceByStream':
        return <PerformanceByStream />;
      case 'PerformanceBySubject':
        return <PerformanceBySubject />;
      case 'ExamManagement':
        return <ExamManagement />;
      case 'SubjectManagement':
        return <SubjectManagement />;
      case 'LeaderBoard':
        return <LeaderBoard />;
        case 'TotalMarksLeaderBoard':
        return <TotalMarksLeaderBoard />;
      default:
        return <MarksList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              role="button"
              className={`cursor-pointer p-2 rounded-lg ${
                activePage === item.id ? 'bg-blue-600' : 'hover:bg-blue-700'
              }`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">{renderPage()}</main>
    </div>
  );
};

export default TeacherDashBoard;