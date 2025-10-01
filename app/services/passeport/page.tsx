"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, CreditCard, ExternalLink, Mail, RefreshCw } from "lucide-react";

export default function PasseportPage() {
    const firstPassportDocs = [
        "L'original du Certificat de nationalité",
        "L'original de l'Extrait d'acte de naissance sans délai de validité",
        "La photocopie de la CNI de l'un des parents sans délai de validité",
        "Deux photos d'identité",
        "Se munir de son ancien Passeport, en cas de perte, une copie de la déclaration de perte \"Police report\"",
        "Copie de la CNI ou la Carte Consulaire",
        "Une attestation de paiement : Cliquez https://monpasseport.ci",
        "Formulaire à imprimer au même moment que l'attestation de paiement",
        // "Une autorisation parentale légalisée, pour les mineurs",
        "La copie de l'Acte de mariage pour les femmes mariées voulant porter le nom de l'époux",
        // "Se munir d'une enveloppe prépayée de la poste USPS Priority Mail"
    ];

    const renewalDocs = [
        "Une attestation de paiement : Cliquez https://monpasseport.ci",
        "Formulaire à imprimer au même moment que l'attestation de paiement",
        "Copie de la CNI ou la Carte Consulaire",
        "Deux photos d'identité",
        // "Une autorisation parentale légalisée, pour les mineurs",
        "La copie de l'Acte de mariage pour les femmes mariées voulant porter le nom de l'époux",
        "Se munir de son ancien Passeport, en cas de perte, une copie de la déclaration de perte \"Police report\"",
        // "Se munir d'une enveloppe prépayée de la poste USPS Priority Mail"
    ];

    return (
        <Layout currentPath="/services/passeport">
            <div className="bg-green-50 py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 text-center"
                    >
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-2xl">
                            <BookOpen className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                            Passeport Biométrique
                        </h1>
                        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-green-500"></div>
                        <p className="mx-auto max-w-3xl text-lg text-gray-600">
                            Demande de premier passeport et renouvellement - Toutes les pièces justificatives requises
                        </p>
                    </motion.div>

                    <div className="mx-auto max-w-6xl space-y-12">
                        {/* First Passport Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-2xl">
                                <div className="h-2 bg-green-500"></div>
                                
                                <CardHeader className="bg-green-50">
                                    <div className="flex items-center">
                                        <div className="mr-4 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                            <BookOpen className="h-6 w-6 text-green-600" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold text-gray-900">
                                            Demande d'un Premier Passeport Biométrique
                                        </CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8">
                                    <h3 className="mb-6 text-xl font-bold text-gray-900">PIÈCES À FOURNIR :</h3>
                                    <div className="space-y-4">
                                        {firstPassportDocs.map((doc, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                                className="flex items-start rounded-lg bg-green-50/50 p-4"
                                            >
                                                <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                                                <span className="text-gray-700">{doc}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Renewal Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-2xl">
                                <div className="h-2 bg-blue-500"></div>
                                
                                <CardHeader className="bg-blue-50">
                                    <div className="flex items-center">
                                        <div className="mr-4 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                            <RefreshCw className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold text-gray-900">
                                            Renouvellement Passeport Biométrique
                                        </CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8">
                                    <h3 className="mb-6 text-xl font-bold text-gray-900">PIÈCES À FOURNIR :</h3>
                                    <div className="space-y-4">
                                        {renewalDocs.map((doc, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                                className="flex items-start rounded-lg bg-blue-50/50 p-4"
                                            >
                                                <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                                                <span className="text-gray-700">{doc}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Carte Consulaire Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-2xl">
                                <div className="h-2 bg-orange-500"></div>
                                
                                <CardHeader className="bg-orange-50">
                                    <div className="flex items-center">
                                        <div className="mr-4 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                            <CreditCard className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold text-gray-900">
                                            Informations pour la Carte Consulaire
                                        </CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="rounded-2xl bg-orange-50/50 p-6">
                                            <p className="mb-4 text-lg text-gray-700">
                                                Pour les informations à fournir pour la carte consulaire, consultez le document officiel :
                                            </p>
                                            <Button
                                                onClick={() => window.open('https://ambaciusa.org/images/repository/docs/CARTE%20CONSULAIRE.pdf', '_blank')}
                                                className="rounded-xl bg-orange-600 font-semibold text-white hover:bg-orange-700"
                                            >
                                                <ExternalLink className="mr-2 h-5 w-5" />
                                                Télécharger le guide (PDF)
                                            </Button>
                                        </div>

                                        <div className="rounded-2xl bg-green-50/50 p-6">
                                            <h4 className="mb-4 text-xl font-bold text-gray-900">Paiement de la carte consulaire</h4>
                                            <p className="mb-4 text-gray-700">
                                                Pour effectuer le paiement des frais de <strong>$10.00</strong> pour la carte consulaire :
                                            </p>
                                            <Button
                                                onClick={() => window.open('https://www.ci-embassyepay.org/', '_blank')}
                                                className="rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700"
                                            >
                                                <CreditCard className="mr-2 h-5 w-5" />
                                                Paiement en ligne
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Payment Links */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <Card className="border-0 bg-green-100 shadow-xl">
                                <CardContent className="p-8 text-center">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                        Démarches Officielles
                                    </h3>
                                    <p className="mb-6 text-gray-600">
                                        Effectuez vos paiements et téléchargez vos formulaires sur les plateformes officielles
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button
                                            onClick={() => window.open('https://monpasseport.ci', '_blank')}
                                            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
                                        >
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            monpasseport.ci
                                        </Button>
                                        <Button
                                            onClick={() => window.open('https://www.ci-embassyepay.org/', '_blank')}
                                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                                        >
                                            <CreditCard className="mr-2 h-5 w-5" />
                                            ci-embassyepay.org
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div> */}

                        {/* Shipping Notice */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-6"
                        >
                            <div className="flex items-center mb-4">
                                <Mail className="mr-3 h-6 w-6 text-orange-600" />
                                <h3 className="text-xl font-bold text-gray-900">Important - Envoi postal</h3>
                            </div>
                            <p className="text-gray-700">
                                <strong>N'oubliez pas :</strong> Vous devez vous munir d'une enveloppe prépayée de la poste{' '}
                                <span className="font-bold text-orange-600">USPS Priority Mail</span> pour le retour de votre passeport.
                            </p>
                        </motion.div> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
}