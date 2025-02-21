import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Card, Table, Spinner, Alert, Container, Badge } from 'react-bootstrap';

interface LeaderBoardDTO {
  studentId: number;
  studentName: string;
  totalMarks: number;
  zscore: number; // changed from zScore to zscore to match JSON
  rank: number;
}

interface LeaderBoardData {
  [year: string]: {
    [exam: string]: LeaderBoardDTO[];
  };
}

const TotalMarksLeaderBoard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderBoardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderBoardData>('http://localhost:8080/api/marks/leaderboard/total-marks-zscore');
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
      <h1 className="mb-4 text-center">Total Marks Leaderboard (Z-Score Based)</h1>
      {leaderboard &&
        Object.keys(leaderboard).map((year) => (
          <Card key={year} className="mb-4 shadow-sm border-primary">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">{year}</h2>
            </Card.Header>
            <Card.Body>
              {Object.keys(leaderboard[year]).map((exam) => (
                <Accordion key={exam} className="mb-3">
                  <Accordion.Item eventKey={exam}>
                    <Accordion.Header>
                      Exam: {exam} <Badge bg="secondary" className="ms-2">View Details</Badge>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table responsive striped bordered hover>
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Total Marks</th>
                            <th>Z-Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard[year][exam].map((entry) => (
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
                              <td>{entry.rank === 1 ? <i className="bi bi-trophy-fill text-warning"></i> : entry.rank}</td>
                              <td>{entry.studentId}</td>
                              <td>{entry.studentName}</td>
                              <td>{entry.totalMarks}</td>
                              <td>{typeof entry.zscore === 'number' ? entry.zscore.toFixed(2) : "N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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

export default TotalMarksLeaderBoard;