import { Term } from "../layouts/Teacher/Service/interfaces";

class YearModal {
  yearId: number;
  yearValue: number;
  term: Term;

  constructor(yearId: number, yearValue: number, term: Term) {
    this.yearId = yearId;
    this.yearValue = yearValue;
    this.term = term;
  }
}

export default YearModal;
