import ExportJsonButton from "@/app/components/Button/Variants/ExportJsonButton";
import ItemCheck from "@/app/components/ItemCheck/ItemCheck";
import JsonFileDataImport from "@/app/components/JsonFileDataImport/JsonFileDataImport";
import ModalButton from "@/app/components/Modal/ModalComponents/ModalButton";
import StatusUpdate from "@/app/components/StatusUpdate/StatusUpdate";
import { ModalType } from "@/enums";
import { headers } from "next/headers";
import styles from "../../global.module.scss";

const ShoppingItem = async ({ params }: any) => {
  const res = await fetch(
    "http://localhost:3000/api/shoppingList/" + params.id,
    {
      cache: "no-cache",
      method: "GET",
      headers: headers(),
    }
  );
  const data = await res.json();
  return (
    <div className={styles.row}>
      <div className={styles.col12}>
        <h1 className={`${styles.mt3} ${styles.mb4}`}>
          Shopping List - {data.data.name}
        </h1>

        <ModalButton modalType={ModalType.CREATE_NEW_ITEM}>
          Add new Item
        </ModalButton>
        <div className={`${styles.my3}`}>
          <JsonFileDataImport id={params.id} />
        </div>
        <ExportJsonButton id={params.id} />
        <h1>{data?.name}</h1>
        <StatusUpdate id={params.id} status={data.data.status} />
        <h2>List</h2>
        <div>
          {data &&
            data?.data.items?.map((item: any, i: number) => (
              <ItemCheck item={item} key={item.id} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ShoppingItem;
