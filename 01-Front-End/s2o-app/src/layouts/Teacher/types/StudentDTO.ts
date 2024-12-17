import { MarkDTO } from "./MarkDTOs";

export interface StudentDTO {
  id: number;
  name: string;
  stream: string;
  year: string;
  marks: MarkDTO[]; // Marks is an array of MarkDTO
}