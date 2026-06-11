import { COMPOUND_INTEREST } from "../../../../pages/Education/Fundamentals/data";
import {
  Wrapper,
  WrapperTitle,
  CardsRow,
  SubCard,
  SubCardTitle,
  Line,
  FootnoteRow,
  FootnoteText,
  FootnoteSource,
  FootnoteSourceUrl,
} from "./CompoundInterest.styles";

export const CompoundInterest = () => {
  const { title, ally, enemy } = COMPOUND_INTEREST;

  return (
    <Wrapper>
      <WrapperTitle>{title}</WrapperTitle>
      <CardsRow>
        <SubCard $accent={ally.accentColor}>
          <SubCardTitle $color={ally.accentColor}>{ally.title}</SubCardTitle>
          <Line>
            {ally.lines[0].text}
            <strong>{ally.lines[0].suffix}</strong>
          </Line>
          <Line>
            <em>{ally.lines[1].text}</em>
          </Line>
          <FootnoteRow>
            <FootnoteText $color={ally.accentColor}>
              {ally.footnote}
            </FootnoteText>
            <FootnoteSource>{ally.footnoteSource}</FootnoteSource>
          </FootnoteRow>
        </SubCard>

        <SubCard $accent={enemy.accentColor}>
          <SubCardTitle $color={enemy.accentColor}>{enemy.title}</SubCardTitle>
          <Line>
            {enemy.lines[0].text}
            <strong>{enemy.lines[0].bold}</strong>
            {enemy.lines[0].suffix}
            <strong>{enemy.lines[0].end}</strong>
          </Line>
          <Line>
            <em>{enemy.lines[1].text}</em>
          </Line>
          <FootnoteRow>
            {enemy.FootnoteSourceUrl ? (
              <FootnoteSourceUrl
                href={enemy.FootnoteSourceUrl}
                target="blank"
                rel="noopener norefeerer"
              >
                {enemy.footnoteSource}
              </FootnoteSourceUrl>
            ) : (
              <FootnoteSource>{enemy.footnoteSource}</FootnoteSource>
            )}
          </FootnoteRow>
        </SubCard>
      </CardsRow>
    </Wrapper>
  );
};
