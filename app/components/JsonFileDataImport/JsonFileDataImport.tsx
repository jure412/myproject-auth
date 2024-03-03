"use client";

import { convertImageToBase64 } from "@/app/helpers";
import { NotificationType } from "@/enums";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";
import FileInput from "../FileInput/FileInput";
import { NotificationContext } from "../Notifications/Notifications";

interface JsonFileDataImportProps {
  id: number;
}

const JsonFileDataImport: FC<JsonFileDataImportProps> = ({ id }) => {
  const router = useRouter();
  const notifications = useContext(NotificationContext);

  const handleFileChange = async (files: FileList | null) => {
    const file = files && files[0];
    if (file) {
      const file = files[0];
      const base64Image = await convertImageToBase64(file);

      const data = await fetch("/api/shoppingList/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64Image }),
      });

      const res = await data.json();
      if (!res?.error) {
        const responseUpdate = [
          {
            type: NotificationType.SUCCESS,
            message: "Items updated!",
          },
        ];

        notifications?.setNotifications(responseUpdate);
      } else {
        notifications?.setNotifications(res?.error);
      }
    }
    router.refresh();
  };
  return (
    <FileInput
      acceptedFormat={"application/json"}
      onChange={handleFileChange}
    />
  );
};

export default JsonFileDataImport;
