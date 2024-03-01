import { ModalType } from "@/enums";
import ModalButton from "../components/Modal/ModalComponents/ModalButton";

const ShoppingList = async () => {
  return (
    <>
      <ModalButton modalType={ModalType.CREATE_NEW_SHOPPING_LIST}>
        Create New Shopping List
      </ModalButton>
    </>
  );
};
export default ShoppingList;
