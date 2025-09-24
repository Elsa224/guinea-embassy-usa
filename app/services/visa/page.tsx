"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, CreditCard, ExternalLink, FileText, Phone } from "lucide-react";

export default function VisaPage() {
    const documentsRequired = [
        "Le passeport d'une validité de six (06) mois ou plus",
        "Une photo d'identité en couleur / fond blanc",
        "La lettre d'invitation légalisée ou la confirmation de la réservation d'hôtel",
        "L'itinéraire du voyage (billet aller-retour)",
        "La copie du Carnet de vaccination contre la fièvre jaune",
        "La copie de la Green Card pour autre nationalité ou visa (exceptés visa B1 et B2)",
        "Pour l'enfant mineur : une autorisation parentale notariée pour le parent qui ne voyage pas",
        "Pour les personnes qui voyagent avec l'enfant mineur : copies du passeport et du visa ou de la Green Card",
        "La copie du reçu de paiement du visa"
    ];

    const documentsRequiredEn = [
        "The passport with a six-month validity or more",
        "One picture I.D in color with white background",
        "Legalized invitation letter or Hotel booking",
        "Flight booking itinerary",
        "Copy of the yellow fever vaccine",
        "Copy of the Green Card for non US Citizens or valid visa (Visa B1 and B2 are not accepted)",
        "For minor children : A notarized parental consent written by the parent not traveling",
        "Person traveling with the child : Copy of passport and visa or Green Card",
        "Copy of the visa payment receipt"
    ];

    return (
        <Layout currentPath="/services/visa">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 text-center"
                    >
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-2xl">
                            <FileText className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                            Service Visa
                        </h1>
                        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 to-green-600"></div>
                        <p className="mx-auto max-w-3xl text-lg text-gray-600">
                            Toutes les informations nécessaires pour votre demande de visa pour la Côte d'Ivoire
                        </p>
                    </motion.div>

                    <div className="mx-auto max-w-6xl space-y-12">
                        {/* French Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-2xl">
                                <div className="h-2 bg-gradient-to-r from-orange-500 to-green-600"></div>
                                
                                <CardHeader className="bg-gradient-to-r from-orange-50 to-green-50">
                                    <div className="flex items-center">
                                        <div className="mr-4 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                            <span className="text-lg font-bold text-orange-600">FR</span>
                                        </div>
                                        <CardTitle className="text-3xl font-bold text-gray-900">
                                            Documents à fournir pour le visa
                                        </CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8">
                                    <div className="space-y-4">
                                        {documentsRequired.map((doc, index) => (
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

                                    {/* Payment Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                        className="mt-8 rounded-2xl border-2 border-orange-200 bg-orange-50 p-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <CreditCard className="mr-3 h-6 w-6 text-orange-600" />
                                            <h3 className="text-xl font-bold text-gray-900">Paiement des frais de visa</h3>
                                        </div>
                                        <p className="mb-4 text-gray-700">
                                            Pour effectuer le paiement des frais de visa, veuillez cliquer sur le bouton ci-dessous :
                                        </p>
                                        <Button className="rounded-xl bg-orange-600 font-semibold text-white hover:bg-orange-700">
                                            <CreditCard className="mr-2 h-5 w-5" />
                                            Paiement
                                        </Button>
                                    </motion.div>

                                    {/* Important Notice */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1 }}
                                        className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
                                            <h3 className="text-xl font-bold text-gray-900">IMPORTANT</h3>
                                        </div>
                                        <div className="space-y-3 text-gray-700">
                                            <p>
                                                Les documents susmentionnés devront être ensuite téléchargés sur la 
                                                plate-forme <strong>express54.org</strong>. Après analyse des documents, 
                                                les requérants seront contactés par email afin de faire parvenir leurs passeports.
                                            </p>
                                            <div className="flex items-center rounded-lg bg-white p-4">
                                                <Phone className="mr-3 h-5 w-5 text-green-600" />
                                                <span>
                                                    Pour plus d'informations, veuillez appeler le Service Consulaire au{' '}
                                                    <strong className="text-green-600">(646) 476-7614</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* English Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-2xl">
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-green-600"></div>
                                
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                                    <div className="flex items-center">
                                        <div className="mr-4 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                            <span className="text-lg font-bold text-blue-600">EN</span>
                                        </div>
                                        <CardTitle className="text-3xl font-bold text-gray-900">
                                            Documents to provide for the visa
                                        </CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8">
                                    <div className="space-y-4">
                                        {documentsRequiredEn.map((doc, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                                className="flex items-start rounded-lg bg-blue-50/50 p-4"
                                            >
                                                <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                                                <span className="text-gray-700">{doc}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Payment Section English */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.2 }}
                                        className="mt-8 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <CreditCard className="mr-3 h-6 w-6 text-blue-600" />
                                            <h3 className="text-xl font-bold text-gray-900">Pay for visa fees</h3>
                                        </div>
                                        <p className="mb-4 text-gray-700">
                                            To pay for the visa fees, please click the button below:
                                        </p>
                                        <Button className="rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700">
                                            <CreditCard className="mr-2 h-5 w-5" />
                                            Payment
                                        </Button>
                                    </motion.div>

                                    {/* Important Notice English */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.4 }}
                                        className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
                                            <h3 className="text-xl font-bold text-gray-900">NOTE</h3>
                                        </div>
                                        <div className="space-y-3 text-gray-700">
                                            <p>
                                                The documents for the visa should be uploaded on the platform called: <strong>express54.org</strong>{' '}
                                                Upon approval, applicants will be contacted by email in order to send their 
                                                passports to the Embassy for the visa.
                                            </p>
                                            <div className="flex items-center rounded-lg bg-white p-4">
                                                <Phone className="mr-3 h-5 w-5 text-green-600" />
                                                <span>
                                                    For more information, please contact the Consular Service at{' '}
                                                    <strong className="text-green-600">(646) 476-7614</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Express54 Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-center"
                        >
                            <Card className="border-0 bg-gradient-to-r from-orange-100 to-green-100 shadow-xl">
                                <CardContent className="p-8">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                        Démarches en ligne
                                    </h3>
                                    <p className="mb-6 text-gray-600">
                                        Effectuez votre demande de visa directement sur notre plateforme digitalisée
                                    </p>
                                    <Button
                                        onClick={() => window.open('https://express54.org', '_blank')}
                                        className="rounded-xl bg-gradient-to-r from-orange-600 to-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-orange-700 hover:to-green-700 hover:shadow-xl hover:scale-105"
                                    >
                                        <ExternalLink className="mr-3 h-5 w-5" />
                                        Accéder à Express54
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