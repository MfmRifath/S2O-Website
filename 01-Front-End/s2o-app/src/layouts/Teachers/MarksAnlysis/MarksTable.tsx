import { useEffect, useState } from "react";
import StudentMarkModal from "../../../Model/StudentMarkModal";
import YearModal from "../../../Model/YearModal";
import TermModal from "../../../Model/TermModal";
import '../StudentMangement/Table.css';

export const MarksTable = () => {
  const [marks, setMarks] = useState<StudentMarkModal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [years, setYears] = useState<YearModal[]>([]);
  const [terms, setTerms] = useState<TermModal[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedTerm, setSelectedTerm] = useState<string>("All");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchStudentMarks = async () => {
      setIsLoading(true);
      setHttpError(null);

      const baseUrl: string = `http://localhost:8080/api/student-marks`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedStudentMarks: StudentMarkModal[] = responseJson.map((studentMark: any) => ({
          markId: studentMark.markId,
          mark: studentMark.mark,
          student: studentMark.student,
          subject: studentMark.subject,
          term: studentMark.term,
          year: studentMark.year
        }));

        setMarks(loadedStudentMarks);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudentMarks();
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      setIsLoading(true);
      setHttpError(null);

      const baseUrl: string = `http://localhost:8080/api/years`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedYears: YearModal[] = responseJson.map((year: any) => ({
          yearId: year.yearId,
          yearValue: year.yearValue
        }));

        setYears(loadedYears);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    const fetchTerms = async () => {
      setIsLoading(true);
      setHttpError(null);

      const baseUrl: string = `http://localhost:8080/api/terms`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedTerms: TermModal[] = responseJson.map((term: any) => ({
          termId: term.termId,
          termName: term.termName,
        }));

        setTerms(loadedTerms);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTerms();
  }, []);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTerm(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredMarks = marks.filter((mark) => {
    const yearMatches = selectedYear === "All" || mark.year.yearValue.toString() === selectedYear;
    const termMatches = selectedTerm === "All" || mark.term.termName === selectedTerm;
    const subjectMatches = selectedSubject === "All" || mark.subject.subjectName === selectedSubject;
    const studentMatches = mark.student.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatches && termMatches && subjectMatches && studentMatches;
  });

  return (
    <div className="container mt-5 mb-5">
      <div className="align-items-center mb-3">
        <h1 className="table-heading">Student Marks</h1>
        <div className="form-group">
          <div>
            <label htmlFor="year" className="">Filter by Year:</label>
            <select
              id="year"
              className="form-control"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="All">All</option>
              {years.map((year) => (
                <option key={year.yearValue} value={year.yearValue}>{year.yearValue}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="term" className="">Filter by Term:</label>
            <select
              id="term"
              className="form-control"
              value={selectedTerm}
              onChange={handleTermChange}
            >
              <option value="All">All</option>
              {terms.map((term) => (
                <option key={term.termId} value={term.termName}>{term.termName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="">Filter by Subject:</label>
            <select
              id="subject"
              className="form-control"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="All">All</option>
              {marks.reduce((acc: string[], mark) => {
                if (!acc.includes(mark.subject.subjectName)) {
                  acc.push(mark.subject.subjectName);
                }
                return acc;
              }, []).map((subjectName) => (
                <option key={subjectName} value={subjectName}>{subjectName}</option>
              ))}
            </select>
          </div>
          <div className="search-container mt-4">
            <input
              id="search"
              type="text"
              placeholder="Search by Student Name:"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <a href="#" className="search-btn"></a>
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="fl-table table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Mark Id</th>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Term</th>
              <th>Marks</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarks.map((mark) => (
              <tr key={mark.markId}>
                <td>{mark.markId}</td>
                <td>{mark.student.studentName}</td>
                <td>{mark.subject.subjectName}</td>
                <td>{mark.term.termName}</td>
                <td>{mark.mark}</td>
                <td>{mark.year.yearValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <p>Loading...</p>}
      {httpError && <p>{httpError}</p>}
    </div>
  );
};
