"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, CreditCard, ExternalLink, FileText, CheckCircle, Clock, Calendar } from "lucide-react";
import { useState } from "react";

export default function CarteConsulairePage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');

    const requiredDocumentsFr = [
        "Formulaire de demande dûment rempli",
        "Copie intégrale de l'acte de naissance",
        "Photocopie du passeport ivoirien en cours de validité",
        "Justificatif de domicile récent (moins de 3 mois)",
        "2 photos d'identité récentes",
        "Attestation d'immatriculation consulaire"
    ];

    const requiredDocumentsEn = [
        "Duly completed application form",
        "Full copy of birth certificate",
        "Photocopy of valid Ivorian passport",
        "Recent proof of residence (less than 3 months)",
        "2 recent passport photos",
        "Consular registration certificate"
    ];

    return (
        <Layout currentPath="/services/carte-consulaire">
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
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-500 shadow-lg">
                                <CreditCard className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {language === 'fr' ? 'Service Carte Consulaire' : 'Consular Card Service'}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr'
                                    ? "La carte consulaire est un document d'identification délivré aux ressortissants ivoiriens résidant à l'étranger."
                                    : "The consular card is an identification document issued to Ivorian nationals residing abroad."}
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
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6">
                                    <div className="flex items-start">
                                        <AlertTriangle className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-orange-600" />
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900">IMPORTANT</h3>
                                            <div className="text-gray-700">
                                                <p>
                                                    {language === 'fr' ? (
                                                        <>
                                                            L'immatriculation consulaire est <strong>obligatoire</strong> pour tous les 
                                                            Ivoiriens résidant à l'étranger. Elle doit être renouvelée à chaque changement 
                                                            de situation (adresse, état civil, etc.).
                                                        </>
                                                    ) : (
                                                        <>
                                                            Consular registration is <strong>mandatory</strong> for all Ivorians residing 
                                                            abroad. It must be renewed with any change of situation (address, marital status, etc.).
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Required Documents */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="mb-6 text-xl font-bold text-gray-900">
                                        {language === 'fr' ? 'Documents Requis' : 'Required Documents'}
                                    </h3>
                                    <ol className="space-y-4">
                                        {(language === 'fr' ? requiredDocumentsFr : requiredDocumentsEn).map((doc, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
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

                        {/* Fees and Processing Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"
                        >
                            {/* Fees Card */}
                            <Card className="overflow-hidden border-0 bg-blue-50 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-center">
                                        <FileText className="mr-3 h-6 w-6 text-blue-600" />
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {language === 'fr' ? 'Tarifs' : 'Fees'}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-gray-700">
                                        <p>{language === 'fr' ? 'Première demande:' : 'First application:'} <strong>$50</strong></p>
                                        <p>{language === 'fr' ? 'Renouvellement:' : 'Renewal:'} <strong>$30</strong></p>
                                        <p>{language === 'fr' ? 'Duplicata (perte/vol):' : 'Duplicate (loss/theft):'} <strong>$75</strong></p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Processing Time Card */}
                            <Card className="overflow-hidden border-0 bg-purple-50 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-center">
                                        <Clock className="mr-3 h-6 w-6 text-purple-600" />
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {language === 'fr' ? 'Délais de traitement' : 'Processing time'}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 text-gray-700">
                                        <p>{language === 'fr' ? 'Normal:' : 'Normal:'} <strong>5-7 {language === 'fr' ? 'jours ouvrés' : 'business days'}</strong></p>
                                        <p>{language === 'fr' ? 'Express (+$25):' : 'Express (+$25):'} <strong>48-72 {language === 'fr' ? 'heures' : 'hours'}</strong></p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Payment Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Paiement' : 'Payment'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr'
                                            ? 'Pour effectuer le paiement des frais de carte consulaire'
                                            : 'To make the payment for consular card fees'}
                                    </p>
                                    <div className="text-center">
                                        <Button
                                            onClick={() => window.open('https://www.ci-embassyepay.org/', '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <CreditCard className="mr-3 h-5 w-5" />
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
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-8"
                        >
                            <Card className="overflow-hidden border-2 border-orange-200 bg-orange-50">
                                <CardContent className="p-6 text-center">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Prendre Rendez-vous' : 'Book an Appointment'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr'
                                            ? 'Prenez rendez-vous en ligne pour soumettre votre demande'
                                            : 'Book an appointment online to submit your application'}
                                    </p>
                                    <Button
                                        onClick={() => window.open('https://ambaciusa.org/services', '_blank')}
                                        variant="outline"
                                        className="rounded-xl border-2 border-orange-300 bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-xl"
                                    >
                                        <Calendar className="mr-2 h-5 w-5" />
                                        {language === 'fr' ? 'Système de Rendez-vous' : 'Appointment System'}
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