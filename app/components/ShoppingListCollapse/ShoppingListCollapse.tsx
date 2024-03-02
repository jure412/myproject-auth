"use client";

import { Role } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import styles from "../../global.module.scss";
import Link from "../Link/Link";
import Loading from "../Loading/Loading";
import style from "./ShoppingListCollapse.module.scss";

interface ShoppingListCollapseProps {
  list: {
    id: string;
    name: string;
    status: string;
  };
}

const ShoppingListCollapse: FC<ShoppingListCollapseProps> = ({ list }: any) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleOpen();
    }
  }, [open]);

  const handleOpen = async () => {
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
  return (
    <div
      className={`${styles.col12} ${style.ShoppingListCollapse}`}
      onClick={() => setOpen(!open)}
    >
      <span className={`${styles.row} ${style.banner}`}>
        <p className={styles.pXLarge}>{list.name}</p>
        <p className={styles.pXLarge}>
          {loading && !data ? (
            <Loading />
          ) : list.status === Role.ACTIVE ? (
            <Link
              style={{ marginLeft: "auto" }}
              href={`shoppingList/${list.id}`}
            >
              {">"}
            </Link>
          ) : (
            "VIEW"
          )}
        </p>
      </span>
      <div style={{ display: open ? "block" : "none" }}>
        {data && (
          <div className={`${styles.row}`}>
            {data.map((item: any, i: number) => (
              <div className={`${styles.col12}`} key={i}>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListCollapse;
