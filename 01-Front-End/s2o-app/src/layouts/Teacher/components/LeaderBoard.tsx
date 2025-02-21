// LeaderBoardSubjectYear.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Card, Table, Spinner, Alert, Container, Badge } from 'react-bootstrap';

interface LeaderBoardDTO {
  studentId: number;
  studentName: string;
  totalMarks: number;
  rank: number;
}

interface LeaderBoardData {
  [year: string]: {
    [subject: string]: {
      [exam: string]: LeaderBoardDTO[] | { [key: string]: LeaderBoardDTO };
    };
  };
}

const LeaderBoardSubjectYear: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderBoardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Replace with your actual backend endpoint URL
        const response = await axios.get<LeaderBoardData>('http://localhost:8080/api/marks/leaderboard/subject-year');
        setLeaderboard(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading Leaderboard...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Year → Subject → Exam Leaderboard</h1>
      {leaderboard &&
        Object.keys(leaderboard).map((year) => (
          <Card key={year} className="mb-4 shadow-sm border-success">
            <Card.Header className="bg-success text-white">
              <h2 className="mb-0">{year}</h2>
            </Card.Header>
            <Card.Body>
              {Object.keys(leaderboard[year]).map((subject) => (
                <Accordion key={subject} className="mb-3">
                  <Accordion.Item eventKey={subject}>
                    <Accordion.Header>
                      Exam: {subject} <Badge bg="secondary" className="ms-2">View Details</Badge>
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(leaderboard[year][subject]).map((exam) => {
                        // Get the exam data. If it's not an array, convert it to an array.
                        const examData = leaderboard[year][subject][exam];
                        const examEntries: LeaderBoardDTO[] = Array.isArray(examData)
                          ? examData
                          : Object.values(examData);
                        return (
                          <div key={exam} className="mb-4">
                            <h4 className="mb-3">Subject: {exam}</h4>
                            <Table responsive striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Rank</th>
                                  <th>Student ID</th>
                                  <th>Student Name</th>
                                  <th>Total Marks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {examEntries.map((entry) => (
                                  <tr
                                    key={entry.studentId}
                                    className={
                                      entry.rank === 1
                                        ? 'table-warning'
                                        : entry.rank === 2
                                        ? 'table-secondary'
                                        : entry.rank === 3
                                        ? 'table-info'
                                        : ''
                                    }
                                  >
                                    <td>
                                      {entry.rank === 1 ? <i className="bi bi-trophy-fill text-warning"></i> : entry.rank}
                                    </td>
                                    <td>{entry.studentId}</td>
                                    <td>{entry.studentName}</td>
                                    <td>{entry.totalMarks}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default LeaderBoardSubjectYear;