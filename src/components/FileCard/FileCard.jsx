import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Pencil2Icon,
  TrashIcon,
  DownloadIcon,
  FileIcon,
} from "@radix-ui/react-icons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";

export default function FileCard({ file }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isImage =
    file.url.toLowerCase().includes("jpg") ||
    file.url.toLowerCase().includes("png") ||
    file.url.toLowerCase().includes("jpeg") ||
    file.url.toLowerCase().includes("gif") ||
    file.url.toLowerCase().includes("svg") ||
    file.url.toLowerCase().includes("webp");

  return (
    <>
      <Card className="w-[250px] h-[100px] m-4 p-2">
        <CardContent className="p-3 flex items-center gap-5">
          {isImage ? (
            <Image
              loading="lazy"
              className="rounded object-contain"
              src={file.url}
              alt={file.pathname}
              width={50}
              height={50}
            />
          ) : (
            <FileIcon className="h-[50px] w-[50px]" />
          )}
          <div>
            <h4
              title={file.pathname}
              className="text-sm font-semibold text-ellipsis max-w-[140px] whitespace-nowrap overflow-hidden"
            >
              {file.pathname}
            </h4>
            <div className="flex justify-evenly items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditName(file.pathname);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil2Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit File Name</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete File</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download File</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                File Name
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                console.log("Hello");
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
