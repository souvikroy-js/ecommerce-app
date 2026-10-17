"use client";

import { Button } from "@/components/shadcnui/button";
import { parseImages } from "@/lib/images";
import { Trash2Icon, UploadIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
};

const ImageUpload = ({ value, onChange, onFileChange }: ImageUploadProps) => {
  const urls = parseImages(value);
  const persistedUrl = urls[0] ?? null;

  const { openFilePicker, clear, filesContent } = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
    validators: [
      new FileTypeValidator(["jpg", "jpeg", "png", "webp"]),
      new FileSizeValidator({ maxFileSize: 10 * 1024 * 1024 }),
    ],
    onFilesSuccessfullySelected: ({ plainFiles }) => {
      const file = plainFiles[0];
      if (!file) return;
      onFileChange(file);
      onChange(file.name);
    },
    onFilesRejected: ({ errors }) => {
      toast.error(errors.map((e) => e.name).join(", ") || "File rejected");
    },
  });

  const handleRemove = () => {
    clear();
    onFileChange(null);
    onChange("");
  };

  const localDataUrl = filesContent[0]?.content ?? null;
  const previewUrl = localDataUrl ?? persistedUrl;

  return (
    <div className="flex flex-col gap-3">
      {previewUrl ?
        <div className="relative inline-flex">
          <img
            src={previewUrl}
            alt=""
            className="bg-muted h-48 w-full max-w-80 rounded-lg border object-contain"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-xs"
            className="absolute -top-2 -right-2"
            onClick={handleRemove}>
            <Trash2Icon />
          </Button>
        </div>
      : <button
          type="button"
          onClick={() => openFilePicker()}
          className="text-muted-foreground hover:border-foreground/50 hover:text-foreground flex h-48 w-full max-w-80 cursor-pointer items-center justify-center rounded-lg border border-dashed">
          <UploadIcon />
        </button>
      }
      {previewUrl && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => openFilePicker()}>
          Change image
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
