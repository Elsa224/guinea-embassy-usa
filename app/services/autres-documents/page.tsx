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
    File,
    Stamp,
    Heart,
    Home,
    Truck,
    GraduationCap,
    DollarSign
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

const documentServices = {
    fr: [
        {
            id: 'certificat-vie',
            title: 'Certificat de Vie',
            icon: Heart,
            color: 'bg-red-500',
            fee: '$20',
            documents: [
                'Présentation de la Carte Consulaire valide (obligatoire) du demandeur',
                'Copie du brevet d\'inscription au registre des retraites ou décision de mise à la retraite',
                'Copie d\'une pièce d\'identité ivoirienne valide du requérant (Carte Nationale d\'Identité, Passeport, Attestation Administrative d\'Identité)',
                'Preuve de résidence actuelle aux États-Unis d\'Amérique (factures ou tout document faisant foi)',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'certificat-vie-entretien',
            title: 'Certificat de Vie et d\'Entretien',
            icon: User,
            color: 'bg-blue-500',
            fee: '$20',
            documents: [
                'Présentation de la Carte Consulaire valide (obligatoire) du demandeur',
                'Original de l\'extrait d\'acte de naissance de l\'enfant à charge',
                'Copie d\'une pièce d\'identité ivoirienne valide du parent ou du tuteur légal qui entretient l\'enfant (Carte Nationale d\'Identité, Passeport ou Attestation Administrative d\'Identité)',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'certificat-residence',
            title: 'Certificat de Résidence',
            icon: Home,
            color: 'bg-green-500',
            fee: '$20',
            documents: [
                'Présentation de la Carte Consulaire valide (obligatoire) du demandeur',
                'Copie d\'une pièce d\'identité ivoirienne valide du requérant (Carte Nationale d\'Identité, Passeport ou Attestation Administrative d\'Identité)',
                'Preuve de résidence actuelle aux États-Unis d\'Amérique (factures ou tout document faisant foi)',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'certificat-non-remariage',
            title: 'Certificat de Non-Remariage',
            icon: File,
            color: 'bg-purple-500',
            fee: '$20',
            documents: [
                'Présentation de la Carte Consulaire valide (obligatoire) du demandeur',
                'Copie de l\'extrait d\'acte de mariage',
                'Copie de l\'extrait d\'acte de décès du conjoint',
                'Copie de l\'extrait d\'acte de naissance du demandeur',
                'Copie d\'une pièce d\'identité ivoirienne valide du requérant',
                'Preuve de résidence actuelle aux États-Unis d\'Amérique',
                'Reçu de paiement des frais (20 dollars)'
            ]
        },
        {
            id: 'certificat-demenagement',
            title: 'Certificat de Déménagement',
            icon: Truck,
            color: 'bg-orange-500',
            fee: '$50 (travailleurs) / $25 (étudiants)',
            documents: [
                'Présentation de la Carte Consulaire valide (obligatoire) du demandeur',
                'Copie de la pièce d\'identité ivoirienne valide',
                'Document attestant la fin du séjour aux États-Unis : Lettre de fin de contrat de l\'employeur pour les travailleurs du public ou du privé, Copie du diplôme de fin d\'études pour les étudiants',
                'Liste des effets personnels ou de colisage',
                'Preuve de résidence actuelle en Côte d\'Ivoire (factures ou tout document faisant foi)',
                'Connaissement et itinéraire',
                'Reçu de paiement des frais (50 dollars pour les travailleurs ; 25 dollars pour les étudiants)'
            ]
        },
        {
            id: 'legalisations',
            title: 'Légalisations d\'Actes',
            icon: Stamp,
            color: 'bg-indigo-500',
            fee: '$20',
            description: 'Légalisation de procuration, autorisation parentale, signature, diplôme et autres documents administratifs'
        }
    ],
    en: [
        {
            id: 'certificat-vie',
            title: 'Life Certificate',
            icon: Heart,
            color: 'bg-red-500',
            fee: '$20',
            documents: [
                'Presentation of valid Consular Card (mandatory) of the applicant',
                'Copy of retirement registration certificate or retirement decision',
                'Copy of valid Ivorian identity document of the applicant (National Identity Card, Passport, Administrative Identity Certificate)',
                'Proof of current residence in the United States of America (bills or any document serving as proof)',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'certificat-vie-entretien',
            title: 'Life and Support Certificate',
            icon: User,
            color: 'bg-blue-500',
            fee: '$20',
            documents: [
                'Presentation of valid Consular Card (mandatory) of the applicant',
                'Original birth certificate extract of the dependent child',
                'Copy of valid Ivorian identity document of the parent or legal guardian supporting the child (National Identity Card, Passport or Administrative Identity Certificate)',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'certificat-residence',
            title: 'Residence Certificate',
            icon: Home,
            color: 'bg-green-500',
            fee: '$20',
            documents: [
                'Presentation of valid Consular Card (mandatory) of the applicant',
                'Copy of valid Ivorian identity document of the applicant (National Identity Card, Passport or Administrative Identity Certificate)',
                'Proof of current residence in the United States of America (bills or any document serving as proof)',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'certificat-non-remariage',
            title: 'Non-Remarriage Certificate',
            icon: File,
            color: 'bg-purple-500',
            fee: '$20',
            documents: [
                'Presentation of valid Consular Card (mandatory) of the applicant',
                'Copy of marriage certificate extract',
                'Copy of spouse\'s death certificate extract',
                'Copy of applicant\'s birth certificate extract',
                'Copy of valid Ivorian identity document of the applicant',
                'Proof of current residence in the United States of America',
                'Payment receipt for fees (20 dollars)'
            ]
        },
        {
            id: 'certificat-demenagement',
            title: 'Moving Certificate',
            icon: Truck,
            color: 'bg-orange-500',
            fee: '$50 (workers) / $25 (students)',
            documents: [
                'Presentation of valid Consular Card (mandatory) of the applicant',
                'Copy of valid Ivorian identity document',
                'Document certifying the end of stay in the United States: End of contract letter from employer for public or private workers, Copy of graduation diploma for students',
                'List of personal effects or luggage',
                'Proof of current residence in Côte d\'Ivoire (bills or any document serving as proof)',
                'Bill of lading and itinerary',
                'Payment receipt for fees (50 dollars for workers; 25 dollars for students)'
            ]
        },
        {
            id: 'legalisations',
            title: 'Document Legalizations',
            icon: Stamp,
            color: 'bg-indigo-500',
            fee: '$20',
            description: 'Legalization of proxy, parental authorization, signature, diploma and other administrative documents'
        }
    ]
};

export default function AutresDocumentsPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedServiceType, setSelectedServiceType] = useState('certificat-vie');

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/autres-documents', {
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

    const title = page?.title?.[language] || (language === 'fr' ? 'CERTIFICATION ET LÉGALISATION D\'ACTES' : 'CERTIFICATION AND LEGALIZATION OF DOCUMENTS');
    const paymentLink = page?.paymentLink || "https://www.ci-embassyepay.org/";
    const formLink = page?.formLink || "https://newyork.diplomatie.gouv.ci/";

    const currentServices = documentServices[language];
    const selectedService = currentServices.find(service => service.id === selectedServiceType);

    if (loading) {
        return (
            <Layout currentPath="/services/autres-documents">
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
        <Layout currentPath="/services/autres-documents">
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
                                    ? "Services de certification et légalisation de documents administratifs."
                                    : "Certification and legalization services for administrative documents."}
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

                        {/* Service Type Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'fr' ? 'Types de Services' : 'Service Types'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                        {/* Selected Service Details */}
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
                                        {selectedService.id === 'legalisations' ? (
                                            <div>
                                                <p className="text-gray-700 mb-6">{selectedService.description}</p>
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h4 className="font-semibold text-gray-900 mb-2">
                                                        {language === 'fr' ? 'Types de légalisations disponibles :' : 'Available legalization types:'}
                                                    </h4>
                                                    <ul className="text-gray-700 space-y-1 text-sm">
                                                        <li>• {language === 'fr' ? 'Légalisation de Procuration' : 'Proxy Legalization'}</li>
                                                        <li>• {language === 'fr' ? 'Légalisation d\'Autorisation Parentale' : 'Parental Authorization Legalization'}</li>
                                                        <li>• {language === 'fr' ? 'Légalisation de Signature' : 'Signature Legalization'}</li>
                                                        <li>• {language === 'fr' ? 'Légalisation de Diplôme' : 'Diploma Legalization'}</li>
                                                        <li>• {language === 'fr' ? 'Légalisation d\'Autres Documents Administratifs' : 'Other Administrative Documents Legalization'}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                                    {language === 'fr' ? 'Pièces à fournir :' : 'Required Documents:'}
                                                </h3>
                                                <ol className="space-y-4">
                                                    {selectedService.documents?.map((doc, index) => (
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
                                            </div>
                                        )}
                                        
                                        {selectedService.id === 'certificat-demenagement' && (
                                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                                <p className="text-sm font-semibold text-amber-700">
                                                    {language === 'fr' 
                                                        ? 'NB : Les véhicules sont exclus'
                                                        : 'NB: Vehicles are excluded'}
                                                </p>
                                            </div>
                                        )}
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
                                        {language === 'fr' ? 'Modalités de dépôt' : 'Submission Methods'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-blue-600" />
                                                {language === 'fr' ? 'Par voie postale' : 'By Mail'}
                                            </h4>
                                            <div className="text-gray-700 space-y-1">
                                                <p>Consulat Général de Côte d'Ivoire</p>
                                                <p>800 Second Avenue, Fifth Floor</p>
                                                <p>New York, NY 10017</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <User className="h-4 w-4 text-blue-600" />
                                                {language === 'fr' ? 'En personne' : 'In Person'}
                                            </h4>
                                            <p className="text-gray-700">
                                                {language === 'fr' 
                                                    ? 'Se présenter directement au Consulat Général pour le dépôt du dossier de documents ou actes consulaires.'
                                                    : 'Present yourself directly at the Consulate General for the submission of documents or consular acts.'}
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
                                                        ? '• Le délai de traitement de la demande est de trois (03) jours après réception du dossier.'
                                                        : '• Processing time for the application is three (03) days after receiving the file.'}
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
                                        {language === 'fr' ? 'Paiement des frais' : 'Fee Payment'}
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

                        {/* Forms Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Formulaires et informations' : 'Forms and Information'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Consultez notre site officiel pour télécharger les formulaires et obtenir plus d\'informations.'
                                            : 'Visit our official website to download forms and get more information.'}
                                    </p>
                                    <div className="flex flex-col gap-4">
                                        {selectedServiceType === 'legalisations' && (
                                            <div className="text-center">
                                                <Button 
                                                    onClick={() => window.open('/assets/services-consulaires-forms/procuration-form.pdf', '_blank')}
                                                    className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105"
                                                >
                                                    <ExternalLink className="mr-3 h-5 w-5" />
                                                    {language === 'fr' ? 'Télécharger le formulaire de procuration' : 'Download Proxy Form'}
                                                </Button>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <Button 
                                                onClick={() => window.open(formLink, '_blank')}
                                                className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                            >
                                                <ExternalLink className="mr-3 h-5 w-5" />
                                                {language === 'fr' ? 'Site officiel' : 'Official Website'}
                                            </Button>
                                        </div>
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