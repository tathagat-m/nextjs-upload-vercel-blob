"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ListFiles from "../ListFiles/ListFiles";

export function UploadFile() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const uploadImage = async (e) => {
    e.preventDefault();
    //show error for files more than 5MB
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorModalOpen(true);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });
    const jsonResponse = await response.json();
    setIsLoading(false);
    console.log("Response: ", jsonResponse);
  };

  useEffect(() => {
    let progressInterval;
    if (isLoading) {
      setUploadProgress(0);
      progressInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress < 90) {
            return prevProgress + 1;
          }
          return prevProgress;
        });
      }, 100);
    } else {
      setUploadProgress(0);
      clearInterval(progressInterval);
    }

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  return (
    <>
      <h1 className="text-center px-2 py-4">File Uploader</h1>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2 justify-center items-center">
        <form className="flex flex-col gap-2 px-5 py-10" onSubmit={uploadImage}>
          <Input
            type="file"
            id="image"
            name="image"
            required
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
            }}
          />
          {isLoading ? (
            <>
              <Button disabled={true} variant="outline" type="submit">
                Uploading...
              </Button>
              <Progress value={uploadProgress} />
            </>
          ) : (
            <Button variant="outline" type="submit">
              Upload
            </Button>
          )}
        </form>
        <ListFiles />
      </div>
      <Dialog open={errorModalOpen} onOpenChange={setErrorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Size Limit Exceeded</DialogTitle>
            <DialogDescription>
              Files of size more than 5MB are not allowed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <p>Please upload a file smaller than 5MB and try again.</p>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
