"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, FileText, Phone } from "lucide-react";
import { useState } from "react";

export default function VisaPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');

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
            <div className="bg-white py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-4xl">
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
                                Service VISA
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Veuillez préparer tous les documents listés ci-dessous pour compléter votre demande de visa.
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

                        {/* Documents List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                <CardContent className="p-8">
                                    <ol className="space-y-4">
                                        {(language === 'fr' ? documentsRequired : documentsRequiredEn).map((doc, index) => (
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

                        {/* Important Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-red-200 bg-red-50">
                                <CardContent className="p-6">
                                    <div className="flex items-start">
                                        <AlertTriangle className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">IMPORTANT</h3>
                                            <div className="text-gray-700">
                                                {language === 'fr' ? (
                                                    <>
                                                        <p className="mb-3">
                                                            Les documents susmentionnés devront être ensuite téléchargés sur la plate-forme express54.org.
                                                            Après analyse des documents, les requérants seront contactés par email afin de faire parvenir leurs passeports.
                                                        </p>
                                                        <p>
                                                            Pour plus d'informations, veuillez appeler le Service Consulaire au{' '}
                                                            <a href="tel:+16464767614" className="font-bold text-green-600 hover:underline">
                                                                <Phone className="inline-block h-4 w-4 mr-1" />
                                                                (646) 476-7614
                                                            </a>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="mb-3">
                                                            The documents for the visa should be uploaded on the platform called: express54.org
                                                            Upon approval, applicants will be contacted by email in order to send their passports to the Embassy for the visa.
                                                        </p>
                                                        <p>
                                                            For more information, please contact the Consular Service at{' '}
                                                            <a href="tel:+16464767614" className="font-bold text-green-600 hover:underline">
                                                                <Phone className="inline-block h-4 w-4 mr-1" />
                                                                (646) 476-7614
                                                            </a>
                                                        </p>
                                                    </>
                                                )}
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
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Paiement' : 'Payment'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Le traitement de votre demande commencera après réception du paiement et de tous les documents requis.'
                                            : 'Processing of your application will begin after receipt of payment and all required documents.'}
                                    </p>
                                    <div className="text-center">
                                        <Button
                                            onClick={() => window.open('https://express54.org', '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            {language === 'fr' ? 'Procéder au paiement' : 'Proceed to payment'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Online Services Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Démarches en ligne' : 'Online procedures'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez votre demande de visa directement sur notre plateforme digitalisée'
                                            : 'Submit your visa application directly on our digitalized platform'}
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