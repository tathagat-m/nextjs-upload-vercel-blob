import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import FileCard from "../FileCard/FileCard";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

export default function ListFiles({ uploadTime }) {
  const [fileData, setFileData] = useState([]);

  async function fetchFiles() {
    const response = await fetch("/api/list", {
      method: "GET",
      tags: ["file-list"],
    });
    const jsonResponse = await response.json();
    setFileData(jsonResponse.blobs);
  }

  useEffect(() => {
    fetchFiles();
  }, [uploadTime]);

  return (
    <div>
      <h3 className="text-center font-bold">File List</h3>
      <Separator className="my-4" />
      {fileData.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {fileData.map((file) => (
            <FileCard key={file.uploadedAt} file={file} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </div>
      )}
    </div>
  );
}
