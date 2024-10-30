// src/components/AnalysisPanel.tsx
import React from "react";
import { StudentMark, Subject } from "../Service/interfaces";

interface AnalysisPanelProps {
  marks: StudentMark[];
  subjects: Subject[];
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ marks, subjects }) => {
  return (
    <div className="analysis-panel">
      <h2>Marks Analysis</h2>
      <p>Here you can visualize student marks and performance.</p>
      {/* Render charts or summaries */}
    </div>
  );
};

export default AnalysisPanel;
