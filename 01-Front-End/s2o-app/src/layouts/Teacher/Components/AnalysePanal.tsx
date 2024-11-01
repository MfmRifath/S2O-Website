import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { StudentMark } from "../Service/interfaces";
import { getAllStudentMarks } from "../Service/api";

const AnalyticsReports: React.FC = () => {
  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([]);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    const response = await getAllStudentMarks();
    if (response) setStudentMarks(response.data);
  };

  const data = {
    labels: studentMarks.map(
      (mark) => mark.subject?.subjectName || "Unknown Subject"
    ),
    datasets: [
      {
        label: "Student Marks",
        data: studentMarks.map((mark) => mark.mark),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      <h2>Analytics & Reports</h2>
      <div>
        <h3>Marks Distribution</h3>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsReports;
