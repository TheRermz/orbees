import { HOLERITE_ROWS } from "../../../pages/Education/Law/data";
import {
  BodyText,
  InlineSource,
  SourceBadge,
  Table,
  TableBody,
  TableHead,
  Td,
  TdDesc,
  Th,
  Tr,
} from "../../../pages/Education/Law/EducationLawPage.styles";

export const HoleriteContent = () => (
  <>
    <BodyText>
      O holerite discrimina sua remuneração e todos os descontos. Guarde-os —
      são documentos essenciais.
      <InlineSource>CLT, Art. 464</InlineSource>
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
              {row.source && <SourceBadge> {row.source}</SourceBadge>}
            </TdDesc>
          </Tr>
        ))}
      </TableBody>
    </Table>
  </>
);
