"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  Upload,
  Grid3X3,
  List,
  Search,
  Trash2,
  Edit,
  Download,
  X,
} from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUploadTabs } from "@/components/admin/MediaUploadTabs";
import { toast } from "react-hot-toast";
import { formatBytes } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useConfirmDialog } from "@/components/admin/ConfirmDialog";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  size: number;
  mimeType: string;
  alt?: string;
  caption?: string;
  createdAt: string;
  uploader: {
    name: string;
    email: string;
  };
}

function MediaLibraryContent() {
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ alt: "", caption: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { confirm, dialog } = useConfirmDialog();

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      
      if (filterType !== "all") {
        params.append("type", filterType);
      }
      
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) throw new Error("Failed to fetch media");
      
      const data = await response.json();
      setMedia(data.media);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }, [page, filterType, searchQuery]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUploadComplete = async (files: any[]) => {
    try {
      console.log("Upload completed:", files);
      toast.success(`Successfully uploaded ${files.length} file(s)!`);
      setIsUploadOpen(false);
      fetchMedia();
    } catch (error) {
      console.error("Error after upload:", error);
      toast.error("Failed to refresh media");
    }
  };

  const handleEdit = async () => {
    if (!selectedMedia) return;

    try {
      const response = await fetch(`/api/admin/media/${selectedMedia.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error("Failed to update media");
      
      toast.success("Media updated successfully");
      setIsEditOpen(false);
      fetchMedia();
    } catch (error) {
      console.error("Error updating media:", error);
      toast.error("Failed to update media");
    }
  };

  const handleDelete = async (id: string, filename: string) => {
    confirm({
      title: "Supprimer le média",
      description: `Êtes-vous sûr de vouloir supprimer "${filename}" ? Cette action est irréversible.`,
      confirmText: "Supprimer",
      variant: "destructive",
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/admin/media/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) throw new Error("Failed to delete media");
          
          toast.success("Média supprimé avec succès");
          fetchMedia();
        } catch (error) {
          console.error("Error deleting media:", error);
          toast.error("Échec de la suppression du média");
        }
      },
    });
  };

  const openEditDialog = (item: MediaItem) => {
    setSelectedMedia(item);
    setEditForm({ alt: item.alt || "", caption: item.caption || "" });
    setIsEditOpen(true);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ci-orange hover:bg-ci-orange/90">
              <Upload className="mr-2 h-4 w-4" /> Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Upload images, videos, or documents to your media library
              </DialogDescription>
            </DialogHeader>
            <MediaUploadTabs
              onUploadComplete={handleUploadComplete}
              onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and View Options */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
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
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" : "space-y-2"}>
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className={viewMode === "grid" ? "aspect-square" : "h-16"} />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openEditDialog(item)}
            >
              <div className="aspect-square relative bg-gray-50 flex items-center justify-center">
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
                <p className="text-sm font-medium truncate">{item.filename}</p>
                <p className="text-xs text-gray-500">{formatBytes(item.size)}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.url, "_blank");
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id, item.filename);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {media.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center">
                  {item.type === "IMAGE" ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    getFileIcon(item.type)
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.filename}</p>
                  <p className="text-sm text-gray-500">
                    {formatBytes(item.size)} • Uploaded by {item.uploader.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id, item.filename)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
            <DialogDescription>
              Update the alt text and caption for this media file
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={editForm.alt}
                onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                placeholder="Describe this media for accessibility"
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                value={editForm.caption}
                onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                placeholder="Add a caption for this media"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit} className="bg-ci-orange hover:bg-ci-orange/90">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {dialog}
    </div>
  );
}

export default function MediaLibrary() {
  return (
    <AdminLayout>
      <MediaLibraryContent />
    </AdminLayout>
  );
}