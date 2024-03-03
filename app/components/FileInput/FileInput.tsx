import { NotificationType } from "@/enums";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import Loading from "../Loading/Loading";
import { NotificationContext } from "../Notifications/Notifications";
import styles from "./FileInput.module.scss";

interface FileInputProps {
  onChange: (files: FileList | null) => void;
  acceptedFormat?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  acceptedFormat = "image/",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const notifications = useContext(NotificationContext);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setIsLoading(true);
    if (files && files[0].type.startsWith(acceptedFormat)) {
      if (files[0].type.startsWith("image/")) {
        setFile(URL.createObjectURL(files[0]));
        onChange(files);
      }
      if (files[0].type.startsWith("application/json")) {
        onChange(files);
      }
    } else {
      const responseUpdate = [
        {
          type: NotificationType.DANGER,
          message: "File is not correct format",
        },
      ];

      notifications?.setNotifications(responseUpdate);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.fileInput}>
      <label className={styles.label}>
        {isLoading ? <Loading /> : "Choose File"}
        <input
          type="file"
          onChange={handleFileChange}
          className={styles.input}
          disabled={isLoading}
        />
      </label>
      {file && (
        <Image
          className={styles.image}
          src={file}
          alt="Description of the image"
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL={file}
        />
      )}
    </div>
  );
};

export default FileInput;
