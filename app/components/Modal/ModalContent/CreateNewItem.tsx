"use client";
import { createShoppingListItem } from "@/app/ServerActions/shoppingList.actions";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "../../../global.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

const CreateNewItem = () => {
  const { data: session } = useSession();
  const params = useParams();
  const param_id = params.id;
  const { data } = useSession();
  const [name, setName] = useState(data?.user.name);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (_: string, value: string) => {
    setName(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("shoppingListId", param_id.toString());
      formData.append("userId", session?.user.id);
      await createShoppingListItem(formData);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.row}>
      <div className={styles.col12}>
        <h1>Create new item</h1>
      </div>
      <div className={styles.col12}>
        <Input
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.col12}>
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateNewItem;
