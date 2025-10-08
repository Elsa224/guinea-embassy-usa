"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
    AlertTriangle, 
    ExternalLink, 
    FileText, 
    Clock,
    MapPin,
    Mail,
    User,
    Truck,
    Users
} from "lucide-react";
import { useState } from "react";

export default function DeliveryExpressPage() {
    const [language, setLanguage] = useState<'fr' | 'en'>('fr');

    const paymentLink = "https://www.ci-embassyepay.org/";

    return (
        <Layout currentPath="/services/delivery-express">
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
                                <Truck className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">
                                {language === 'fr' ? 'DELIVERY EXPRESS' : 'DELIVERY EXPRESS'}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                {language === 'fr'
                                    ? "Service de livraison groupée pour les familles de plus d'1 personne pour réduire le coût d'envoi des documents."
                                    : "Group delivery service for families of more than 1 person to reduce document shipping costs."}
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

                        {/* Service Explanation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                                <div className="bg-orange-500 text-white p-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <Users className="h-6 w-6" />
                                        {language === 'fr' ? 'À propos du service' : 'About the service'}
                                    </h2>
                                </div>
                                <CardContent className="p-8">
                                    <div className="space-y-4">
                                        <p className="text-gray-700 text-lg leading-relaxed">
                                            {language === 'fr' 
                                                ? 'Le service Delivery Express est un moyen d\'envoi groupé spécialement conçu pour les familles de plus d\'1 personne. Ce service permet de réduire considérablement le coût d\'envoi des documents en groupant plusieurs demandes en un seul envoi.'
                                                : 'The Delivery Express service is a group shipping method specially designed for families of more than 1 person. This service significantly reduces document shipping costs by grouping multiple requests into a single shipment.'}
                                        </p>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <AlertTriangle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                                                <p className="text-blue-800 font-medium">
                                                    {language === 'fr' 
                                                        ? 'Économisez sur vos frais d\'envoi en utilisant ce service pour plusieurs membres de votre famille.'
                                                        : 'Save on your shipping costs by using this service for multiple family members.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Modalités de retrait */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-purple-200 bg-purple-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                        {language === 'fr' ? 'Modalités de retrait' : 'Pickup Methods'}
                                    </h3>
                                    
                                    {/* Certificat de Vie, Vie & Entretien, Résidence et Non-Remariage */}
                                    <div className="mb-8">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4">
                                            {language === 'fr' 
                                                ? 'Certificat de Vie, Vie & Entretien, Résidence et Non-Remariage'
                                                : 'Certificate of Life, Life & Maintenance, Residence and Non-Remarriage'}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-red-600" />
                                                    {language === 'fr' ? 'Par FedEx' : 'By FedEx'}
                                                </h5>
                                                <p className="text-red-600 font-medium">
                                                    {language === 'fr' 
                                                        ? 'Non disponible pour ce type de document'
                                                        : 'Not available for this type of document'}
                                                </p>
                                            </div>
                                            <div className="space-y-3">
                                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <User className="h-4 w-4 text-purple-600" />
                                                    {language === 'fr' ? 'En Personne' : 'In Person'}
                                                </h5>
                                                <p className="text-gray-700">
                                                    {language === 'fr' 
                                                        ? 'Sélectionnez votre date de retrait sur la plateforme Express54.'
                                                        : 'Select your pickup date on the Express54 platform.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certificat de Déménagement, Légalisations d'Actes */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-green-500 pl-4">
                                            {language === 'fr' 
                                                ? 'Certificat de Déménagement, Légalisations d\'Actes'
                                                : 'Moving Certificate, Act Legalizations'}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-purple-600" />
                                                    {language === 'fr' ? 'Par FedEx' : 'By FedEx'}
                                                </h5>
                                                <p className="text-gray-700">
                                                    {language === 'fr' 
                                                        ? 'Votre document sera livré par le moyen sécurisé FedEx disponible sur Express54.'
                                                        : 'Your document will be delivered by the secure FedEx method available on Express54.'}
                                                </p>
                                            </div>
                                            <div className="space-y-3">
                                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <User className="h-4 w-4 text-purple-600" />
                                                    {language === 'fr' ? 'En Personne' : 'In Person'}
                                                </h5>
                                                <p className="text-gray-700">
                                                    {language === 'fr' 
                                                        ? 'Sélectionnez votre date de retrait sur la plateforme Express54.'
                                                        : 'Select your pickup date on the Express54 platform.'}
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
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mb-8"
                        >
                            <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {language === 'fr' ? 'Paiement des frais' : 'Fee Payment'}
                                    </h3>
                                    <p className="mb-6 text-gray-700">
                                        {language === 'fr' 
                                            ? 'Effectuez le paiement des frais via notre plateforme sécurisée.'
                                            : 'Make fee payment through our secure platform.'}
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
                            transition={{ duration: 0.6, delay: 0.8 }}
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