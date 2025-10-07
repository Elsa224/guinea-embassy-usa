"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
    AlertTriangle, 
    ExternalLink, 
    FileText, 
    Clock,
    MapPin,
    Mail,
    User,
    Baby,
    Copy,
    DollarSign,
    Heart,
    FileX,
    Plane
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

const civilStateServices = {
    fr: [
        {
            id: 'transcription-naissance',
            title: 'Transcription d\'Acte de Naissance',
            icon: Baby,
            color: 'bg-blue-500',
            fee: '$20',
            formLink: '/assets/services-consulaires-forms/transcription-acte-de-naissance-form.pdf',
            documents: [
                'Photocopie de la Carte Consulaire valide (obligatoire) pour les requérants résidents',
                'Formulaire dûment renseigné et signé',
                'Copie intégrale de l\'acte de naissance américain de l\'enfant',
                'Copie de la traduction en français de l\'acte de naissance américain par un cabinet assermenté',
                'Copie de la preuve de la nationalité ivoirienne de l\'un des deux parents (carte d\'identité nationale, certificat de nationalité)',
                'Copie des pièces d\'identité des deux parents (Carte Nationale d\'Identité, Passeport ou Attestation Administrative d\'Identité)',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'copie-naissance',
            title: 'Copie d\'Acte de Naissance',
            icon: Copy,
            color: 'bg-green-500',
            fee: '$20',
            documents: [
                'Copie de la Carte Consulaire valide (obligatoire) pour les requérants résidents',
                'Copie d\'un extrait d\'acte de naissance délivré par le Consulat Général de Côte d\'Ivoire à New York',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'transcription-mariage',
            title: 'Transcription d\'Acte de Mariage',
            icon: Heart,
            color: 'bg-pink-500',
            fee: '$20',
            formLink: '/assets/services-consulaires-forms/transcription-acte-de-mariage-form.pdf',
            documents: [
                'Copie de la Carte Consulaire valide (obligatoire) pour les requérants résidents',
                'Formulaire dûment renseigné et signé',
                'Copie de l\'extrait d\'acte de mariage américain',
                'Copie de la traduction en français de l\'acte de mariage américain par un cabinet assermenté',
                'Copie de la preuve de la nationalité ivoirienne de l\'un des deux époux (carte d\'identité nationale, certificat de nationalité)',
                'Copie de l\'extrait d\'acte de naissance des deux (02) époux',
                'Copie des pièces d\'identité des deux époux (Carte Nationale d\'Identité, Passeport ou Attestation Administrative d\'Identité)',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'copie-mariage',
            title: 'Copie d\'Acte de Mariage',
            icon: Copy,
            color: 'bg-pink-300',
            fee: '$20',
            documents: [
                'Copie de la Carte Consulaire valide (obligatoire) pour les requérants résidents',
                'Copie d\'un extrait de l\'acte de mariage délivré par le Consulat Général à New York',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'transcription-deces',
            title: 'Transcription d\'Acte de Décès',
            icon: FileX,
            color: 'bg-gray-600',
            fee: '$20',
            formLink: '/assets/services-consulaires-forms/transcription-acte-de-deces.pdf',
            documents: [
                'Formulaire dûment renseigné et signé',
                'Original de l\'acte de décès américain',
                'Traduction en français de l\'acte de décès américain par un cabinet assermenté',
                'Copie de l\'extrait d\'acte de naissance du défunt ou de la défunte',
                'Copie de la pièce d\'identité du défunt ou de la défunte (Carte Nationale d\'Identité, Passeport ou Attestation Administrative d\'Identité)',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'copie-deces',
            title: 'Copie d\'Acte de Décès',
            icon: Copy,
            color: 'bg-gray-400',
            fee: '$20',
            documents: [
                'Copie d\'un extrait de l\'acte de décès délivré par le Consulat Général de Côte d\'Ivoire aux États-Unis',
                'Reçu de paiement des frais (20 dollars)'
            ]
        }
    ],
    en: [
        {
            id: 'transcription-naissance',
            title: 'Birth Certificate Transcription',
            icon: Baby,
            color: 'bg-blue-500',
            fee: '$20',
            formLink: '/assets/services-consulaires-forms/transcription-acte-de-naissance-form.pdf',
            documents: [
                'Photocopy of valid Consular Card (mandatory) for resident applicants',
                'Duly completed and signed form',
                'Complete copy of the child\'s American birth certificate',
                'Copy of French translation of the American birth certificate by a sworn firm',
                'Copy of proof of Ivorian nationality of one of the two parents (national identity card, nationality certificate)',
                'Copy of identity documents of both parents (National Identity Card, Passport or Administrative Identity Certificate)',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'copie-naissance',
            title: 'Birth Certificate Copy',
            icon: Copy,
            color: 'bg-green-500',
            fee: '$20',
            documents: [
                'Copy of valid Consular Card (mandatory) for resident applicants',
                'Copy of birth certificate extract issued by the Consulate General of Côte d\'Ivoire in New York',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'transcription-mariage',
            title: 'Marriage Certificate Transcription',
            icon: Heart,
            color: 'bg-pink-500',
            fee: '$20',
            formLink: '/assets/services-consulaires-forms/transcription-acte-de-mariage-form.pdf',
            documents: [
                'Copy of valid Consular Card (mandatory) for resident applicants',
                'Duly completed and signed form',
                'Copy of American marriage certificate extract',
                'Copy of French translation of the American marriage certificate by a sworn firm',
                'Copy of proof of Ivorian nationality of one of the two spouses (national identity card, nationality certificate)',
                'Copy of birth certificate extract of both (02) spouses',
                'Copy of identity documents of both spouses (National Identity Card, Passport or Administrative Identity Certificate)',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'copie-mariage',
            title: 'Marriage Certificate Copy',
            icon: Copy,
            color: 'bg-pink-300',
            fee: '$20',
            documents: [
                'Copy of valid Consular Card (mandatory) for resident applicants',
                'Copy of marriage certificate extract issued by the Consulate General in New York',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'transcription-deces',
            title: 'Death Certificate Transcription',
            icon: FileX,
            color: 'bg-gray-600',
            fee: '$20',
            formLink: '/assets/services-consulaires-forms/transcription-acte-de-deces.pdf',
            documents: [
                'Duly completed and signed form',
                'Original American death certificate',
                'French translation of the American death certificate by a sworn firm',
                'Copy of birth certificate extract of the deceased',
                'Copy of identity document of the deceased (National Identity Card, Passport or Administrative Identity Certificate)',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'copie-deces',
            title: 'Death Certificate Copy',
            icon: Copy,
            color: 'bg-gray-400',
            fee: '$20',
            documents: [
                'Copy of death certificate extract issued by the Consulate General of Côte d\'Ivoire in the United States',
                'Payment receipt for fees (20 dollars)'
            ]
        }
    ]
};

export default function EtatCivilPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedServiceType, setSelectedServiceType] = useState('transcription-naissance');

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/etat-civil', {
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

    const title = page?.title?.[language] || (language === 'fr' ? 'TRANSCRIPTION ET COPIES DES ACTES D\'ÉTAT CIVIL' : 'TRANSCRIPTION AND COPIES OF CIVIL STATUS DOCUMENTS');
    const paymentLink = page?.paymentLink || "https://www.ci-embassyepay.org/";
    const formLink = page?.formLink || "https://newyork.diplomatie.gouv.ci/";

    const currentServices = civilStateServices[language];
    const selectedService = currentServices.find(service => service.id === selectedServiceType);

    if (loading) {
        return (
            <Layout currentPath="/services/etat-civil">
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
        <Layout currentPath="/services/etat-civil">
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
                            <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr'
                                    ? "Services de transcription et délivrance de copies d'actes d'état civil."
                                    : "Transcription services and issuance of copies of civil status documents."}
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

                        {/* Service Type Selector */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'fr' ? 'Types de Services' : 'Service Types'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {currentServices.map((service, index) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <motion.div
                                            key={service.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        >
                                            <Card 
                                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                                    selectedServiceType === service.id 
                                                        ? 'ring-2 ring-orange-500 shadow-lg' 
                                                        : 'hover:shadow-md'
                                                }`}
                                                onClick={() => setSelectedServiceType(service.id)}
                                            >
                                                <CardContent className="p-4 text-center">
                                                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${service.color} shadow-lg`}>
                                                        <IconComponent className="h-5 w-5 text-white" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                                        {service.title}
                                                    </h3>
                                                    <div className="flex items-center justify-center gap-1 mb-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {service.fee}
                                                        </Badge>
                                                    </div>
                                                    <Badge 
                                                        variant={selectedServiceType === service.id ? "default" : "outline"}
                                                        className="text-xs"
                                                    >
                                                        {selectedServiceType === service.id 
                                                            ? (language === 'fr' ? 'Sélectionné' : 'Selected')
                                                            : (language === 'fr' ? 'Sélectionner' : 'Select')
                                                        }
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Selected Service Documents */}
                        {selectedService && (
                            <motion.div
                                key={selectedServiceType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-8"
                            >
                                <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                                        <CardTitle className="flex items-center gap-3">
                                            <selectedService.icon className="h-6 w-6" />
                                            {selectedService.title}
                                            <Badge variant="secondary" className="bg-white text-gray-800">
                                                {selectedService.fee}
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                                            {language === 'fr' ? 'Pièces à fournir :' : 'Required Documents:'}
                                        </h3>
                                        <ol className="space-y-4">
                                            {selectedService.documents.map((doc, index) => (
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

                        {/* Submission Methods */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-blue-200 bg-blue-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        {language === 'fr' ? 'Modalités de retrait' : 'Pickup Methods'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-blue-600" />
                                                {language === 'fr' ? 'Par FedEx' : 'By FedEx'}
                                            </h4>
                                            <p className="text-gray-700">
                                                {language === 'fr' 
                                                    ? 'Votre document sera livré par le moyen sécurisé FedEx disponible sur Express54.'
                                                    : 'Your document will be delivered by the secure FedEx method available on Express54.'}
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <User className="h-4 w-4 text-blue-600" />
                                                {language === 'fr' ? 'En personne' : 'In Person'}
                                            </h4>
                                            <p className="text-gray-700">
                                                {language === 'fr' 
                                                    ? 'Sélectionnez votre date de retrait sur la plateforme Express54.'
                                                    : 'Select your pickup date on the Express54 platform.'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Processing Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
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
                                                        ? '• Le délai de traitement de la demande est de trois (03) jours ouvrables après réception du dossier.'
                                                        : '• Processing time for the application is three (03) business days after receiving the file.'}
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
                                        {language === 'fr' ? 'Paiement des frais ($20)' : 'Fee Payment ($20)'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez le paiement des frais de service via notre plateforme sécurisée.'
                                            : 'Make service fee payment through our secure platform.'}
                                    </p>
                                    <div className="text-center">
                                        <Button
                                            onClick={() => window.open(paymentLink, '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Payer les frais' : 'Pay Fees'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Express54 Platform Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Plateforme digitale Express54' : 'Express54 Digital Platform'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Accédez à la plateforme Express54 pour vos démarches consulaires.'
                                            : 'Access the Express54 platform for your consular procedures.'}
                                    </p>
                                    <div className="text-center">
                                        <Button 
                                            onClick={() => window.open('https://www.express54.org', '_blank')}
                                            className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            www.express54.org
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