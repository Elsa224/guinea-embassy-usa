"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, X } from "lucide-react";

interface SchedulePublishDialogProps {
    open: boolean;
    onClose: () => void;
    onSchedule: (publishDate: string) => void;
    currentDate?: string;
}

export function SchedulePublishDialog({ 
    open, 
    onClose, 
    onSchedule, 
    currentDate 
}: SchedulePublishDialogProps) {
    const [publishDate, setPublishDate] = useState(
        currentDate || new Date().toISOString().slice(0, 16)
    );

    const handleSchedule = () => {
        if (publishDate) {
            onSchedule(publishDate);
            onClose();
        }
    };

    const now = new Date().toISOString().slice(0, 16);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            Programmer la publication
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="publish-date">
                            Date et heure de publication
                        </Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                                id="publish-date"
                                type="datetime-local"
                                value={publishDate}
                                min={now}
                                onChange={(e) => setPublishDate(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            L'article sera automatiquement publié à la date et heure spécifiées.
                        </p>
                    </div>

                    {publishDate && (
                        <div className="rounded-lg bg-orange-50 p-3 border border-orange-200">
                            <p className="text-sm font-medium text-orange-800">
                                Publication programmée pour :
                            </p>
                            <p className="text-sm text-orange-600">
                                {new Date(publishDate).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSchedule}
                        disabled={!publishDate || publishDate <= now}
                        className="bg-orange-600 hover:bg-orange-700"
                    >
                        <Calendar className="h-4 w-4 mr-2" />
                        Programmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}