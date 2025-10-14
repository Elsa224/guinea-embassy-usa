"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/admin/FileUpload";
import { UploadDropzone } from "@/lib/uploadthing";
import { Cloud, HardDrive } from "lucide-react";
import { toast } from "react-hot-toast";

interface MediaUploadTabsProps {
  onUploadComplete?: (files: any[]) => void;
  onUploadError?: (error: Error) => void;
}

export function MediaUploadTabs({
  onUploadComplete,
  onUploadError,
}: MediaUploadTabsProps) {
  const [activeTab, setActiveTab] = useState("local");

  const handleLocalUploadComplete = (files: any[]) => {
    onUploadComplete?.(files);
  };

  const handleUploadThingComplete = (files: any[]) => {
    console.log("UploadThing files:", files);
    onUploadComplete?.(files);
  };

  const handleUploadThingError = (error: Error) => {
    console.error("UploadThing error:", error);
    toast.error(`UploadThing failed: ${error.message}`);
    onUploadError?.(error);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="local" className="flex items-center gap-2">
          <HardDrive className="w-4 h-4" />
          Local Upload
        </TabsTrigger>
        <TabsTrigger value="uploadthing" className="flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          Cloud Upload
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="local" className="mt-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Upload files directly to the server. Files are stored locally in the uploads folder.
          </p>
          <FileUpload
            onUploadComplete={handleLocalUploadComplete}
            onUploadError={onUploadError}
            maxFiles={10}
            maxFileSize={50}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="uploadthing" className="mt-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Upload files using UploadThing cloud service. 
            {!process.env.UPLOADTHING_TOKEN && (
              <span className="text-red-600 font-medium">
                {" "}(Requires UPLOADTHING_TOKEN environment variable)
              </span>
            )}
          </p>
          <UploadDropzone
            endpoint="mediaUploader"
            onClientUploadComplete={handleUploadThingComplete}
            onUploadError={handleUploadThingError}
            config={{
              mode: "auto",
            }}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}