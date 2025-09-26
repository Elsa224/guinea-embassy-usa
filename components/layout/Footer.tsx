"use client";

import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

export default function Footer() {
    return (
        <footer
            id="contacts"
            className="bg-green-700 py-12 text-white"
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Section 1: Navigation Rapide */}
                    <div>
                        <h3 className="mb-6 text-xl font-bold">
                            Navigation Rapide
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/services"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Services Consulaires
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/diaspora"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Inscription Diaspora
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/actualites"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Actualités
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/gouvernance"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Côte d&apos;Ivoire
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/multimedia"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Médiathèque
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/faq"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Questions Fréquentes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2: Contact Consulat */}
                    <div>
                        <h3 className="mb-6 text-xl font-bold">
                            Contact Consulat New York
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-semibold flex items-center">
                                    📍 Adresse
                                </h4>
                                <p className="text-white/80 text-sm">
                                    800 Second Avenue, Fifth Floor
                                    <br />
                                    New York, NY 10017 (USA)
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold flex items-center">
                                    📞 Téléphones
                                </h4>
                                <ul className="space-y-1 text-sm text-white/80">
                                    <li>Principal: (646) 476-7614</li>
                                    <li>Secondaire: (917) 392-2797</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold flex items-center">
                                    📧 Email & Web
                                </h4>
                                <ul className="space-y-1 text-sm text-white/80">
                                    <li>
                                        <a
                                            href="mailto:info.consulny@diplomatie.gouv.ci"
                                            className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                                        >
                                            <span role="img" aria-label="Email">✉️</span>
                                            info.consulny@diplomatie.gouv.ci
                                        </a>
                                    </li>
                                    <li>
                                <a
                                    href="https://express54.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    💻 Plateforme Express54
                                </a>
                            </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Horaires & Services */}
                    <div>
                        <h3 className="mb-6 text-xl font-bold">
                            Horaires & Services
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-semibold flex items-center">
                                    ⏰ Horaires d'ouverture
                                </h4>
                                <p className="text-white/80 text-sm">
                                    Du lundi au vendredi
                                    <br />
                                    <span className="font-semibold">MATIN :</span> 9h30 - 13h00
                                    <br />
                                    <span className="font-semibold">APRÈS-MIDI :</span> 14h00 à 16h30
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold flex items-center">
                                    🛠️ Services principaux
                                </h4>
                                <ul className="space-y-1 text-sm text-white/80">
                                    <li>• Passeports biométriques</li>
                                    <li>• Visas</li>
                                    <li>• Documents d'état civil</li>
                                    <li>• Légalisations</li>
                                    <li>• Inscriptions consulaires</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Liens Institutionnels */}
                    <div>
                        <h3 className="mb-6 text-xl font-bold">
                            Liens Institutionnels
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://presidence.ci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    🇨🇮 Présidence
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://primature.gouv.ci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    🏢 Primature
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://diplomatie.gouv.ci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    🌍 Ministère des Affaires Étrangères
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://gouv.ci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    🏛️ Gouvernement de Côte d'Ivoire
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://express54.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    💻 Plateforme Express54
                                </a>
                            </li>
                        </ul>
                        
                        <div className="flex space-x-4 pt-6">
                            <a
                                href="#"
                                className="text-white/80 transition-colors hover:text-white"
                                aria-label="Facebook"
                            >
                                <SiFacebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-white/80 transition-colors hover:text-white"
                                aria-label="Instagram"
                            >
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-white/80 transition-colors hover:text-white"
                                aria-label="X (Twitter)"
                            >
                                <SiX className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-12 border-t border-green-600 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-white/60 text-sm">
                            © 2025 Consulat Général de Côte d'Ivoire à New York. Tous droits réservés.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                            <a href="/mentions-legales" className="hover:text-white transition-colors">
                                Mentions légales
                            </a>
                            <span>•</span>
                            <a href="/politique-confidentialite" className="hover:text-white transition-colors">
                                Confidentialité
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}