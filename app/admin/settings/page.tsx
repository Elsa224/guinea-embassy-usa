"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Globe,
  Mail,
  FileText,
  Image,
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

const settingsSchema = z.object({
  // Site Information
  site_name: z.string().min(1, "Site name is required"),
  site_description: z.string().min(1, "Site description is required"),
  site_url: z.string().url("Must be a valid URL"),
  site_logo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  // Contact Information
  contact_email: z.string().email("Must be a valid email"),
  contact_phone: z.string().min(1, "Phone is required"),
  contact_address: z.string().min(1, "Address is required"),
  
  // Social Media
  facebook_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagram_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  // Email Settings
  smtp_host: z.string().optional(),
  smtp_port: z.string().optional(),
  smtp_user: z.string().optional(),
  smtp_from: z.string().email("Must be a valid email").optional().or(z.literal("")),
  
  // Site Settings
  default_language: z.enum(["fr", "en"]),
  timezone: z.string(),
  posts_per_page: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  
  // Features
  enable_comments: z.boolean(),
  enable_registration: z.boolean(),
  maintenance_mode: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const defaultValues: SettingsFormData = {
  site_name: "Consulat Général de Côte d'Ivoire",
  site_description: "Site officiel du Consulat Général de Côte d'Ivoire à New York",
  site_url: "https://consulat-ci.org",
  site_logo: "",
  contact_email: "info@consulat-ci.org",
  contact_phone: "+1 (212) 000-0000",
  contact_address: "New York, NY",
  facebook_url: "",
  twitter_url: "",
  instagram_url: "",
  linkedin_url: "",
  smtp_host: "",
  smtp_port: "",
  smtp_user: "",
  smtp_from: "",
  default_language: "fr",
  timezone: "America/New_York",
  posts_per_page: "10",
  enable_comments: false,
  enable_registration: false,
  maintenance_mode: false,
};

function SettingsContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      
      const settings = await response.json();
      
      // Convert settings object to form data
      const formData: Partial<SettingsFormData> = {};
      Object.keys(defaultValues).forEach(key => {
        if (settings[key]) {
          const value = settings[key].value;
          if (typeof defaultValues[key as keyof SettingsFormData] === 'boolean') {
            (formData as any)[key] = value === 'true';
          } else {
            (formData as any)[key] = value;
          }
        }
      });
      
      form.reset({ ...defaultValues, ...formData });
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      setSaving(true);
      
      // Convert form data to settings array
      const settings = Object.entries(data).map(([key, value]) => ({
        key,
        value: String(value),
      }));

      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to update settings");
      
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const getSettingDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      site_name: "The name of your website",
      site_description: "A brief description of your site",
      site_url: "The main URL of your website",
      contact_email: "Primary contact email address",
      contact_phone: "Primary phone number",
      contact_address: "Physical address",
      default_language: "Default language for the website",
      posts_per_page: "Number of posts to display per page",
      enable_comments: "Allow comments on posts",
      enable_registration: "Allow new user registration",
      maintenance_mode: "Put the site in maintenance mode",
    };
    return descriptions[key] || "";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={saving}
          className="bg-ci-orange hover:bg-ci-orange/90"
        >
          {saving ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Enregistrer
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Informations générales
                </CardTitle>
                <CardDescription>
                  Configuration de base de votre site web
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site_name">Nom du site</Label>
                  <Input
                    id="site_name"
                    {...form.register("site_name")}
                    error={form.formState.errors.site_name?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="site_description">Description</Label>
                  <Textarea
                    id="site_description"
                    {...form.register("site_description")}
                    rows={3}
                    error={form.formState.errors.site_description?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="site_url">URL du site</Label>
                  <Input
                    id="site_url"
                    type="url"
                    {...form.register("site_url")}
                    error={form.formState.errors.site_url?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="site_logo">Logo (URL)</Label>
                  <Input
                    id="site_logo"
                    type="url"
                    {...form.register("site_logo")}
                    placeholder="https://example.com/logo.png"
                    error={form.formState.errors.site_logo?.message}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="default_language">Langue par défaut</Label>
                    <Select
                      value={form.watch("default_language")}
                      onValueChange={(value) => form.setValue("default_language", value as "fr" | "en")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="posts_per_page">Articles par page</Label>
                    <Input
                      id="posts_per_page"
                      type="number"
                      {...form.register("posts_per_page")}
                      error={form.formState.errors.posts_per_page?.message}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Informations de contact
                </CardTitle>
                <CardDescription>
                  Coordonnées affichées sur le site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    {...form.register("contact_email")}
                    error={form.formState.errors.contact_email?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact_phone">Téléphone</Label>
                  <Input
                    id="contact_phone"
                    {...form.register("contact_phone")}
                    error={form.formState.errors.contact_phone?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact_address">Adresse</Label>
                  <Textarea
                    id="contact_address"
                    {...form.register("contact_address")}
                    rows={3}
                    error={form.formState.errors.contact_address?.message}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
                <CardDescription>
                  Liens vers vos profils de réseaux sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="facebook_url">Facebook</Label>
                  <Input
                    id="facebook_url"
                    type="url"
                    {...form.register("facebook_url")}
                    placeholder="https://facebook.com/your-page"
                    error={form.formState.errors.facebook_url?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="twitter_url">Twitter</Label>
                  <Input
                    id="twitter_url"
                    type="url"
                    {...form.register("twitter_url")}
                    placeholder="https://twitter.com/your-account"
                    error={form.formState.errors.twitter_url?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram_url">Instagram</Label>
                  <Input
                    id="instagram_url"
                    type="url"
                    {...form.register("instagram_url")}
                    placeholder="https://instagram.com/your-account"
                    error={form.formState.errors.instagram_url?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    {...form.register("linkedin_url")}
                    placeholder="https://linkedin.com/company/your-company"
                    error={form.formState.errors.linkedin_url?.message}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configuration email
                </CardTitle>
                <CardDescription>
                  Paramètres SMTP pour l'envoi d'emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp_host">Serveur SMTP</Label>
                    <Input
                      id="smtp_host"
                      {...form.register("smtp_host")}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="smtp_port">Port</Label>
                    <Input
                      id="smtp_port"
                      {...form.register("smtp_port")}
                      placeholder="587"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="smtp_user">Nom d'utilisateur</Label>
                  <Input
                    id="smtp_user"
                    {...form.register("smtp_user")}
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtp_from">Email expéditeur</Label>
                  <Input
                    id="smtp_from"
                    type="email"
                    {...form.register("smtp_from")}
                    placeholder="noreply@consulat-ci.org"
                    error={form.formState.errors.smtp_from?.message}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Paramètres avancés
                </CardTitle>
                <CardDescription>
                  Configuration avancée et fonctionnalités
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable_comments">Autoriser les commentaires</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux visiteurs de commenter les articles
                    </p>
                  </div>
                  <Switch
                    id="enable_comments"
                    checked={form.watch("enable_comments")}
                    onCheckedChange={(checked) => form.setValue("enable_comments", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable_registration">Autoriser l'inscription</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux nouveaux utilisateurs de s'inscrire
                    </p>
                  </div>
                  <Switch
                    id="enable_registration"
                    checked={form.watch("enable_registration")}
                    onCheckedChange={(checked) => form.setValue("enable_registration", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance_mode" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Mode maintenance
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Rendre le site inaccessible aux visiteurs
                    </p>
                  </div>
                  <Switch
                    id="maintenance_mode"
                    checked={form.watch("maintenance_mode")}
                    onCheckedChange={(checked) => form.setValue("maintenance_mode", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}

export default function Settings() {
  return (
    <AdminLayout>
      <SettingsContent />
    </AdminLayout>
  );
}