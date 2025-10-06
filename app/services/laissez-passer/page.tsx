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
    Plane,
    AlertCircle,
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

const eligibilityConditions = {
    fr: [
        {
            id: 'de-passage',
            title: 'De passage et dépourvus de titre de voyage',
            description: 'En cas de perte ou de vol de passeport',
            icon: AlertTriangle,
            color: 'bg-red-500'
        },
        {
            id: 'situation-irreguliere',
            title: 'En situation irrégulière',
            description: 'Sur réquisition des autorités locales',
            icon: AlertCircle,
            color: 'bg-orange-500'
        },
        {
            id: 'passeport-expire',
            title: 'Passeport expiré depuis six mois au plus',
            description: 'Pour des raisons impérieuses et particulières (décès d\'un ascendant ou descendant)',
            icon: Plane,
            color: 'bg-blue-500'
        }
    ],
    en: [
        {
            id: 'de-passage',
            title: 'In transit and without travel document',
            description: 'In case of loss or theft of passport',
            icon: AlertTriangle,
            color: 'bg-red-500'
        },
        {
            id: 'situation-irreguliere',
            title: 'In irregular situation',
            description: 'Upon requisition of local authorities',
            icon: AlertCircle,
            color: 'bg-orange-500'
        },
        {
            id: 'passeport-expire',
            title: 'Passport expired for six months or less',
            description: 'For compelling and particular reasons (death of an ascendant or descendant)',
            icon: Plane,
            color: 'bg-blue-500'
        }
    ]
};

const requiredDocuments = {
    fr: [
        'Déclaration ou certificat de perte ou de vol délivré par les autorités américaines (pour les Ivoiriens de passage)',
        'Formulaire de demande de laissez-passer dûment renseigné et signé',
        'Copie de tout document prouvant votre identité et votre nationalité (carte d\'identité nationale, carte consulaire, acte de naissance)',
        'Copie ou réservation de billet d\'avion',
        'Deux (02) photos d\'identité récentes',
        'Acte de décès du parent en ligne directe accompagné de l\'acte de naissance du demandeur (en cas de décès)',
        'Paiement des droits de chancellerie (80 dollars)'
    ],
    en: [
        'Declaration or certificate of loss or theft issued by American authorities (for Ivorians in transit)',
        'Laissez-passer application form duly completed and signed',
        'Copy of any document proving your identity and nationality (national identity card, consular card, birth certificate)',
        'Copy or reservation of airline ticket',
        'Two (02) recent identity photos',
        'Death certificate of direct line parent accompanied by applicant\'s birth certificate (in case of death)',
        'Payment of chancellery fees (80 dollars)'
    ]
};

export default function LaissezPasserPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/laissez-passer', {
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

    const title = page?.title?.[language] || (language === 'fr' ? 'LAISSEZ-PASSER' : 'TRAVEL PERMIT');
    const paymentLink = page?.paymentLink || "https://www.ci-embassyepay.org/";
    const formLink = page?.formLink || "https://newyork.diplomatie.gouv.ci/";

    const currentConditions = eligibilityConditions[language];
    const currentDocuments = requiredDocuments[language];

    if (loading) {
        return (
            <Layout currentPath="/services/laissez-passer">
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
        <Layout currentPath="/services/laissez-passer">
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
                                <Plane className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr'
                                    ? "Titre exceptionnel de voyage pour permettre aux Ivoiriens de regagner la Côte d'Ivoire."
                                    : "Exceptional travel document to allow Ivorians to return to Côte d'Ivoire."}
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

                        {/* Important Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-red-200 bg-red-50">
                                <CardContent className="p-6">
                                    <div className="flex items-start">
                                        <AlertTriangle className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
                                        <div>
                                            <h3 className="text-lg font-bold text-red-900 mb-2">
                                                {language === 'fr' ? 'IMPORTANT' : 'IMPORTANT'}
                                            </h3>
                                            <p className="text-red-800">
                                                {language === 'fr'
                                                    ? "Le laissez-passer est un titre exceptionnel de voyage délivré par les autorités consulaires d'un poste diplomatique ou consulaire pour permettre aux Ivoiriens de regagner la Côte d'Ivoire."
                                                    : "The travel permit is an exceptional travel document issued by consular authorities of a diplomatic or consular post to allow Ivorians to return to Côte d'Ivoire."}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Eligibility Conditions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'fr' ? 'Conditions d\'éligibilité' : 'Eligibility Conditions'}
                            </h2>
                            <p className="text-gray-700 mb-6">
                                {language === 'fr' 
                                    ? 'Ce document ne concerne que les Ivoiriens qui sont :'
                                    : 'This document only concerns Ivorians who are:'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {currentConditions.map((condition, index) => {
                                    const IconComponent = condition.icon;
                                    return (
                                        <motion.div
                                            key={condition.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        >
                                            <Card className="h-full">
                                                <CardContent className="p-6 text-center">
                                                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${condition.color} shadow-lg`}>
                                                        <IconComponent className="h-6 w-6 text-white" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {condition.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {condition.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Required Documents */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                                    <CardTitle className="flex items-center gap-3">
                                        <FileText className="h-6 w-6" />
                                        {language === 'fr' ? 'Pièces à fournir' : 'Required Documents'}
                                        <Badge variant="secondary" className="bg-white text-gray-800">
                                            $80
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <ol className="space-y-4">
                                        {currentDocuments.map((doc, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
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

                        {/* Submission Methods */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
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
                            transition={{ duration: 0.6, delay: 1.1 }}
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
                            transition={{ duration: 0.6, delay: 1.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Paiement des droits de chancellerie ($80)' : 'Chancellery Fee Payment ($80)'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez le paiement des droits de chancellerie via notre plateforme sécurisée.'
                                            : 'Make chancellery fee payment through our secure platform.'}
                                    </p>
                                    <div className="text-center">
                                        <Button
                                            onClick={() => window.open(paymentLink, '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Payer les frais ($80)' : 'Pay Fees ($80)'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Forms Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.5 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Formulaires et informations' : 'Forms and Information'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Téléchargez le formulaire de demande de laissez-passer et consultez les informations détaillées.'
                                            : 'Download the travel permit application form and consult detailed information.'}
                                    </p>
                                    <div className="text-center">
                                        <Button 
                                            onClick={() => window.open('/assets/services-consulaires-forms/laissez-passer-form.pdf', '_blank')}
                                            className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Télécharger le formulaire' : 'Download Form'}
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