import { ModalType } from "@/enums";
import ModalButton from "../components/Modal/ModalComponents/ModalButton";
import ShoppingListCollapse from "../components/ShoppingListCollapse/ShoppingListCollapse";

const ShoppingList = async () => {
  const res = await fetch("http://localhost:3000/api/shoppingList", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  return (
    <>
      <ModalButton
        isDisabled={!data.data.isActiveOpen}
        modalType={ModalType.CREATE_NEW_SHOPPING_LIST}
      >
        Create New Shopping List
      </ModalButton>
      <div>
        {data &&
          data?.data.shoppingLists?.map((list: any, i: number) => (
            <ShoppingListCollapse key={i} list={list} />
          ))}
      </div>
    </>
  );
};
export default ShoppingList;
