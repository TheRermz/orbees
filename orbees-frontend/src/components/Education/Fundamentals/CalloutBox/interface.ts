import type { TextSegment } from "../../../../pages/Education/Fundamentals/data";

export interface CalloutBoxProps {
  title: string;
  segments: TextSegment[];
  source: string;
  sourceUrl: string;
}
