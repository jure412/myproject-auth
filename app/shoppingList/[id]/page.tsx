import ItemCheck from "@/app/components/ItemCheck/ItemCheck";
import ModalButton from "@/app/components/Modal/ModalComponents/ModalButton";
import StatusUpdate from "@/app/components/StatusUpdate/StatusUpdate";
import { ModalType } from "@/enums";

const ShoppingItem = async ({ params }: any) => {
  // console.log(params.id);
  const res = await fetch(
    "http://localhost:3000/api/shoppingList/" + params.id,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return (
    <>
      <ModalButton modalType={ModalType.CREATE_NEW_ITEM}>
        Add new Item
      </ModalButton>
      <h1>{data?.name}</h1>
      <StatusUpdate id={params.id} status={data.data.status} />
      <h2>List</h2>
      <div>
        {data &&
          data?.data.items?.map((item: any, i: number) => (
            <ItemCheck item={item} key={item.id} />
          ))}
      </div>
    </>
  );
};
export default ShoppingItem;
