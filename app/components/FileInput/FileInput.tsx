import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import Loading from "../Loading/Loading";
import styles from "./FileInput.module.scss";

interface FileInputProps {
  onChange: (files: FileList | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setIsLoading(true);

    if (files && files[0].type.startsWith("image/")) {
      setFile(URL.createObjectURL(files[0]));
      onChange(files);
    } else {
      console.log("handle error");
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
