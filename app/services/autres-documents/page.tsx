"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, Heart, Home, Plane, Users } from "lucide-react";

export default function AutresDocumentsPage() {
    const documents = [
        {
            title: "TRANSCRIPTION NAISSANCE",
            description: "Documents requis pour la transcription d'acte de naissance",
            icon: <Users className="h-8 w-8" />,
            url: "https://ambaciusa.org/images/repository/docs/Transcription2024.pdf",
            color: "blue-500",
            bgColor: "bg-blue-50"
        },
        {
            title: "TRANSCRIPTION MARIAGE",
            description: "Pièces à fournir pour la transcription d'acte de mariage",
            icon: <Heart className="h-8 w-8" />,
            url: "https://ambaciusa.org/images/repository/docs/MARIAGE%202024.pdf",
            color: "pink-500",
            bgColor: "bg-pink-50"
        },
        {
            title: "LAISSEZ-PASSER",
            description: "Procédure pour l'obtention d'un laissez-passer",
            icon: <Plane className="h-8 w-8" />,
            url: "https://ambaciusa.org/images/repository/docs/LAISSEZ-PASSER.pdf",
            color: "green-500",
            bgColor: "bg-green-50"
        },
        {
            title: "CERTIFICAT DE VIE et NON REMARIAGE",
            description: "Informations pour les certificats CNPS-CGRAE",
            icon: <FileText className="h-8 w-8" />,
            url: "https://ambaciusa.org/images/repository/docs/cnps-cgrae-infos.pdf",
            color: "orange-500",
            bgColor: "bg-orange-50"
        },
        {
            title: "TRANSFERT DE CORPS (Remains shipping)",
            description: "Procédures pour le rapatriement de dépouilles mortelles",
            icon: <Home className="h-8 w-8" />,
            url: "https://ambaciusa.org/images/repository/docs/D%C3%A9c%C3%A8s%20-%20remains%20shipping.pdf",
            color: "purple-500",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <Layout currentPath="/services/autres-documents">
            <div className="bg-purple-50 py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 text-center"
                    >
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500 shadow-2xl">
                            <FileText className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                            Autres Documents
                        </h1>
                        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-purple-500"></div>
                        <p className="mx-auto max-w-3xl text-lg text-gray-600">
                            Liste des documents administratifs à télécharger pour vos démarches consulaires
                        </p>
                    </motion.div>

                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-12"
                    >
                        <Card className="border-0 bg-gray-50 shadow-xl">
                            <CardContent className="p-8 text-center">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                    Documents à télécharger
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Veuillez cliquer sur les documents ci-dessous pour télécharger les formulaires 
                                    et consulter les informations nécessaires pour vos démarches.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Documents Grid */}
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {documents.map((doc, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                >
                                    <Card className="group h-full overflow-hidden border-0 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                        <div className={`h-2 bg-${doc.color}`}></div>
                                        
                                        <CardHeader className={`${doc.bgColor} pb-6`}>
                                            <div className="flex justify-center mb-4">
                                                <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg text-gray-700 group-hover:scale-110 transition-transform duration-300`}>
                                                    {doc.icon}
                                                </div>
                                            </div>
                                            <CardTitle className="text-center text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                {doc.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="p-6">
                                            <p className="mb-6 text-center text-gray-600 leading-relaxed">
                                                {doc.description}
                                            </p>
                                            
                                            <Button
                                                onClick={() => window.open(doc.url, '_blank')}
                                                className={`w-full rounded-xl bg-${doc.color} font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
                                            >
                                                <Download className="mr-2 h-5 w-5" />
                                                Télécharger PDF
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-16"
                    >
                        <Card className="border-0 bg-orange-50 shadow-xl">
                            <CardContent className="p-8">
                                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                                    Informations Importantes
                                </h3>
                                
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="rounded-2xl bg-white/70 p-6 shadow-lg">
                                        <h4 className="mb-4 font-bold text-gray-900 text-lg">📋 Instructions</h4>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Téléchargez et imprimez les formulaires requis</li>
                                            <li>• Remplissez tous les champs demandés</li>
                                            <li>• Rassemblez toutes les pièces justificatives</li>
                                            <li>• Vérifiez la liste des documents avant soumission</li>
                                        </ul>
                                    </div>

                                    <div className="rounded-2xl bg-white/70 p-6 shadow-lg">
                                        <h4 className="mb-4 font-bold text-gray-900 text-lg">📞 Contact</h4>
                                        <div className="space-y-3 text-gray-700">
                                            <p>Pour toute question concernant ces documents :</p>
                                            <div className="flex items-center">
                                                <span className="font-semibold">Téléphone:</span>
                                                <span className="ml-2 font-bold text-green-600">(646) 476-7614</span>
                                            </div>
                                            <p className="text-sm">Service Consulaire - New York</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* External Link to Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-12 text-center"
                    >
                        <Card className="border-0 bg-blue-100 shadow-xl">
                            <CardContent className="p-8">
                                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                    Services Consulaires Complets
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    Pour accéder à l'ensemble de nos services consulaires et obtenir plus d'informations
                                </p>
                                <Button
                                    onClick={() => window.open('https://ambaciusa.org/services', '_blank')}
                                    className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105"
                                >
                                    <ExternalLink className="mr-3 h-5 w-5" />
                                    Consulter ambaciusa.org/services
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}