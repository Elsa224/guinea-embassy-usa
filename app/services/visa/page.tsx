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
    Phone, 
    Users, 
    User, 
    Shield, 
    Clock,
    MapPin,
    Mail
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

const visaTypes = {
    fr: [
        {
            id: 'ordinaire',
            title: 'Visa pour un Passeport Ordinaire',
            icon: User,
            color: 'bg-blue-500',
            documents: [
                'Formulaire de demande de visa dûment rempli et signé',
                'Passeport d\'une validité d\'au moins six (06) mois',
                'Photo Format Passeport',
                'Lettre d\'invitation légalisée en Côte d\'Ivoire (ou photocopie couleur) ou une réservation d\'hôtel',
                'Copie du billet d\'avion',
                'Copie du carnet de vaccination contre la Fièvre Jaune',
                'Copie du reçu de paiement des frais de visa'
            ]
        },
        {
            id: 'mineur',
            title: 'Visa Ordinaire pour les Mineurs',
            icon: Users,
            color: 'bg-green-500',
            documents: [
                'Formulaire de demande de visa dûment rempli et signé',
                'Passeport d\'une validité d\'au moins six (06) mois',
                'Photo Format Passeport',
                'Lettre d\'invitation légalisée en Côte d\'Ivoire (ou photocopie couleur) ou une réservation d\'hôtel',
                'Copie du billet d\'avion',
                'Copie du carnet de vaccination contre la Fièvre Jaune',
                'Copie du reçu de paiement des frais de visa',
                'Copie de l\'extrait de naissance de l\'enfant mineur',
                'Copie de l\'autorisation parentale assermentée ou légalisée du parent absent, par une autorité américaine compétente (cas où l\'enfant est accompagné par un des parents)',
                'Copie de l\'autorisation parentale assermentée ou légalisée des deux parents, par une autorité américaine compétente (cas où l\'enfant est accompagné par une tierce personne)'
            ]
        },
        {
            id: 'officiel',
            title: 'Visa pour un Passeport Officiel (Diplomatique ou de Service)',
            icon: Shield,
            color: 'bg-purple-500',
            documents: [
                'Note verbale (originale) et copie de l\'ordre de mission',
                'Formulaire de demande de visa dûment rempli et signé',
                'Photo Format Passeport',
                'Passeport officiel d\'une validité d\'au moins six (06) mois',
                'Copie du carnet de vaccination contre la Fièvre Jaune'
            ]
        }
    ],
    en: [
        {
            id: 'ordinaire',
            title: 'Visa for Ordinary Passport',
            icon: User,
            color: 'bg-blue-500',
            documents: [
                'Duly completed and signed visa application form',
                'Passport with at least six (06) months validity',
                'Photo Format Passeport',
                'Legalized invitation letter from Côte d\'Ivoire (or color photocopy) or hotel reservation',
                'Copy of flight ticket',
                'Copy of Yellow Fever vaccination certificate',
                'Copy of visa fee payment receipt'
            ]
        },
        {
            id: 'mineur',
            title: 'Ordinary Visa for Minors',
            icon: Users,
            color: 'bg-green-500',
            documents: [
                'Duly completed and signed visa application form',
                'Passport with at least six (06) months validity',
                'Photo Format Passeport',
                'Legalized invitation letter from Côte d\'Ivoire (or color photocopy) or hotel reservation',
                'Copy of flight ticket',
                'Copy of Yellow Fever vaccination certificate',
                'Copy of visa fee payment receipt',
                'Copy of minor child\'s birth certificate',
                'Copy of sworn or legalized parental authorization from absent parent, by competent American authority (when child is accompanied by one parent)',
                'Copy of sworn or legalized parental authorization from both parents, by competent American authority (when child is accompanied by third party)'
            ]
        },
        {
            id: 'officiel',
            title: 'Visa for Official Passport (Diplomatic or Service)',
            icon: Shield,
            color: 'bg-purple-500',
            documents: [
                'Verbal note (original) and copy of mission order',
                'Duly completed and signed visa application form',
                'Photo Format Passeport',
                'Official passport with at least six (06) months validity',
                'Copy of Yellow Fever vaccination certificate'
            ]
        }
    ]
};

export default function VisaPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVisaType, setSelectedVisaType] = useState('ordinaire');

    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        try {
            const response = await fetch('/api/pages/services/visa', {
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

    const title = page?.title?.[language] || (language === 'fr' ? 'VISAS' : 'VISAS');
    const paymentLink = page?.paymentLink || "https://www.ci-embassyepay.org";
    const formLink = page?.formLink || "https://www.express54.org";

    const currentVisaTypes = visaTypes[language];
    const selectedType = currentVisaTypes.find(type => type.id === selectedVisaType);

    if (loading) {
        return (
            <Layout currentPath="/services/visa">
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
        <Layout currentPath="/services/visa">
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
                                    ? 'Choisissez le type de visa correspondant à votre situation et consultez les documents requis.'
                                    : 'Choose the visa type that corresponds to your situation and consult the required documents.'}
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

                        {/* Visa Type Selector */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'fr' ? 'Types de Visa' : 'Visa Types'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {currentVisaTypes.map((type, index) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <motion.div
                                            key={type.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        >
                                            <Card 
                                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                                    selectedVisaType === type.id 
                                                        ? 'ring-2 ring-orange-500 shadow-lg' 
                                                        : 'hover:shadow-md'
                                                }`}
                                                onClick={() => setSelectedVisaType(type.id)}
                                            >
                                                <CardContent className="p-6 text-center">
                                                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${type.color} shadow-lg`}>
                                                        <IconComponent className="h-6 w-6 text-white" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {type.title}
                                                    </h3>
                                                    <Badge 
                                                        variant={selectedVisaType === type.id ? "default" : "outline"}
                                                        className="text-xs"
                                                    >
                                                        {selectedVisaType === type.id 
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

                        {/* Selected Visa Documents */}
                        {selectedType && (
                            <motion.div
                                key={selectedVisaType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-8"
                            >
                                <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                    <CardHeader className="bg-orange-500 text-white">
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
                                                        ? '• 7 jours pour une demande normale et 24h pour une demande urgente.'
                                                        : '• 7 days for a normal application and 24h for an urgent application.'}
                                                </p>
                                                <p className="font-semibold text-amber-700">
                                                    {language === 'fr' 
                                                        ? '• Tout dossier incomplet entraînera un refus de la demande.'
                                                        : '• Any incomplete file will result in refusal of the application.'}
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
                                        {language === 'fr' ? 'Paiement des frais de visa' : 'Visa Fee Payment'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Utiliser la plateforme sécurisée ci-dessous et téléverser le reçu de paiement en format PDF sur la plateforme Express54.'
                                            : 'Use the secure platform below and upload the payment receipt in PDF format on the Express54 platform.'}
                                    </p>
                                    <div className="text-center">
                                        <Button
                                            onClick={() => window.open(paymentLink, '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Payer les frais de visa' : 'Pay Visa Fees'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Online Services Section - Step 8 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Plateforme digitale Express54' : 'Step 8 - Express54 Digital Platform'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Soumettre votre demande sur www.express54.org ou télécharger l\'application mobile Express54.'
                                            : 'Submit your application on www.express54.org or download the Express54 mobile application.'}
                                    </p>
                                    <div className="text-center">
                                        <Button 
                                            onClick={() => window.open(formLink, '_blank')}
                                            className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            www.express54.org
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Modalités de retrait */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.5 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-purple-200 bg-purple-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Modalités de retrait' : 'Pickup Procedures'}
                                    </h3>
                                    <div className="space-y-4 text-gray-700">
                                        {language === 'fr' ? (
                                            <div>
                                                <h4 className="font-semibold mb-2">Français:</h4>
                                                <p>
                                                    Les documents susmentionnés devront être ensuite téléchargés sur la plate-forme{' '}
                                                    <a href="https://www.express54.org" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                                                        www.express54.org
                                                    </a>
                                                    . Après analyse des documents, les requérants seront contactés par email afin de faire parvenir leurs passeports. Pour plus d'informations, veuillez appeler le Service Consulaire au (646) 476-7614.
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="font-semibold mb-2">English:</h4>
                                                <p>
                                                    The documents for the visa should be uploaded on the platform called:{' '}
                                                    <a href="https://www.express54.org" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                                                        www.express54.org
                                                    </a>
                                                    . Upon approval, applicants will be contacted by email in order to send their passports to the Embassy for the visa. For more information, please contact the Consular Service at (646) 476-7614.
                                                </p>
                                            </div>
                                        )}
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