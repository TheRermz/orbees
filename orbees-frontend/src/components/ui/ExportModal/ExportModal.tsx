import { useState } from "react";
import { Modal, Button } from "../index";
import { ExportFormat } from "../../../interfaces/enums";
import { FORMAT_OPTIONS, type ExportModalProps } from "./interface";
import {
  OptionsList,
  OptionCard,
  OptionDot,
  OptionInfo,
  OptionLabel,
  OptionDescription,
  OptionExtension,
} from "./ExportModal.styles";

export const ExportModal = ({ loading, onClose, onExport }: ExportModalProps) => {
  const [selected, setSelected] = useState<ExportFormat>(ExportFormat.PDF);

  return (
    <Modal
      title="Exportar Transações"
      description="Selecione o formato do arquivo"
      onClose={onClose}
      actions={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button loading={loading} onClick={() => onExport(selected)}>
            Exportar
          </Button>
        </>
      }
    >
      <OptionsList>
        {FORMAT_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.format}
            $selected={selected === opt.format}
            onClick={() => setSelected(opt.format)}
            disabled={loading}
          >
            <OptionDot $selected={selected === opt.format} />
            <OptionInfo>
              <OptionLabel>{opt.label}</OptionLabel>
              <OptionDescription>{opt.description}</OptionDescription>
            </OptionInfo>
            <OptionExtension>{opt.extension}</OptionExtension>
          </OptionCard>
        ))}
      </OptionsList>
    </Modal>
  );
};
