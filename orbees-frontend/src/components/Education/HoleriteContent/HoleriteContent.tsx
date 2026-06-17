import {
  HOLERITE_ROWS,
  LAW_REFERENCES,
} from "../../../pages/Education/Law/data";
import {
  BodyText,
  CardSource,
  Table,
  TableBody,
  TableHead,
  Td,
  TdDesc,
  Th,
  Tr,
} from "../../../pages/Education/Law/EducationLawPage.styles";
import { SourceLink } from "../Fundamentals/CalloutBox/CalloutBox.styles";

export const HoleriteContent = () => (
  <>
    <BodyText>
      O holerite discrimina sua remuneração e todos os descontos. Guarde-os —
      são documentos essenciais.
      <SourceLink
        href={LAW_REFERENCES[3].url}
        rel="noopener norefeerer"
        target="_blank"
      >
        CLT, Art. 464
      </SourceLink>
    </BodyText>
    <Table>
      <TableHead>
        <tr>
          <Th>Item</Th>
          <Th>O que é</Th>
        </tr>
      </TableHead>
      <TableBody>
        {HOLERITE_ROWS.map((row) => (
          <Tr key={row.item} $type={row.type}>
            <Td $type={row.type}>{row.item}</Td>
            <TdDesc>
              {row.description}
              {row.source && (
                <CardSource
                  href={row.sourceLink}
                  target="_blank"
                  rel="noopener norefeerer"
                >
                  {" "}
                  {row.source}
                </CardSource>
              )}
            </TdDesc>
          </Tr>
        ))}
      </TableBody>
    </Table>
  </>
);
