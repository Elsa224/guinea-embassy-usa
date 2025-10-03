"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Breadcrumb } from "./Breadcrumb";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

interface AdminLayoutProps {
    children: React.ReactNode;
    breadcrumbTitle?: string;
}

export function AdminLayout({ children, breadcrumbTitle }: AdminLayoutProps) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-t-transparent border-ci-orange rounded-full animate-spin"></div>
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated" || !session?.user) {
        redirect("/auth/signin");
    }

    // Check if user has admin privileges
    const userRole = session.user.role;
    const hasAdminAccess = [
        "SUPER_ADMIN",
        "ADMIN",
        "EDITOR",
        "AUTHOR",
    ].includes(userRole);

    if (!hasAdminAccess) {
        redirect("/unauthorized");
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
                <div className="flex">
                    {/* Sidebar */}
                    <AdminSidebar user={session.user} />

                    {/* Main Content Area */}
                    <div className="flex-1 ml-64">
                        {/* Header */}
                        <AdminHeader user={session.user} />

                        {/* Page Content */}
                        <main className="p-6">
                            {/* Breadcrumb */}
                            <Breadcrumb customTitle={breadcrumbTitle} />
                            
                            {/* Main Content */}
                            {children}
                        </main>
                    </div>
                </div>

                {/* Toast Notifications */}
                <Toaster
                    position="top-right"
                    expand
                    richColors
                    closeButton
                    toastOptions={{
                        duration: 4000,
                    }}
                />
            </div>
        </ThemeProvider>
    );
}
