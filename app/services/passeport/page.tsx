"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
    AlertTriangle, 
    ExternalLink, 
    BookOpen, 
    Clock,
    MapPin,
    Mail,
    User,
    Users,
    RotateCcw,
    FileText,
    Calendar,
    Download
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

const passportTypes = {
    fr: [
        {
            id: 'premiere-demande',
            title: '1ère Demande de Passeport Ordinaire Biométrique',
            icon: User,
            color: 'bg-blue-500',
            documents: [
                'Copie de la Carte Consulaire valide (obligatoire) du demandeur',
                'Formulaire de demande de passeport biométrique dûment renseigné et signé',
                'Une (1) photo d\'identité récente 4cm x 4cm (modèle Europe)',
                'Copie de la Carte Nationale d\'Identité valide OU, à défaut, fournir les trois (03) documents suivants: Original de l\'extrait de naissance, Original du certificat de nationalité, Copie de la Carte Nationale d\'Identité d\'un parent',
                'Reçu de paiement des frais (115 euros)'
            ]
        },
        {
            id: 'premiere-demande-mineur',
            title: '1ère Demande de Passeport Ordinaire Biométrique pour Mineurs',
            icon: Users,
            color: 'bg-green-500',
            documents: [
                'Copie de la Carte Consulaire valide (obligatoire) du parent ou tuteur légal',
                'Formulaire de demande de passeport biométrique dûment renseigné et signé (Utilisation des initiales pour le nom de l\'enfant mineur)',
                'Autorisation parentale légalisée auprès de l\'Ambassade ou par l\'autorité américaine compétente',
                'Copie de l\'extrait d\'acte de naissance ivoirien de l\'enfant',
                'Une (1) photo d\'identité récente dimensions 4cm x 4cm (modèle Europe)',
                'Copie de la pièce d\'identité du parent ou du tuteur légal qui accompagne le mineur',
                'Reçu de paiement des frais (115 euros)'
            ]
        },
        {
            id: 'renouvellement',
            title: 'Renouvellement de Passeport Biométrique',
            icon: RotateCcw,
            color: 'bg-purple-500',
            documents: [
                'Copie de la Carte Consulaire valide (obligatoire) du demandeur',
                'Formulaire de demande de passeport biométrique dûment rempli et signé',
                'Copie (sur présentation de l\'original) du passeport biométrique expiré ou en voie d\'expiration (Six (6) mois au moins avant expiration)',
                'Une (1) photo d\'identité récente dimensions 4cm x 4cm (modèle Europe)',
                'Reçu de paiement des frais (115 euros)'
            ]
        }
    ],
    en: [
        {
            id: 'premiere-demande',
            title: 'First Application for Ordinary Biometric Passport',
            icon: User,
            color: 'bg-blue-500',
            documents: [
                'Copy of valid Consular Card (mandatory) of the applicant',
                'Biometric passport application form duly completed and signed',
                'One (1) recent identity photo 4cm x 4cm (European model)',
                'Copy of valid National Identity Card OR, failing that, provide the following three (03) documents: Original birth certificate, Original nationality certificate, Copy of parent\'s National Identity Card',
                'Payment receipt for fees (115 euros)'
            ]
        },
        {
            id: 'premiere-demande-mineur',
            title: 'First Application for Ordinary Biometric Passport for Minors',
            icon: Users,
            color: 'bg-green-500',
            documents: [
                'Copy of valid Consular Card (mandatory) of parent or legal guardian',
                'Biometric passport application form duly completed and signed (Use of initials for minor child\'s name)',
                'Parental authorization legalized at the Embassy or by competent American authority',
                'Copy of Ivorian birth certificate of the child',
                'One (1) recent identity photo 4cm x 4cm (European model)',
                'Copy of identity document of parent or legal guardian accompanying the minor',
                'Payment receipt for fees (115 euros)'
            ]
        },
        {
            id: 'renouvellement',
            title: 'Biometric Passport Renewal',
            icon: RotateCcw,
            color: 'bg-purple-500',
            documents: [
                'Copy of valid Consular Card (mandatory) of the applicant',
                'Biometric passport application form duly completed and signed',
                'Copy (upon presentation of original) of expired or expiring biometric passport (At least six (6) months before expiration)',
                'One (1) recent identity photo 4cm x 4cm (European model)',
                'Payment receipt for fees (115 euros)'
            ]
        }
    ]
};

export default function PasseportPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPassportType, setSelectedPassportType] = useState('premiere-demande');

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/passeport', {
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

    const title = page?.title?.[language] || (language === 'fr' ? 'PASSEPORT' : 'PASSPORT');
    const paymentLink = page?.paymentLink || "https://www.monpasseport.ci";
    const formLink = page?.formLink || "https://www.monpasseport.ci";

    const currentPassportTypes = passportTypes[language];
    const selectedType = currentPassportTypes.find(type => type.id === selectedPassportType);

    if (loading) {
        return (
            <Layout currentPath="/services/passeport">
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
        <Layout currentPath="/services/passeport">
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
                                <BookOpen className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr' 
                                    ? 'Choisissez le type de demande correspondant à votre situation et consultez les documents requis.'
                                    : 'Choose the application type that corresponds to your situation and consult the required documents.'}
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
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-red-200 bg-red-50">
                                <CardContent className="p-6">
                                    <div className="flex items-start">
                                        <AlertTriangle className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {language === 'fr' ? 'Informations Importantes' : 'Important Information'}
                                            </h3>
                                            <div className="text-gray-700 space-y-2">
                                                <p className="font-semibold">
                                                    {language === 'fr' 
                                                        ? '• Jours d\'enrôlement pour le passeport : LUNDI, MERCREDI et JEUDI'
                                                        : '• Passport enrollment days: MONDAY, WEDNESDAY and THURSDAY'}
                                                </p>
                                                <p>
                                                    {language === 'fr' 
                                                        ? '• Présence du requérant obligatoire pour l\'établissement ou le renouvellement du passeport biométrique ivoirien (prise de photo et empreintes digitales).'
                                                        : '• Mandatory presence of the applicant for the establishment or renewal of the Ivorian biometric passport (photo and fingerprint taking).'}
                                                </p>
                                                <p>
                                                    {language === 'fr' 
                                                        ? '• En cas de perte de l\'ancien passeport biométrique, joindre un certificat de perte délivré par les autorités policières américaines (traduction en français dudit certificat de perte par un cabinet assermenté).'
                                                        : '• In case of loss of the old biometric passport, attach a loss certificate issued by American police authorities (French translation of said loss certificate by a sworn firm).'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Passport Type Selector */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'fr' ? 'Types de Demande' : 'Application Types'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {currentPassportTypes.map((type, index) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <motion.div
                                            key={type.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        >
                                            <Card 
                                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                                    selectedPassportType === type.id 
                                                        ? 'ring-2 ring-orange-500 shadow-lg' 
                                                        : 'hover:shadow-md'
                                                }`}
                                                onClick={() => setSelectedPassportType(type.id)}
                                            >
                                                <CardContent className="p-6 text-center">
                                                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${type.color} shadow-lg`}>
                                                        <IconComponent className="h-6 w-6 text-white" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {type.title}
                                                    </h3>
                                                    <Badge 
                                                        variant={selectedPassportType === type.id ? "default" : "outline"}
                                                        className="text-xs"
                                                    >
                                                        {selectedPassportType === type.id 
                                                            ? (language === 'fr' ? 'Sélectionné' : 'Selected')
                                                            : (language === 'fr' ? 'Cliquer pour sélectionner' : 'Click to select')
                                                        }
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Selected Passport Documents */}
                        {selectedType && (
                            <motion.div
                                key={selectedPassportType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-8"
                            >
                                <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                                        <CardTitle className="flex items-center gap-3">
                                            <selectedType.icon className="h-6 w-6" />
                                            {selectedType.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                                            {language === 'fr' ? 'Pièces à fournir :' : 'Required Documents:'}
                                        </h3>
                                        <ol className="space-y-4">
                                            {selectedType.documents.map((doc, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                                    className="flex items-start"
                                                >
                                                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-700 pt-1">{doc}</span>
                                                </motion.li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* Processing Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-amber-200 bg-amber-50">
                                <CardContent className="p-6">
                                    <div className="flex items-start">
                                        <Clock className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-amber-600" />
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {language === 'fr' ? 'Délais de traitement' : 'Processing Time'}
                                            </h3>
                                            <div className="text-gray-700 space-y-2">
                                                <p>
                                                    {language === 'fr' 
                                                        ? '• Le délai de traitement de la demande est de trente à quarante-cinq (30 à 45) jours après transmission du dossier à la SNEDAI.'
                                                        : '• Processing time for the application is thirty to forty-five (30 to 45) days after transmission of the file to SNEDAI.'}
                                                </p>
                                                <p className="font-semibold text-amber-700">
                                                    {language === 'fr' 
                                                        ? '• Tout dossier incomplet entraînera le non-traitement de la demande.'
                                                        : '• Any incomplete file will result in non-processing of the application.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Pickup Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-blue-200 bg-blue-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        {language === 'fr' ? 'Retrait du Passeport' : 'Passport Pickup'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <User className="h-4 w-4 text-blue-600" />
                                                {language === 'fr' ? 'Directement au Consulat Général' : 'Directly at the Consulate General'}
                                            </h4>
                                            <p className="text-gray-700">
                                                {language === 'fr' 
                                                    ? 'Du lundi au vendredi : de 14h00 à 16h00.'
                                                    : 'Monday to Friday: from 2:00 PM to 4:00 PM.'}
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-blue-600" />
                                                {language === 'fr' ? 'Par voie postale' : 'By Mail'}
                                            </h4>
                                            <div className="text-gray-700 space-y-2 text-sm">
                                                <p>
                                                    {language === 'fr' 
                                                        ? 'Fournir une enveloppe prépayée ou un bordereau d\'envoi d\'une compagnie (UPS, DHL…), portant l\'adresse précise et exacte.'
                                                        : 'Provide a prepaid envelope or shipping slip from a company (UPS, DHL...), with precise and exact address.'}
                                                </p>
                                                <p>
                                                    {language === 'fr' 
                                                        ? 'Dans ce cas, le requérant devra obligatoirement fournir une lettre de désengagement signée.'
                                                        : 'In this case, the applicant must provide a signed disclaimer letter.'}
                                                </p>
                                                <p className="font-semibold">
                                                    {language === 'fr' 
                                                        ? 'Toute enveloppe doit porter un « tracking number »'
                                                        : 'Every envelope must have a "tracking number"'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Payment Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Paiement des frais de passeport (115 euros)' : 'Passport Fee Payment (115 euros)'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez le paiement des frais de passeport via notre plateforme officielle.'
                                            : 'Make passport fee payment through our official platform.'}
                                    </p>
                                    <div className="text-center">
                                        <Button
                                            onClick={() => window.open(paymentLink, '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Payer les frais de passeport' : 'Pay Passport Fees'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Online Platform Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Plateforme officielle MonPasseport.ci' : 'Official MonPasseport.ci Platform'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Téléchargez vos formulaires et effectuez vos paiements sur la plateforme officielle.'
                                            : 'Download your forms and make your payments on the official platform.'}
                                    </p>
                                    <div className="text-center">
                                        <Button 
                                            onClick={() => window.open(formLink, '_blank')}
                                            className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            www.monpasseport.ci
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