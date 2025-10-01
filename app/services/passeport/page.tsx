"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, BookOpen, ExternalLink, Mail } from "lucide-react";
import { useState } from "react";

export default function PasseportPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');

    return (
        <Layout currentPath="/services/passeport">
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
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                Service Passeport
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

                        {/* Carte Consulaire Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-0 bg-orange-50 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-start">
                                        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                                            <span className="text-2xl font-bold text-orange-600">!</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-3 text-xl font-bold text-gray-900">
                                                {language === 'fr' 
                                                    ? 'Informations pour la carte consulaire'
                                                    : 'Information for consular card'}
                                            </h3>
                                            <p className="mb-4 text-gray-700">
                                                {language === 'fr'
                                                    ? 'Pour les informations à fournir pour la carte consulaire, consultez le document officiel :'
                                                    : 'For information to provide for the consular card, consult the official document:'}
                                            </p>
                                            <Button
                                                variant="link"
                                                className="p-0 text-orange-600 hover:text-orange-700"
                                                onClick={() => window.open('https://ambaciusa.org/images/repository/docs/CARTE%20CONSULAIRE.pdf', '_blank')}
                                            >
                                                {language === 'fr' ? 'Télécharger le guide pdf' : 'Download the pdf guide'}
                                            </Button>
                                            
                                            <div className="mt-6">
                                                <h4 className="mb-2 font-semibold text-gray-900">
                                                    {language === 'fr' ? 'Paiement de la carte consulaire' : 'Payment for consular card'}
                                                </h4>
                                                <p className="mb-4 text-gray-700">
                                                    {language === 'fr'
                                                        ? 'Pour effectuer le paiement des frais de $10.00 pour la carte consulaire'
                                                        : 'To make the payment of $10.00 for the consular card'}
                                                </p>
                                                <Button
                                                    onClick={() => window.open('https://express54.org', '_blank')}
                                                    className="rounded-xl bg-green-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
                                                >
                                                    {language === 'fr' ? 'Procéder au paiement' : 'Proceed to payment'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Important Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Card className="overflow-hidden border-2 border-red-200 bg-red-50">
                                <CardContent className="p-6">
                                    <div className="flex items-start">
                                        <AlertTriangle className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-red-600">
                                                {language === 'fr' ? 'IMPORTANT - Envoi postal' : 'IMPORTANT - Postal delivery'}
                                            </h3>
                                            <div className="text-gray-700">
                                                <p>
                                                    {language === 'fr' ? (
                                                        <>
                                                            N'oubliez pas : Vous devez vous munir d'une enveloppe prépayée de la poste{' '}
                                                            <strong>USPS Priority Mail</strong> pour le retour de votre passeport.
                                                        </>
                                                    ) : (
                                                        <>
                                                            Don't forget: You must provide a prepaid envelope from{' '}
                                                            <strong>USPS Priority Mail</strong> for the return of your passport.
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Online Services Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-12"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-center text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Démarches en ligne' : 'Online procedures'}
                                    </h3>
                                    <p className="mb-6 text-center text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez vos paiements et téléchargez vos formulaires sur les plateformes officielles'
                                            : 'Make your payments and download your forms on official platforms'}
                                    </p>
                                    
                                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                        <Button
                                            onClick={() => window.open('https://monpasseport.ci', '_blank')}
                                            variant="outline"
                                            className="rounded-xl border-2 border-orange-300 bg-white px-6 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-xl"
                                        >
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            monpasseport.ci
                                        </Button>
                                        
                                        <Button
                                            onClick={() => window.open('https://www.ci-embassyepay.org/', '_blank')}
                                            variant="outline"
                                            className="rounded-xl border-2 border-orange-300 bg-white px-6 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-xl"
                                        >
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            ci-embassyepay.org
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