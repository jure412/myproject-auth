"use client";

import { Role } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import styles from "../../global.module.scss";
import Link from "../Link/Link";
import Loading from "../Loading/Loading";
import StatusUpdate from "../StatusUpdate/StatusUpdate";

export type List = {
  id: string;
  name: string;
  status: Role;
  _count: { items: number };
};
export interface ShoppingListCollapseProps {
  list: List;
}

const ShoppingListCollapse: FC<ShoppingListCollapseProps> = ({ list }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    if (list._count.items !== 0 && list.status === Role.COMPLETED) {
      setOpen(!open);
    }
  };

  return (
    <div
      className={`${styles.col12} ${styles.action_box} ${
        open && styles.action_box_open
      }`}
      onClick={handleOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p className={`${styles.pXLarge} ${styles.mrAuto}`}>{list.name}</p>
        <StatusUpdate id={Number(list.id)} status={list.status} />
        <p className={`${styles.pXLarge} ${styles.ml2}`}>
          {list.status === Role.ACTIVE ? (
            <Link href={`shoppingList/${list.id}`}>EDIT</Link>
          ) : (
            <span className={`${styles.cInfo}`}>VIEW</span>
          )}
        </p>
      </div>
      <ShoppingListCollapsePart open={open} list={list} />
    </div>
  );
};

export default ShoppingListCollapse;

const ShoppingListCollapsePart = ({
  open,
  list,
}: {
  open: boolean;
  list: List;
}) => {
  const [data, setData] = useState<List[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/items?id=${list.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setData(responseData.data);
      setLoading(false);
    };

    if (open) {
      fetchData();
    }
  }, [open, list.id]);

  return (
    <div style={{ display: open ? "block" : "none" }}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.row}>
          {data?.map((item: List, i: number) => (
            <div className={`${styles.col12} ${styles.px3}`} key={i}>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
