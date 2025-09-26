"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Phone } from "lucide-react";

export default function ServicesPage() {
    return (
        <Layout currentPath="/services">
            <div className="bg-orange-50 py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                            Services Consulaires
                        </h1>
                        {/* <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-orange-500"></div> */}
                        <p className="mx-auto max-w-3xl text-lg text-gray-600">
                            Découvrez tous nos services consulaires digitalisés et nos démarches simplifiées
                        </p>
                    </motion.div>

                    {/* Express54 Main Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-16"
                    >
                        <Card className="overflow-hidden border-0 bg-white shadow-2xl">
                            {/* Header with flag colors */}
                            <div className="h-2 bg-orange-500"></div>
                            
                            <CardHeader className="bg-orange-50 pb-8">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="rounded-full bg-white p-4 shadow-lg">
                                        <img
                                            src="/assets/images-for-the-new-website/express54-blue-icon.png"
                                            alt="Express54"
                                            className="h-24 w-24"
                                        />
                                    </div>
                                </div>
                                <CardTitle className="text-center text-3xl font-bold text-gray-900">
                                    Express54
                                </CardTitle>
                                <p className="text-center text-xl font-semibold text-orange-600">
                                    La digitalisation des Services Consulaires
                                </p>
                            </CardHeader>

                            <CardContent className="p-8">
                                {/* French Content */}
                                <div className="mb-12">
                                    <div className="mb-6 flex items-center">
                                        <div className="mr-4 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                                            <span className="text-sm font-bold text-orange-600">FR</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Français</h3>
                                    </div>
                                    
                                    <div className="rounded-2xl bg-orange-50/50 p-6 mb-6">
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            Il est porté à la connaissance des usagers qu'une nouvelle plateforme de 
                                            digitalisation des Services Consulaires est disponible. A cet égard, l'Ambassade 
                                            invite les requérants à présenter leurs demandes en consultant le site ci-après:
                                        </p>
                                    </div>

                                    <div className="mb-6 text-center">
                                        <Button 
                                            onClick={() => window.open('https://www.express54.org', '_blank')}
                                            className="rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            www.express54.org
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-center rounded-2xl bg-green-50/50 p-4">
                                        <Phone className="mr-3 h-5 w-5 text-green-600" />
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Pour plus d'informations:</span>{' '}
                                            De plus amples informations peuvent être obtenues auprès des Agents du 
                                            Service Consulaire joignables au : <span className="font-bold text-green-600 inline-flex items-center"><Phone className="inline-block mr-1 h-4 w-4" /> (646) 476-7614</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="my-12 flex items-center">
                                    <div className="flex-1 border-t border-gray-200"></div>
                                    <div className="mx-4 rounded-full bg-orange-500 p-2">
                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                    </div>
                                    <div className="flex-1 border-t border-gray-200"></div>
                                </div>

                                {/* English Content */}
                                <div>
                                    <div className="mb-6 flex items-center">
                                        <div className="mr-4 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-sm font-bold text-green-600">EN</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">English</h3>
                                    </div>
                                    
                                    <div className="rounded-2xl bg-green-50/50 p-6 mb-6">
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            Users are informed that a new digitalization platform for Consular Services 
                                            is available in this regard. The Embassy invites applicants to submit their 
                                            requests by consulting the following site:
                                        </p>
                                    </div>

                                    <div className="mb-6 text-center">
                                        <Button 
                                            onClick={() => window.open('https://www.express54.org', '_blank')}
                                            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105"
                                        >
                                            <ExternalLink className="mr-3 h-5 w-5" />
                                            www.express54.org
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-center rounded-2xl bg-orange-50/50 p-4">
                                        <Phone className="mr-3 h-5 w-5 text-orange-600" />
                                        <p className="text-gray-700">
                                            <span className="font-semibold">For more information:</span>{' '}
                                            Please contact the Consular Service by dialing: <span className="font-bold text-orange-600 inline-flex items-center"><Phone className="inline-block mr-1 h-4 w-4" /> (646) 476-7614</span>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Links to Other Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                            Accès Rapide aux Services
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                { 
                                    title: "Visa", 
                                    href: "/services/visa",
                                    icon: "🛂",
                                    color: "bg-blue-500"
                                },
                                { 
                                    title: "Passeport", 
                                    href: "/services/passeport",
                                    icon: "📘",
                                    color: "bg-green-500"
                                },
                                { 
                                    title: "État Civil", 
                                    href: "/services/etat-civil",
                                    icon: "📄",
                                    color: "bg-orange-500"
                                },
                                { 
                                    title: "Autres Documents", 
                                    href: "/services/autres-documents",
                                    icon: "📋",
                                    color: "bg-purple-500"
                                }
                            ].map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                >
                                    <Card className="group h-full cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                                        <CardContent className="p-6 text-center">
                                            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${service.color} shadow-lg`}>
                                                <span className="text-2xl">{service.icon}</span>
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                {service.title}
                                            </h3>
                                            <Button
                                                onClick={() => window.location.href = service.href}
                                                variant="outline"
                                                className="rounded-xl border-2 border-gray-200 transition-all duration-300 group-hover:border-orange-300 group-hover:bg-orange-50"
                                            >
                                                En savoir plus
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}