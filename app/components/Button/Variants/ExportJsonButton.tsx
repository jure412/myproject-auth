"use client";
import { FC, useEffect, useState } from "react";
import Button from "../Button";

interface ExportJsonButtonProps {
  id: number;
}

const ExportJsonButton: FC<ExportJsonButtonProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (isLoading) {
        setIsLoading(false);
      }
    };
  });

  const handleJson = async () => {
    const response = await fetch(
      `http://localhost:3000/api/items?id=${id}&type=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    // Create a Blob object from the JSON string
    const blob = new Blob([JSON.stringify(responseData)], {
      type: "application/json",
    });

    // Create a data URI from the Blob
    const dataUri = URL.createObjectURL(blob);

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUri;
    downloadLink.download = "data.json";

    // Append the download link to the body and click it programmatically
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up: remove the download link and revoke the data URI
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(dataUri);
  };
  return (
    <Button onClick={handleJson} isLoading={isLoading}>
      Export JSON
    </Button>
  );
};

export default ExportJsonButton;
