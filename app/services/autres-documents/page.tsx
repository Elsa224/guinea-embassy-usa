"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function AutresDocumentsPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');

    const documents = [
        {
            titleFr: "Transcription Naissance",
            titleEn: "Birth Transcription",
            url: "https://ambaciusa.org/images/repository/docs/Transcription2024.pdf"
        },
        {
            titleFr: "Transcription Mariage",
            titleEn: "Marriage Transcription",
            url: "https://ambaciusa.org/images/repository/docs/MARIAGE%202024.pdf"
        },
        {
            titleFr: "Laissez-passer",
            titleEn: "Laissez-passer",
            url: "https://ambaciusa.org/images/repository/docs/LAISSEZ-PASSER.pdf"
        },
        {
            titleFr: "Certificat de vie",
            titleEn: "Life Certificate",
            url: "https://ambaciusa.org/images/repository/docs/cnps-cgrae-infos.pdf"
        },
        {
            titleFr: "Transfert de corps",
            titleEn: "Remains Shipping",
            url: "https://ambaciusa.org/images/repository/docs/D%C3%A9c%C3%A8s%20-%20remains%20shipping.pdf"
        },
        {
            titleFr: "Autres documents",
            titleEn: "Other documents",
            url: "#"
        }
    ];

    const instructions = {
        fr: [
            "Téléchargez et imprimez les formulaires requis",
            "Remplissez tous les champs demandés",
            "Rassemblez toutes les pièces justificatives", 
            "Vérifiez la liste des documents avant soumission"
        ],
        en: [
            "Download and print the required forms",
            "Fill in all required fields",
            "Gather all supporting documents",
            "Check the list of documents before submission"
        ]
    };

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
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {language === 'fr' ? 'Autres Documents' : 'Other Documents'}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr' 
                                    ? 'Liste des documents administratifs à télécharger pour vos démarches consulaires'
                                    : 'List of administrative documents to download for your consular procedures'}
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

                        {/* Information Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-12"
                        >
                            <Card className="overflow-hidden border-0 bg-green-50 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-start">
                                        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className="text-2xl">ℹ️</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-700">
                                                {language === 'fr'
                                                    ? 'Veuillez cliquer sur les documents ci-dessous pour télécharger les formulaires et consulter les informations nécessaires pour vos démarches.'
                                                    : 'Please click on the documents below to download the forms and consult the information needed for your procedures.'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Documents Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {documents.map((doc, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    >
                                        <Card 
                                            className="group h-full cursor-pointer overflow-hidden border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
                                            onClick={() => doc.url !== '#' && window.open(doc.url, '_blank')}
                                        >
                                            <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                                                    <FileText className="h-8 w-8 text-gray-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {language === 'fr' ? doc.titleFr : doc.titleEn}
                                                </h3>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Instructions and Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
                        >
                            {/* Instructions */}
                            <Card className="border-0 bg-gray-50 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
                                        <span className="mr-2">📋</span>
                                        {language === 'fr' ? 'Instructions' : 'Instructions'}
                                    </h3>
                                    <ul className="space-y-2">
                                        {instructions[language].map((instruction, index) => (
                                            <li key={index} className="flex items-start text-gray-700">
                                                <span className="mr-2">•</span>
                                                <span>{instruction}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Contact */}
                            <Card className="border-0 bg-gray-50 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
                                        <span className="mr-2">📞</span>
                                        Contact
                                    </h3>
                                    <p className="mb-3 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Pour toute question concernant ces documents :'
                                            : 'For any questions regarding these documents:'}
                                    </p>
                                    <p className="text-gray-700">
                                        {language === 'fr' ? 'Téléphone:' : 'Phone:'}{' '}
                                        <span className="font-semibold text-green-600">(646) 476-7614</span>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {language === 'fr' 
                                            ? 'Service Consulaire - New York'
                                            : 'Consular Service - New York'}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* External Services Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="mt-12"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6 text-center">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' 
                                            ? 'Services Consulaires Complets'
                                            : 'Complete Consular Services'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Pour accéder à l\'ensemble de nos services consulaires et obtenir plus d\'informations'
                                            : 'To access all of our consular services and get more information'}
                                    </p>
                                    <Button
                                        onClick={() => window.open('https://ambaciusa.org/services', '_blank')}
                                        variant="outline"
                                        className="rounded-xl border-2 border-orange-300 bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-xl"
                                    >
                                        <ExternalLink className="mr-2 h-5 w-5" />
                                        ambaciusa.org/services
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}