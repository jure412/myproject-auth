import { ModalType } from "@/enums";
import { headers } from "next/headers";
import ModalButton from "../components/Modal/ModalComponents/ModalButton";
import ShoppingListCollapse, {
  List,
} from "../components/ShoppingListCollapse/ShoppingListCollapse";
import styles from "../global.module.scss";

const ShoppingList = async () => {
  const res = await fetch("http://localhost:3000/api/shoppingList", {
    cache: "no-cache",
    method: "GET",
    // I'm not sure way of passing the header would work in production.
    headers: headers(),
  });
  const data = await res.json();

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <h1 className={styles.mt3}>Shopping Lists</h1>
        <div className={styles.my2}>
          {!data?.data?.isActiveOpen && (
            <p>
              Before Creating new Shopping list, all Shopping lists need to be
              marked as COMPLETED
            </p>
          )}
          <ModalButton
            isDisabled={!data?.data?.isActiveOpen}
            modalType={ModalType.CREATE_NEW_SHOPPING_LIST}
          >
            Create New Shopping List
          </ModalButton>
        </div>
        <div>
          {data &&
            data?.data.shoppingLists?.map((list: List, i: number) => (
              <ShoppingListCollapse key={i} list={list} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ShoppingList;
