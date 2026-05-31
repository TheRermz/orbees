import { LAW_CALLOUT } from "../../../pages/Education/Law/data";
import { Box, Title } from "./LawCalloutBox.styles";

export const LawCalloutBox = () => {
  const { title, body, inlineSource, suffix } = LAW_CALLOUT;

  return (
    <Box>
      <Title>{title}</Title>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#1a1a1a",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {body.map((seg, i) =>
          seg.bold ? (
            <strong key={i}>{seg.text}</strong>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
        <sup style={{ fontSize: "0.6rem", color: "#b45309", marginLeft: 4 }}>
          {inlineSource}
        </sup>
        {suffix}
      </p>
    </Box>
  );
};
