import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageButton, PageInfo, Wrapper } from "./Pagination.styles";
import type { PaginationProps } from "./interface";

export const Pagination = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) => (
  <Wrapper>
    <PageButton
      $disabled={currentPage <= 1}
      onClick={onPrev}
      disabled={currentPage <= 1}
    >
      <ChevronLeft size={16} />
    </PageButton>
    <PageInfo>
      Página {currentPage} de {totalPages}
    </PageInfo>
    <PageButton
      $disabled={currentPage >= totalPages}
      onClick={onNext}
      disabled={currentPage >= totalPages}
    >
      <ChevronRight size={16} />
    </PageButton>
  </Wrapper>
);
