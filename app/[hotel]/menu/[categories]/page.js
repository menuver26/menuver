import CategorypageUI from "@/components/categorypage";
import categoryExist from "@/utils/categoryexsist";

export default async function CategoryPage({ params }) {
  const { categories ,hotel } = await params;
  console.log(await params);
  const menuItems = await categoryExist(categories,hotel);

  return ( <CategorypageUI catg={menuItems} />);
}
