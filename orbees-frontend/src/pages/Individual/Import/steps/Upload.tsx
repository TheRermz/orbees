import { useRef, useState } from "react";
import { FolderOpen, FileText, Table2 } from "lucide-react";
import { Button } from "../../../../components/ui";
import {
  DropZone,
  DropTitle,
  DropSubtitle,
  FormatBadges,
  FormatBadge,
} from "../ImportPage.styles";
import type { UploadProps } from "./interface";

export const Upload = ({ loading, onFile }: UploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <>
      <DropZone
        $dragging={dragging}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FolderOpen size={48} color="#9ca3af" />
        <DropTitle>Arraste seu extrato aqui</DropTitle>
        <DropSubtitle>
          Suporta arquivos <strong>OFX</strong> e <strong>CSV</strong>{" "}
          exportados pelo seu banco
        </DropSubtitle>
        <Button
          loading={loading}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          Selecionar Arquivo
        </Button>
        <FormatBadges>
          <FormatBadge>
            <FileText size={14} /> OFX — Padrão bancário universal
          </FormatBadge>
          <FormatBadge>
            <Table2 size={14} /> CSV — Planilha de transações
          </FormatBadge>
        </FormatBadges>
      </DropZone>
      <input
        ref={fileInputRef}
        type="file"
        accept=".ofx,.csv"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </>
  );
};
