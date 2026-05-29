import { Body, Box, SourceLink, Title } from "./CalloutBox.styles";
import type { CalloutBoxProps } from "./interface";

export const CalloutBox = ({
  title,
  segments,
  source,
  sourceUrl,
}: CalloutBoxProps) => {
  return (
    <Box>
      <Title>{title}</Title>
      <Body>
        {segments.map((seg, i) =>
          seg.bold ? (
            <strong key={i}>{seg.text}</strong>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </Body>
      <SourceLink href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {source}
      </SourceLink>
    </Box>
  );
};
