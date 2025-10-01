"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Clock,
    DollarSign,
    CheckCircle,
    AlertCircle,
    Download,
    CreditCard,
    Users,
    Calendar,
    Info,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

export default function CarteConsulairePage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const requiredDocuments = [
        {
            category: "Première demande",
            items: [
                "Formulaire de demande dûment rempli",
                "Copie intégrale de l'acte de naissance",
                "Photocopie du passeport ivoirien en cours de validité",
                "Justificatif de domicile récent (moins de 3 mois)",
                "2 photos d'identité récentes",
                "Attestation d'immatriculation consulaire",
            ],
        },
        {
            category: "Renouvellement",
            items: [
                "Formulaire de demande de renouvellement",
                "Ancienne carte consulaire",
                "Photocopie du passeport ivoirien en cours de validité",
                "Justificatif de domicile récent",
                "2 photos d'identité récentes",
            ],
        },
        {
            category: "En cas de perte ou vol",
            items: [
                "Déclaration de perte ou vol",
                "Formulaire de demande",
                "Photocopie du passeport ivoirien",
                "Justificatif de domicile récent",
                "2 photos d'identité récentes",
                "Attestation d'immatriculation consulaire",
            ],
        },
    ];

    const fees = [
        {
            type: "Première demande",
            amount: "$50",
            processing: "5-7 jours ouvrés",
        },
        {
            type: "Renouvellement",
            amount: "$30",
            processing: "3-5 jours ouvrés",
        },
        {
            type: "Duplicata (perte/vol)",
            amount: "$75",
            processing: "7-10 jours ouvrés",
        },
        { type: "Service express", amount: "+$25", processing: "48-72 heures" },
    ];

    const benefits = [
        {
            icon: <CheckCircle className="h-6 w-6" />,
            title: "Identification officielle",
            description:
                "Document officiel attestant de votre inscription au registre consulaire",
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Protection consulaire",
            description:
                "Accès à l'assistance et la protection consulaire en cas de besoin",
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: "Facilitation administrative",
            description:
                "Simplification des démarches pour obtenir d'autres documents consulaires",
        },
        {
            icon: <Info className="h-6 w-6" />,
            title: "Information prioritaire",
            description: "Réception des communications importantes du consulat",
        },
    ];

    return (
        <Layout>
            <motion.div
                className="bg-gradient-to-b from-white to-gray-50"
                initial="initial"
                animate="animate"
                variants={{
                    animate: { transition: { staggerChildren: 0.1 } },
                }}
            >
                {/* Hero Section */}
                <motion.section
                    className="relative bg-ci-green-light text-white py-20"
                    variants={fadeIn}
                >
                    <div className="container mx-auto px-4 py-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="h-10 w-10" />
                                <h1 className="text-4xl md:text-5xl font-bold">
                                    Carte Consulaire
                                </h1>
                            </div>
                            <p className="text-xl text-white/90 leading-relaxed">
                                La carte consulaire est un document
                                d'identification délivré aux ressortissants
                                ivoiriens résidant à l'étranger. Elle atteste de
                                votre inscription au registre consulaire et
                                facilite vos démarches administratives.
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                </motion.section>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                     {/* Hero Section */}
                <motion.section
                    className="relative bg-ci-green-light text-white py-20"
                    variants={fadeIn}
                >
                    <div className="container mx-auto px-4 py-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="h-10 w-10" />
                                <h1 className="text-4xl md:text-5xl font-bold">
                                    Carte Consulaire
                                </h1>
                            </div>
                            <p className="text-xl text-white/90 leading-relaxed">
                                La carte consulaire est un document
                                d'identification délivré aux ressortissants
                                ivoiriens résidant à l'étranger. Elle atteste de
                                votre inscription au registre consulaire et
                                facilite vos démarches administratives.
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                </motion.section>
                
                    {/* Important Notice */}
                    <motion.div
                        className="max-w-4xl mx-auto mb-12"
                        variants={fadeIn}
                    >
                        <Card className="border-ci-orange/20 bg-ci-orange/5">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-6 w-6 text-ci-orange" />
                                    <CardTitle className="text-ci-orange">
                                        Important
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    L'immatriculation consulaire est{" "}
                                    <strong>obligatoire</strong> pour tous les
                                    Ivoiriens résidant à l'étranger. Elle doit
                                    être renouvelée à chaque changement de
                                    situation (adresse, état civil, etc.).
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Benefits Section */}
                    <motion.section
                        className="max-w-6xl mx-auto mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Avantages de la Carte Consulaire
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-ci-green/10 rounded-lg text-ci-green">
                                                    {benefit.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg mb-2">
                                                        {benefit.title}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {benefit.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Required Documents */}
                    <motion.section
                        className="max-w-6xl mx-auto mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Documents Requis
                        </h2>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {requiredDocuments.map((doc, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full">
                                        <CardHeader className="bg-gray-50">
                                            <CardTitle className="text-xl">
                                                {doc.category}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <ul className="space-y-3">
                                                {doc.items.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <CheckCircle className="h-5 w-5 text-ci-green flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Fees and Processing */}
                    <motion.section
                        className="max-w-4xl mx-auto mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Tarifs et Délais de Traitement
                        </h2>
                        <Card>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="text-left p-4 font-semibold">
                                                    Type de demande
                                                </th>
                                                <th className="text-center p-4 font-semibold">
                                                    Tarif
                                                </th>
                                                <th className="text-center p-4 font-semibold">
                                                    Délai de traitement
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fees.map((fee, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="p-4">
                                                        {fee.type}
                                                    </td>
                                                    <td className="text-center p-4">
                                                        <Badge
                                                            variant="secondary"
                                                            className="font-semibold"
                                                        >
                                                            {fee.amount}
                                                        </Badge>
                                                    </td>
                                                    <td className="text-center p-4 text-gray-600">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Clock className="h-4 w-4" />
                                                            {fee.processing}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>

                    {/* Procedure Steps */}
                    <motion.section
                        className="max-w-4xl mx-auto mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Procédure de Demande
                        </h2>
                        <div className="space-y-4">
                            {[
                                "Rassemblez tous les documents requis selon votre situation",
                                "Remplissez le formulaire de demande disponible au consulat ou en ligne",
                                "Prenez rendez-vous via notre système en ligne",
                                "Présentez-vous au consulat avec l'original et les copies de vos documents",
                                "Effectuez le paiement des frais consulaires",
                                "Recevez un récépissé avec la date de retrait prévue",
                                "Retirez votre carte consulaire à la date indiquée",
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-ci-green text-white rounded-full flex items-center justify-center font-semibold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 pt-2">{step}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        className="max-w-4xl mx-auto text-center"
                        variants={fadeIn}
                    >
                        <Card className="bg-ci-orange text-white">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    Prêt à demander votre carte consulaire ?
                                </h3>
                                <p className="text-lg mb-6 text-white/90">
                                    Prenez rendez-vous en ligne pour soumettre
                                    votre demande
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="bg-white text-ci-green hover:bg-gray-100"
                                        asChild
                                    >
                                        <Link href="/rendez-vous">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Prendre Rendez-vous
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-white text-ci-green hover:bg-gray-100"
                                        asChild
                                    >
                                        <Link href="/contact">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Nous Contacter
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>
                </div>
            </motion.div>
        </Layout>
    );
}
