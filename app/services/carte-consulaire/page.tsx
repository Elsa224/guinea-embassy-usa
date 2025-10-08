"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
    AlertTriangle, 
    CreditCard, 
    ExternalLink, 
    FileText, 
    Clock,
    MapPin,
    Mail,
    User,
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

const carteConsulaireDocs = {
    fr: [
        'Justificatif de domicile aux États-Unis d\'Amérique (carte de résidence, carte d\'étudiant, permis de conduire américain, facture ou tout document faisant foi)',
        'Deux (02) photos d\'identité 4cm x 4cm (modèle Europe)',
        'Copie d\'un extrait d\'acte de naissance et d\'un certificat de nationalité ou d\'une pièce d\'identité ivoirienne valide (Carte Nationale d\'Identité, Passeport ou Attestation Administrative d\'Identité valide)',
        'Copie de l\'extrait d\'acte de naissance pour les enfants mineurs',
    ],
    en: [
        'Proof of residence in the United States of America (residence card, student card, American driver\'s license, bill or any document serving as proof)',
        'Two (02) identity photos 4cm x 4cm (European model)',
        'Copy of birth certificate extract and nationality certificate or valid Ivorian identity document (National Identity Card, Passport or valid Administrative Identity Certificate)',
        'Copy of birth certificate extract for minor children',
    ]
};

export default function CarteConsulairePage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/carte-consulaire', {
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

    const title = page?.title?.[language] || (language === 'fr' ? 'CARTE CONSULAIRE' : 'CONSULAR CARD');
    const paymentLink = page?.paymentLink || "https://www.ci-embassyepay.org/";
    const formLink = page?.formLink || "https://newyork.diplomatie.gouv.ci/";

    const documents = carteConsulaireDocs[language];

    if (loading) {
        return (
            <Layout currentPath="/services/carte-consulaire">
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
        <Layout currentPath="/services/carte-consulaire">
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
                                <CreditCard className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr'
                                    ? "Document d'identification pour les ressortissants ivoiriens résidant aux États-Unis."
                                    : "Identification document for Ivorian nationals residing in the United States."}
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

                        {/* Required Documents */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                <div className="bg-orange-500 text-white p-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <FileText className="h-6 w-6" />
                                        {language === 'fr' ? 'Pièces à fournir' : 'Required Documents'}
                                    </h2>
                                </div>
                                <CardContent className="p-8">
                                    <ol className="space-y-4">
                                        {documents.map((doc, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
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
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-purple-200 bg-purple-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                        {language === 'fr' ? 'Modalités de retrait' : 'Pickup Methods'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-purple-600" />
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
                                                <User className="h-4 w-4 text-purple-600" />
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
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-amber-200 bg-amber-50">
                                <CardContent className="p-6">
                                <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {language === 'fr' ? 'Délais de traitement' : 'Processing Time'}
                                            </h3>
                                            <div className="text-gray-700 space-y-2">
                                                <p>
                                                    {language === 'fr' 
                                                        ? <>• <span className="font-bold text-amber-700">7 jours</span> pour une demande normale et <span className="font-bold text-amber-700">24h</span> pour une demande urgente.</>
                                                        : <>• <span className="font-bold text-amber-700">7 days</span> for a normal application and <span className="font-bold text-amber-700">24h</span> for an urgent application.</>
                                                    }
                                                </p>
                                                <p>
                                                    {language === 'fr' 
                                                        ? <>• Durée de production : <span className="font-bold text-amber-700">30 à 45 jours</span> après transmission du dossier.</>
                                                        : <>• Production time: <span className="font-bold text-amber-700">30 to 45 days</span> after transmission of the file.</>
                                                    }
                                                </p>
                                                <p className="font-semibold text-amber-700">
                                                    {language === 'fr' 
                                                        ? '• Tout dossier incomplet entraînera un rejet de la demande.'
                                                        : '• Any incomplete file will result in rejection of the application.'}
                                                </p>
                                            </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Payment Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Paiement des frais' : 'Fee Payment'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez le paiement des frais de carte consulaire via notre plateforme sécurisée.'
                                            : 'Make consular card fee payment through our secure platform.'}
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
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Plateforme digitale Express54' : 'Express54 Digital Platform'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez votre demande de visa directement sur notre plateforme digitalisée pour un traitement plus rapide.'
                                            : 'Submit your visa application directly on our digitalized platform for faster processing.'}
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