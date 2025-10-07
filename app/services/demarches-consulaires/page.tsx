"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
    AlertTriangle, 
    ExternalLink, 
    Clock,
    MapPin,
    Mail,
    User,
    Calendar,
    FileText,
    Info,
    Phone
} from "lucide-react";
import { useState, useEffect } from "react";

interface Page {
    id: string;
    title: { fr: string; en: string };
    content: { fr: string; en: string };
    requiredDocs?: { fr: string[]; en: string[] } | null;
    paymentLink?: string | null;
    formLink?: string | null;
    processingTime?: { fr: string; en: string } | null;
}

const importantInfo = {
    fr: [
        'Consultez la liste des pièces à fournir sur le site : https://newyork.diplomatie.gouv.ci/',
        'Faire des photocopies de tous les documents requis',
        'Télécharger les formulaires à renseigner via le site web du Consulat Général, rubrique « Documents »',
        'La présence du requérant est absolument obligatoire pour l\'établissement ou le renouvellement du passeport biométrique ivoirien (prise de photo et empreintes digitales)',
        'La présence du requérant est absolument obligatoire pour l\'établissement du certificat de vie',
        'Jours d\'enrôlement pour le passeport : LUNDI, MERCREDI et JEUDI'
    ],
    en: [
        'Consult the list of required documents on the website: https://newyork.diplomatie.gouv.ci/',
        'Make photocopies of all required documents',
        'Download the forms to fill out via the Consulate General website, "Documents" section',
        'The applicant\'s presence is absolutely mandatory for the establishment or renewal of the Ivorian biometric passport (photo and fingerprint taking)',
        'The applicant\'s presence is absolutely mandatory for the establishment of the life certificate',
        'Passport enrollment days: MONDAY, WEDNESDAY and THURSDAY'
    ]
};

const scheduleInfo = {
    fr: {
        general: 'Du lundi au vendredi',
        morning: 'Matin : 9h30 – 13h00',
        afternoon: 'Après-midi : 14h00 – 16h30',
        deposit: 'Dépôt de dossier (lundi au jeudi)',
        depositMorning: 'Matin : 9h30 – 13h00',
        depositAfternoon: 'Après-midi : 14h00 – 16h00',
        pickup: 'Retrait de dossier : 72 heures (soit trois (03) jours) après le dépôt',
        pickupTime: 'Du lundi au vendredi : 14h00 – 16h00'
    },
    en: {
        general: 'Monday to Friday',
        morning: 'Morning: 9:30 AM – 1:00 PM',
        afternoon: 'Afternoon: 2:00 PM – 4:30 PM',
        deposit: 'File deposit (Monday to Thursday)',
        depositMorning: 'Morning: 9:30 AM – 1:00 PM',
        depositAfternoon: 'Afternoon: 2:00 PM – 4:00 PM',
        pickup: 'File pickup: 72 hours (three (03) days) after deposit',
        pickupTime: 'Monday to Friday: 2:00 PM – 4:00 PM'
    }
};

export default function DemarchesConsulairesPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/demarches-consulaires', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPage(data);
            }
        } catch (error) {
            console.error('Error fetching page:', error);
        } finally {
            setLoading(false);
        }
    };

    const title = page?.title?.[language] || (language === 'fr' ? 'Démarches consulaires' : 'Consular Procedures');
    const formLink = page?.formLink || "https://newyork.diplomatie.gouv.ci/";

    const currentImportantInfo = importantInfo[language];
    const currentSchedule = scheduleInfo[language];

    if (loading) {
        return (
            <Layout currentPath="/services/demarches-consulaires">
                <div className="bg-white py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                                    <p className="text-gray-600">
                                        {language === 'fr' ? 'Chargement...' : 'Loading...'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout currentPath="/services/demarches-consulaires">
            <div className="bg-white py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-6xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8 text-center"
                        >
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
                                <FileText className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr'
                                    ? "Guide complet des démarches et procédures consulaires pour les ressortissants ivoiriens."
                                    : "Complete guide to consular procedures and processes for Ivorian nationals."}
                            </p>
                        </motion.div>

                        {/* Language Toggle */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8 flex justify-end gap-2"
                        >
                            <Button
                                variant={language === 'fr' ? 'default' : 'outline'}
                                onClick={() => setLanguage('fr')}
                                className={`rounded-lg px-4 py-2 text-sm ${language === 'fr' ? 'bg-gray-800 hover:bg-gray-900' : ''}`}
                            >
                                FR
                            </Button>
                            <Button
                                variant={language === 'en' ? 'default' : 'outline'}
                                onClick={() => setLanguage('en')}
                                className={`rounded-lg px-4 py-2 text-sm ${language === 'en' ? 'bg-gray-800 hover:bg-gray-900' : ''}`}
                            >
                                EN
                            </Button>
                        </motion.div>

                        {/* Important Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                <div className="bg-orange-500 text-white p-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <Info className="h-6 w-6" />
                                        {language === 'fr' ? 'Informations utiles' : 'Useful Information'}
                                    </h2>
                                </div>
                                <CardContent className="p-8">
                                    <ul className="space-y-4">
                                        {currentImportantInfo.map((info, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                                                className="flex items-start"
                                            >
                                                <span className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white mt-1">
                                                    •
                                                </span>
                                                <span className="text-gray-700 pt-1">{info}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm font-semibold text-red-700">
                                            {language === 'fr' 
                                                ? 'N.B : Tout dossier incomplet entraînera le non-traitement de la demande.'
                                                : 'N.B: Any incomplete file will result in non-processing of the application.'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Schedule Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-blue-200 bg-blue-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        {language === 'fr' ? 'Jours et horaires de service' : 'Service Days and Hours'}
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    {language === 'fr' ? 'Horaires généraux' : 'General Hours'}
                                                </h4>
                                                <p className="text-gray-700 font-medium">{currentSchedule.general}</p>
                                                <p className="text-gray-600 text-sm">{currentSchedule.morning}</p>
                                                <p className="text-gray-600 text-sm">{currentSchedule.afternoon}</p>
                                            </div>
                                            
                                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    {currentSchedule.deposit}
                                                </h4>
                                                <p className="text-gray-600 text-sm">{currentSchedule.depositMorning}</p>
                                                <p className="text-gray-600 text-sm">{currentSchedule.depositAfternoon}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    {language === 'fr' ? 'Retrait de documents' : 'Document Pickup'}
                                                </h4>
                                                <p className="text-gray-700 text-sm mb-2">{currentSchedule.pickup}</p>
                                                <p className="text-gray-600 text-sm">{currentSchedule.pickupTime}</p>
                                            </div>
                                            
                                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    {language === 'fr' ? 'Jours fériés' : 'Public Holidays'}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {language === 'fr' 
                                                        ? 'Le Consulat Général est fermé les jours fériés en Côte d\'Ivoire et aux États-Unis'
                                                        : 'The Consulate General is closed on public holidays in Côte d\'Ivoire and the United States'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Document Submission Methods */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-purple-200 bg-purple-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                        {language === 'fr' ? 'Comment obtenir ses documents ?' : 'How to obtain your documents?'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-purple-600" />
                                                {language === 'fr' ? 'Par voie postale' : 'By Mail'}
                                            </h4>
                                            <div className="text-gray-700 space-y-1">
                                                <p className="font-medium">Adresse :</p>
                                                <p>Consulat Général de Côte d'Ivoire</p>
                                                <p>800 Second Avenue, Fifth Floor</p>
                                                <p>New York, NY 10017</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <User className="h-4 w-4 text-purple-600" />
                                                {language === 'fr' ? 'En personne' : 'In Person'}
                                            </h4>
                                            <p className="text-gray-700">
                                                {language === 'fr' 
                                                    ? 'Se présenter directement au Consulat Général pour le dépôt du dossier de demande de documents ou d\'actes consulaires.'
                                                    : 'Present yourself directly at the Consulate General for the submission of document requests or consular acts.'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Document Pickup */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                        {language === 'fr' ? 'Retrait des documents' : 'Document Pickup'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <User className="h-4 w-4 text-green-600" />
                                                {language === 'fr' ? 'Directement au Consulat Général' : 'Directly at the Consulate General'}
                                            </h4>
                                            <p className="text-gray-700">
                                                {language === 'fr' 
                                                    ? 'Du lundi au vendredi : 14h00 à 16h00'
                                                    : 'Monday to Friday: 2:00 PM to 4:00 PM'}
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-green-600" />
                                                {language === 'fr' ? 'Par voie postale' : 'By Mail'}
                                            </h4>
                                            <div className="text-gray-700 space-y-2 text-sm">
                                                <p>
                                                    {language === 'fr' 
                                                        ? 'Fournir une enveloppe prépayée ou un bordereau d\'envoi d\'une compagnie (UPS, DHL…), portant l\'adresse précise et exacte (en caractères d\'imprimerie).'
                                                        : 'Provide a prepaid envelope or shipping slip from a company (UPS, DHL...), with precise and exact address (in print characters).'}
                                                </p>
                                                <p>
                                                    {language === 'fr' 
                                                        ? 'Dans ce cas, le requérant devra obligatoirement fournir une lettre de désengagement signée.'
                                                        : 'In this case, the applicant must provide a signed disclaimer letter.'}
                                                </p>
                                                <p className="font-semibold">
                                                    {language === 'fr' 
                                                        ? 'Toute enveloppe doit porter un « tracking number ».'
                                                        : 'Every envelope must have a "tracking number".'}
                                                </p>
                                                <p className="text-amber-600">
                                                    {language === 'fr' 
                                                        ? 'Le délai d\'acheminement dépendra des délais de la poste.'
                                                        : 'Delivery time will depend on postal service delays.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Website and Forms Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Site officiel et formulaires' : 'Official Website and Forms'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Consultez notre site officiel pour obtenir la liste complète des documents requis et télécharger les formulaires nécessaires.'
                                            : 'Visit our official website to get the complete list of required documents and download necessary forms.'}
                                    </p>
                                    <div className="text-center">
                                        <Button 
                                            onClick={() => window.open(formLink, '_blank')}
                                            className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Site officiel' : 'Official Website'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}