import { RULE_502030 } from "../../../../pages/Education/Fundamentals/data";
import {
  Wrapper,
  TitleRow,
  RuleTitle,
  SubtitleSource,
  Subtitle,
  Source,
  ProgressBar,
  ProgressSegment,
  LegendRow,
  LegendItem,
  LegendDot,
  LegendText,
  LegendLabel,
  LegendDetail,
  Footnote,
} from "./Rule502030.styles";

export const Rule502030 = () => {
  const { title, subtitle, source, sourceUrl, segments, footnote } =
    RULE_502030;

  return (
    <Wrapper>
      <TitleRow>
        <RuleTitle>{title}</RuleTitle>
        <SubtitleSource>
          <Subtitle>{subtitle}</Subtitle>
          <Source href={sourceUrl} target="_blank" rel="noopener noreferrer">
            {source}
          </Source>
        </SubtitleSource>
      </TitleRow>

      <ProgressBar>
        {segments.map((seg) => (
          <ProgressSegment
            key={seg.label}
            $color={seg.color}
            $value={seg.value}
          >
            {seg.label}
          </ProgressSegment>
        ))}
      </ProgressBar>

      <LegendRow>
        {segments.map((seg) => (
          <LegendItem key={seg.label}>
            <LegendDot $color={seg.color} />
            <LegendText>
              <LegendLabel>
                {seg.label} — {seg.description}
              </LegendLabel>
              <LegendDetail>{seg.detail}</LegendDetail>
            </LegendText>
          </LegendItem>
        ))}
      </LegendRow>

      <Footnote>{footnote}</Footnote>
    </Wrapper>
  );
};
