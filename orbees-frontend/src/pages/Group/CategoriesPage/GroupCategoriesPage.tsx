import { useParams } from "react-router-dom";
import { CategoriesPage } from "../../Individual/CategoriesPage/CategoriesPage";

export const GroupCategoriesPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  return <CategoriesPage groupId={groupId} />;
};
