"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Tag, Move, Eye } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

interface Category {
    id: string;
    name: { fr: string; en: string };
    slug: string;
    description?: { fr: string; en: string };
    color?: string;
    icon?: string;
    order: number;
    parentId?: string;
    parent?: Category;
    children?: Category[];
    _count?: { posts: number };
    createdAt: string;
    updatedAt: string;
}

function CategoriesContent() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [formData, setFormData] = useState({
        name: { fr: "", en: "" },
        description: { fr: "", en: "" },
        color: "#ff7f00",
        icon: "",
        parentId: "",
        order: 0,
    });

    useEffect(() => {
        fetchCategories();
    }, [currentPage, searchTerm]);

    const fetchCategories = async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: "10",
            });

            if (searchTerm) {
                params.append("search", searchTerm);
            }

            const response = await fetch(`/api/admin/categories?${params}`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data.categories);
                setTotalPages(data.totalPages);
                setTotalCount(data.totalCount);
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des catégories");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCategory = async () => {
        if (!formData.name.fr || !formData.name.en) {
            toast.error("Le nom est requis en français et en anglais");
            return;
        }

        try {
            const url = editingCategory
                ? `/api/admin/categories/${editingCategory.id}`
                : "/api/admin/categories";

            const method = editingCategory ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(
                    editingCategory
                        ? "Catégorie mise à jour"
                        : "Catégorie créée"
                );
                setShowNewCategoryDialog(false);
                setEditingCategory(null);
                resetForm();
                fetchCategories();
            } else {
                toast.error("Erreur lors de la sauvegarde");
            }
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?"))
            return;

        try {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Catégorie supprimée");
                fetchCategories();
            } else {
                toast.error("Erreur lors de la suppression");
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const resetForm = () => {
        setFormData({
            name: { fr: "", en: "" },
            description: { fr: "", en: "" },
            color: "#ff7f00",
            icon: "",
            parentId: "",
            order: 0,
        });
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const openEditDialog = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || { fr: "", en: "" },
            color: category.color || "#ff7f00",
            icon: category.icon || "",
            parentId: category.parentId || "",
            order: category.order,
        });
        setShowNewCategoryDialog(true);
    };

    // Remove client-side filtering since we now do server-side filtering
    const filteredCategories = categories;

    const parentCategories = categories.filter((c) => !c.parentId);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-20 bg-gray-200 rounded animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Catégories
                    </h1>
                    <p className="text-gray-600">
                        Gérez les catégories de contenu
                    </p>
                </div>
                <Button
                    onClick={() => {
                        resetForm();
                        setEditingCategory(null);
                        setShowNewCategoryDialog(true);
                    }}
                    className="bg-ci-orange hover:bg-ci-orange/90"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle catégorie
                </Button>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Rechercher des catégories..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {filteredCategories.map((category) => (
                    <Card key={category.id}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor:
                                                category.color || "#ff7f00",
                                        }}
                                    />
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {category.name.fr}
                                            </h3>
                                            {category.name.en !==
                                                category.name.fr && (
                                                <span className="text-sm text-gray-500">
                                                    ({category.name.en})
                                                </span>
                                            )}
                                            {category.parent && (
                                                <Badge variant="outline">
                                                    Sous-catégorie de{" "}
                                                    {category.parent.name.fr}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Slug: {category.slug}
                                        </p>
                                        {category.description?.fr && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {category.description.fr}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">
                                        {category._count?.posts || 0} articles
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openEditDialog(category)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleDeleteCategory(category.id)
                                        }
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Affichage de {(currentPage - 1) * 10 + 1} à{" "}
                        {Math.min(currentPage * 10, totalCount)} sur{" "}
                        {totalCount} catégories
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Précédent
                        </Button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} sur {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            )}

            {filteredCategories.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Aucune catégorie trouvée
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm
                                ? "Aucune catégorie ne correspond à votre recherche."
                                : "Commencez par créer votre première catégorie."}
                        </p>
                    </CardContent>
                </Card>
            )}

            <Dialog
                open={showNewCategoryDialog}
                onOpenChange={setShowNewCategoryDialog}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingCategory
                                ? "Modifier la catégorie"
                                : "Nouvelle catégorie"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? "Modifiez les informations de la catégorie"
                                : "Créez une nouvelle catégorie pour organiser votre contenu"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name-fr">
                                    Nom (Français) *
                                </Label>
                                <Input
                                    id="name-fr"
                                    value={formData.name.fr}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: {
                                                ...formData.name,
                                                fr: e.target.value,
                                            },
                                        })
                                    }
                                    placeholder="Nom en français"
                                />
                            </div>
                            <div>
                                <Label htmlFor="name-en">Nom (Anglais) *</Label>
                                <Input
                                    id="name-en"
                                    value={formData.name.en}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: {
                                                ...formData.name,
                                                en: e.target.value,
                                            },
                                        })
                                    }
                                    placeholder="Nom en anglais"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="description-fr">
                                    Description (Français)
                                </Label>
                                <Textarea
                                    id="description-fr"
                                    value={formData.description.fr}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: {
                                                ...formData.description,
                                                fr: e.target.value,
                                            },
                                        })
                                    }
                                    placeholder="Description en français"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description-en">
                                    Description (Anglais)
                                </Label>
                                <Textarea
                                    id="description-en"
                                    value={formData.description.en}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: {
                                                ...formData.description,
                                                en: e.target.value,
                                            },
                                        })
                                    }
                                    placeholder="Description en anglais"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="color">Couleur</Label>
                                <Input
                                    id="color"
                                    type="color"
                                    value={formData.color}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="icon">Icône</Label>
                                <Input
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            icon: e.target.value,
                                        })
                                    }
                                    placeholder="tag, folder, etc."
                                />
                            </div>
                            <div>
                                <Label htmlFor="order">Ordre</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            order:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="parent">Catégorie parente</Label>
                            <Select
                                value={formData.parentId}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        parentId: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une catégorie parente (optionnel)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">
                                        Aucune (catégorie principale)
                                    </SelectItem>
                                    {parentCategories
                                        .filter(
                                            (c) => c.id !== editingCategory?.id
                                        )
                                        .map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name.fr}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowNewCategoryDialog(false);
                                setEditingCategory(null);
                                resetForm();
                            }}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSaveCategory}
                            className="bg-ci-orange hover:bg-ci-orange/90"
                        >
                            {editingCategory ? "Mettre à jour" : "Créer"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function CategoriesPage() {
    return (
        <AdminLayout breadcrumbTitle="Catégories">
            <CategoriesContent />
        </AdminLayout>
    );
}
