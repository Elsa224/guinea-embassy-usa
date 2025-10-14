"use client";

import { useState, useRef } from "react";
import { Upload, X, File, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onUploadComplete?: (files: any[]) => void;
  onUploadError?: (error: Error) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  accept = "image/*,video/*,.pdf,.doc,.docx",
  multiple = true,
  maxFiles = 10,
  maxFileSize = 50, // 50MB default
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    // Validate files
    const validFiles = files.filter(file => {
      if (file.size > maxFileSize * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Max size is ${maxFileSize}MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length + selectedFiles.length > maxFiles) {
      toast.error(`You can only upload ${maxFiles} files at once`);
      return;
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append("files", file);
      });

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      toast.success("Files uploaded successfully!");
      setSelectedFiles([]);
      onUploadComplete?.(result.files);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Upload failed";
      toast.error(errorMsg);
      onUploadError?.(error instanceof Error ? error : new Error(errorMsg));
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-6 h-6 text-blue-500" />;
    } else if (file.type.startsWith("video/")) {
      return <Video className="w-6 h-6 text-purple-500" />;
    } else {
      return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-ci-orange bg-orange-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supports images, videos, and documents up to {maxFileSize}MB
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Selected Files ({selectedFiles.length})</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedFiles([])}
              disabled={uploading}
            >
              Clear All
            </Button>
            <Button
              type="button"
              onClick={uploadFiles}
              disabled={uploading || selectedFiles.length === 0}
              className="bg-ci-orange hover:bg-ci-orange/90"
            >
              {uploading ? "Uploading..." : `Upload ${selectedFiles.length} Files`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}