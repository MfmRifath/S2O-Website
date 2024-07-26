import { useEffect, useState } from "react";
import StudentModal from "../../../Model/StudentModal";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import './Table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const StudentTable = () => {
  const [students, setStudents] = useState<StudentModal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [biologySearch, setBiologySearch] = useState('');
  const [mathSearch, setMathSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setHttpError(null);
      const baseUrl: string = `http://localhost:8080/api/students/list`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();
        console.log('Response JSON:', responseJson);

        const loadedStudents: StudentModal[] = responseJson.map((student: any) => ({
          studentId: student.studentId,
          studentName: student.studentName,
          studentType: student.studentType
        }));

        setStudents(loadedStudents);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const biologyStudents = students.filter(student => student.studentType?.typeName === 'Biology');
  const combinedMathStudents = students.filter(student => student.studentType?.typeName === 'Combined Maths');

  const filteredBiologyStudents = biologyStudents.filter(student => student.studentName.toLowerCase().includes(biologySearch.toLowerCase()));
  const filteredMathStudents = combinedMathStudents.filter(student => student.studentName.toLowerCase().includes(mathSearch.toLowerCase()));

  return (
    <div className="container mt-5 mb-5">
      <div>
        <h1 className="table-heading">Biology Students</h1>
        <div className="search-container mb-3">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={biologySearch}
            onChange={(e) => setBiologySearch(e.target.value)}
          />
        <a href="#" className="search-btn"></a>
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
              <th>Student Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredBiologyStudents.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.studentType?.typeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div >
        <h1 className="table-heading">Combined Math Students</h1>
        <div className="search-container mb-3">
          
          <input
            type="text"
            className="search-input"
            placeholder="Search By Name"
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={mathSearch}
            onChange={(e) => setMathSearch(e.target.value)}
          />
        <a href="#" className="search-btn"></a>
        <i className="fas fa-search"></i>  
        </div>
      </div>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
              <th>Student Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredMathStudents.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.studentType?.typeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
