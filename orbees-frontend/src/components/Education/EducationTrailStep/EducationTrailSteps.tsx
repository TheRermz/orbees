import { useNavigate } from "react-router-dom";
import {
  StepRow,
  NumberBadge,
  StepInfo,
  StepTitle,
  StepDescription,
  Arrow,
} from "./EducationTrailSteps.styles";
import type { EducationTrailStepProps } from "../interface";

export const EducationTrailStep = ({ step }: EducationTrailStepProps) => {
  const navigate = useNavigate();

  return (
    <StepRow onClick={() => navigate(step.path)}>
      <NumberBadge $color={step.color}>{step.number}</NumberBadge>
      <StepInfo>
        <StepTitle>{step.title}</StepTitle>
        <StepDescription>{step.description}</StepDescription>
      </StepInfo>
      <Arrow className="trail-arrow">Acessar →</Arrow>
    </StepRow>
  );
};
