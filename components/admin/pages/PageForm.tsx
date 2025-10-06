"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Plus, Trash2, Globe } from "lucide-react";
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(
    () => import("@/components/admin/TipTapEditor"),
    { ssr: false }
);

interface Page {
    id?: string;
    title: { fr: string; en: string };
    slug: string;
    content: { fr: string; en: string };
    status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
    template: string;
    metaTitle?: { fr: string; en: string };
    metaDescription?: { fr: string; en: string };
    order: number;
    parentId?: string | null;
    serviceType?: string | null;
    requiredDocs?: { fr: string[]; en: string[] } | null;
    fees?: Record<string, number> | null;
    processingTime?: { fr: string; en: string } | null;
    paymentLink?: string | null;
    formLink?: string | null;
}

interface PageFormProps {
    initialData?: Page;
    onSubmit: (data: any) => Promise<void>;
    loading?: boolean;
    submitLabel?: string;
}

const serviceTypes = [
    { value: "visa", label: "Visa" },
    { value: "passeport", label: "Passeport" },
    { value: "carte-consulaire", label: "Carte Consulaire" },
    { value: "etat-civil", label: "État Civil" },
    { value: "autres-documents", label: "Autres Documents" },
    { value: "transcription", label: "Transcription" },
    { value: "legalisation", label: "Légalisation" },
    { value: "certification", label: "Certification" },
];

const templates = [
    { value: "default", label: "Page standard" },
    { value: "service", label: "Page de service" },
    { value: "landing", label: "Page d'accueil" },
];

export function PageForm({
    initialData,
    onSubmit,
    loading = false,
    submitLabel = "Enregistrer",
}: PageFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Page>({
        title: { fr: "", en: "" },
        slug: "",
        content: { fr: "", en: "" },
        status: "DRAFT",
        template: "default",
        metaTitle: { fr: "", en: "" },
        metaDescription: { fr: "", en: "" },
        order: 0,
        parentId: null,
        serviceType: null,
        requiredDocs: { fr: [], en: [] },
        fees: {},
        processingTime: { fr: "", en: "" },
        paymentLink: null,
        formLink: null,
        ...initialData,
    });

    const [requiredDocInput, setRequiredDocInput] = useState({
        fr: "",
        en: "",
    });
    const [feeKey, setFeeKey] = useState("");
    const [feeValue, setFeeValue] = useState("");
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        // Fetch available parent pages
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await fetch("/api/admin/pages");
            if (response.ok) {
                const data = await response.json();
                setPages(data.filter((p: Page) => p.id !== initialData?.id));
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (lang: "fr" | "en", value: string) => {
        setFormData({
            ...formData,
            title: { ...formData.title, [lang]: value },
            // Auto-generate slug from French title
            ...(lang === "fr" &&
                !formData.slug && { slug: generateSlug(value) }),
        });
    };

    const addRequiredDoc = (lang: "fr" | "en") => {
        const input = requiredDocInput[lang].trim();
        if (!input) return;

        setFormData({
            ...formData,
            requiredDocs: {
                ...formData.requiredDocs!,
                [lang]: [...(formData.requiredDocs?.[lang] || []), input],
            },
        });
        setRequiredDocInput({ ...requiredDocInput, [lang]: "" });
    };

    const removeRequiredDoc = (lang: "fr" | "en", index: number) => {
        setFormData({
            ...formData,
            requiredDocs: {
                ...formData.requiredDocs!,
                [lang]:
                    formData.requiredDocs?.[lang].filter(
                        (_, i) => i !== index
                    ) || [],
            },
        });
    };

    const addFee = () => {
        if (!feeKey || !feeValue) return;

        setFormData({
            ...formData,
            fees: { ...formData.fees, [feeKey]: parseFloat(feeValue) },
        });
        setFeeKey("");
        setFeeValue("");
    };

    const removeFee = (key: string) => {
        const newFees = { ...formData.fees };
        delete newFees[key];
        setFormData({ ...formData, fees: newFees });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clean up data before submission
        const submitData = {
            ...formData,
            requiredDocs:
                formData.requiredDocs?.fr.length ||
                formData.requiredDocs?.en.length
                    ? formData.requiredDocs
                    : null,
            fees: Object.keys(formData.fees || {}).length
                ? formData.fees
                : null,
            processingTime:
                formData.processingTime?.fr || formData.processingTime?.en
                    ? formData.processingTime
                    : null,
            paymentLink: formData.paymentLink || null,
            formLink: formData.formLink || null,
        };

        await onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                </Button>
                <Button type="submit" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Enregistrement..." : submitLabel}
                </Button>
            </div>

            <Tabs defaultValue="content" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content">Contenu</TabsTrigger>
                    <TabsTrigger value="service">Service</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contenu de la page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title-fr">
                                        Titre (Français)
                                    </Label>
                                    <Input
                                        id="title-fr"
                                        value={formData.title.fr}
                                        onChange={(e) =>
                                            handleTitleChange(
                                                "fr",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="title-en">
                                        Titre (Anglais)
                                    </Label>
                                    <Input
                                        id="title-en"
                                        value={formData.title.en}
                                        onChange={(e) =>
                                            handleTitleChange(
                                                "en",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            slug: e.target.value,
                                        })
                                    }
                                    placeholder="url-de-la-page"
                                    required
                                />
                            </div>

                            <Tabs defaultValue="fr" className="mt-4">
                                <TabsList>
                                    <TabsTrigger value="fr">
                                        Français
                                    </TabsTrigger>
                                    <TabsTrigger value="en">
                                        English
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="fr">
                                    <TipTapEditor
                                        content={formData.content.fr}
                                        onChange={(content) =>
                                            setFormData({
                                                ...formData,
                                                content: {
                                                    ...formData.content,
                                                    fr: content,
                                                },
                                            })
                                        }
                                        placeholder="Contenu en français..."
                                    />
                                </TabsContent>

                                <TabsContent value="en">
                                    <TipTapEditor
                                        content={formData.content.en}
                                        onChange={(content) =>
                                            setFormData({
                                                ...formData,
                                                content: {
                                                    ...formData.content,
                                                    en: content,
                                                },
                                            })
                                        }
                                        placeholder="English content..."
                                    />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="service" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations de service</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="serviceType">
                                    Type de service
                                </Label>
                                <Select
                                    value={formData.serviceType || ""}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            serviceType: value || null,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Aucun
                                        </SelectItem>
                                        {serviceTypes.map((type) => (
                                            <SelectItem
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium">
                                    Documents requis
                                </h4>

                                <Tabs defaultValue="fr">
                                    <TabsList>
                                        <TabsTrigger value="fr">
                                            Français
                                        </TabsTrigger>
                                        <TabsTrigger value="en">
                                            English
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="fr"
                                        className="space-y-2"
                                    >
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Ajouter un document requis..."
                                                value={requiredDocInput.fr}
                                                onChange={(e) =>
                                                    setRequiredDocInput({
                                                        ...requiredDocInput,
                                                        fr: e.target.value,
                                                    })
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    (e.preventDefault(),
                                                    addRequiredDoc("fr"))
                                                }
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() =>
                                                    addRequiredDoc("fr")
                                                }
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.requiredDocs?.fr.map(
                                            (doc, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Badge variant="secondary">
                                                        {doc}
                                                    </Badge>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            removeRequiredDoc(
                                                                "fr",
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                    </TabsContent>

                                    <TabsContent
                                        value="en"
                                        className="space-y-2"
                                    >
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add required document..."
                                                value={requiredDocInput.en}
                                                onChange={(e) =>
                                                    setRequiredDocInput({
                                                        ...requiredDocInput,
                                                        en: e.target.value,
                                                    })
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    (e.preventDefault(),
                                                    addRequiredDoc("en"))
                                                }
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() =>
                                                    addRequiredDoc("en")
                                                }
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.requiredDocs?.en.map(
                                            (doc, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Badge variant="secondary">
                                                        {doc}
                                                    </Badge>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            removeRequiredDoc(
                                                                "en",
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium">Frais</h4>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type de frais (ex: standard)"
                                        value={feeKey}
                                        onChange={(e) =>
                                            setFeeKey(e.target.value)
                                        }
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Montant"
                                        value={feeValue}
                                        onChange={(e) =>
                                            setFeeValue(e.target.value)
                                        }
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={addFee}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {Object.entries(formData.fees || {}).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex items-center gap-2"
                                        >
                                            <Badge variant="secondary">
                                                {key}: ${value}
                                            </Badge>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeFee(key)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="processingTime-fr">
                                        Délai de traitement (FR)
                                    </Label>
                                    <Input
                                        id="processingTime-fr"
                                        value={
                                            formData.processingTime?.fr || ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                processingTime: {
                                                    ...formData.processingTime!,
                                                    fr: e.target.value,
                                                },
                                            })
                                        }
                                        placeholder="3 jours ouvrables"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="processingTime-en">
                                        Processing Time (EN)
                                    </Label>
                                    <Input
                                        id="processingTime-en"
                                        value={
                                            formData.processingTime?.en || ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                processingTime: {
                                                    ...formData.processingTime!,
                                                    en: e.target.value,
                                                },
                                            })
                                        }
                                        placeholder="3 business days"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="paymentLink">
                                    Lien de paiement
                                </Label>
                                <Input
                                    id="paymentLink"
                                    type="url"
                                    value={formData.paymentLink || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            paymentLink: e.target.value,
                                        })
                                    }
                                    placeholder="https://www.ci-embassyepay.org/"
                                />
                            </div>

                            <div>
                                <Label htmlFor="formLink">
                                    Lien du formulaire
                                </Label>
                                <Input
                                    id="formLink"
                                    type="url"
                                    value={formData.formLink || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            formLink: e.target.value,
                                        })
                                    }
                                    placeholder="https://express54.org/form"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Métadonnées SEO</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="metaTitle-fr">
                                        Meta Title (FR)
                                    </Label>
                                    <Input
                                        id="metaTitle-fr"
                                        value={formData.metaTitle?.fr || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                metaTitle: {
                                                    ...formData.metaTitle!,
                                                    fr: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="metaTitle-en">
                                        Meta Title (EN)
                                    </Label>
                                    <Input
                                        id="metaTitle-en"
                                        value={formData.metaTitle?.en || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                metaTitle: {
                                                    ...formData.metaTitle!,
                                                    en: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="metaDescription-fr">
                                        Meta Description (FR)
                                    </Label>
                                    <Textarea
                                        id="metaDescription-fr"
                                        value={
                                            formData.metaDescription?.fr || ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                metaDescription: {
                                                    ...formData.metaDescription!,
                                                    fr: e.target.value,
                                                },
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="metaDescription-en">
                                        Meta Description (EN)
                                    </Label>
                                    <Textarea
                                        id="metaDescription-en"
                                        value={
                                            formData.metaDescription?.en || ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                metaDescription: {
                                                    ...formData.metaDescription!,
                                                    en: e.target.value,
                                                },
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres de la page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="status">Statut</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: any) =>
                                        setFormData({
                                            ...formData,
                                            status: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">
                                            Brouillon
                                        </SelectItem>
                                        <SelectItem value="REVIEW">
                                            En révision
                                        </SelectItem>
                                        <SelectItem value="PUBLISHED">
                                            Publié
                                        </SelectItem>
                                        <SelectItem value="ARCHIVED">
                                            Archivé
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="template">Template</Label>
                                <Select
                                    value={formData.template}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            template: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templates.map((template) => (
                                            <SelectItem
                                                key={template.value}
                                                value={template.value}
                                            >
                                                {template.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="parentId">Page parente</Label>
                                <Select
                                    value={formData.parentId || ""}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            parentId: value || null,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Aucune page parente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Aucune
                                        </SelectItem>
                                        {pages.map((page) => (
                                            <SelectItem
                                                key={page.id}
                                                value={page.id!}
                                            >
                                                {page.title.fr}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    );
}
