"use client";

import { useState, useCallback, useEffect } from "react";
import { ImageIcon, VideoIcon, FileTextIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBytes } from "@/lib/utils";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  size: number;
  mimeType: string;
  alt?: string;
  caption?: string;
  createdAt: string;
}

interface MediaSelectorProps {
  onSelect: (media: MediaItem) => void;
  filter?: "IMAGE" | "VIDEO" | "DOCUMENT" | "all";
  children?: React.ReactNode;
}

export function MediaSelector({ onSelect, filter = "all", children }: MediaSelectorProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(filter);
  const [isOpen, setIsOpen] = useState(false);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: "50",
      });
      
      if (typeFilter !== "all") {
        params.append("type", typeFilter);
      }
      
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) throw new Error("Failed to fetch media");
      
      const data = await response.json();
      setMedia(data.media);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, fetchMedia]);

  const handleSelect = (item: MediaItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "IMAGE":
        return <ImageIcon className="w-8 h-8" />;
      case "VIDEO":
        return <VideoIcon className="w-8 h-8" />;
      default:
        return <FileTextIcon className="w-8 h-8" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Select Media</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose a file from your media library
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-4 items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {filter === "all" && (
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as "IMAGE" | "VIDEO" | "DOCUMENT" | "all")}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="IMAGE">Images</SelectItem>
                <SelectItem value="VIDEO">Videos</SelectItem>
                <SelectItem value="DOCUMENT">Documents</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(15)].map((_, i) => (
                <Skeleton key={i} className="aspect-square" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <div className="aspect-square relative flex items-center justify-center">
                    {item.type === "IMAGE" ? (
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{item.filename}</p>
                    <p className="text-xs text-gray-500">{formatBytes(item.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && media.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <ImageIcon className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No media found</p>
              <p className="text-sm">Try adjusting your search or upload some files first</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}