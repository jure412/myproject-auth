"use client";
import { createShoppingListItemCompleted } from "@/app/ServerActions/shoppingList.actions";
import { Item, Role } from "@prisma/client";
import { FC, useState } from "react";
import styles from "../../global.module.scss";
import Loading from "../Loading/Loading";
import style from "./ItemCheck.module.scss";

interface StatusUpdateProps {
  item: Item;
}

const ItemCheck: FC<StatusUpdateProps> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", item.id.toString());
    formData.append(
      "status",
      item.status === Role.ACTIVE ? Role.COMPLETED : Role.ACTIVE
    );
    await createShoppingListItemCompleted(formData);
    setIsLoading(false);
  };

  return (
    <div className={`${styles.col12} ${style.ItemCheck}`}>
      <span
        className={`${styles.row} ${style.banner}`}
        onClick={handleCheckboxChange}
      >
        <p className={styles.pXLarge}>{item.name}</p>
        {isLoading ? (
          <Loading />
        ) : (
          <input
            type="checkbox"
            readOnly
            checked={item.status !== Role.ACTIVE} // Bind checked state to the checkbox
          />
        )}
      </span>
    </div>
  );
};

export default ItemCheck;
