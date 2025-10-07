// Mockup data for actualités when database is not available
export const mockActualites = {
  posts: [
    {
      id: "note-information-2025",
      slug: "note-d-information-express54",
      title: "Note d'Information",
      content: "Il est porté à la connaissance de l'ensemble des usagers du Consulat Général de Côte d'Ivoire à New York, que la plateforme digitale de demande des actes consulaires EXPRESS54 est disponible et fonctionnel.\n\nÀ cet égard, le Consulat Général encourage les usagers résidents dans les États de : Connecticut ; Caroline du Nord ; Caroline du Sud ; Floride ; Géorgie ; Illinois ; Indiana ; Maine ; Massachusetts ; Michigan ; Minnesota ; Missouri ; New Hampshire ; New Jersey ; New York ; Ohio ; Pennsylvanie ; Rhodes Island ; Vermont ; Wisconsin, à soumettre leurs demandes via le lien suivant : https://www.express54.org, ou à télécharger l'application mobile sur App store en recherchant « Express54 ».\n\nLe Consulat Général reste joignable au (917) 392-2797, pour répondre à toutes vos préoccupations.",
      excerpt: "Il est porté à la connaissance de l'ensemble des usagers du Consulat Général de Côte d'Ivoire à New York, que la plateforme digitale de demande des actes consulaires EXPRESS54 est disponible et fonctionnel.",
      type: "NEWS",
      featured: true,
      publishedAt: new Date().toISOString(),
      author: {
        id: "consul-general",
        name: "Consulat Général"
      },
      category: {
        id: "annonces",
        name: "Annonces Officielles",
        slug: "annonces-officielles",
        color: "#ff7f00"
      },
      tags: [
        {
          id: "express54",
          name: "Express54",
          slug: "express54"
        },
        {
          id: "services-digitaux",
          name: "Services Digitaux",
          slug: "services-digitaux"
        }
      ],
      media: [
        {
          id: "note-info-image",
          url: "/assets/actualites/note-d-information.jpeg",
          alt: "Note d'Information - Plateforme Express54",
          caption: "Note d'Information officielle du Consulat Général"
        },
        {
          id: "default-news-image",
          url: "/assets/images-for-the-new-website/gallery-1.jpeg",
          alt: "Image par défaut actualité",
          caption: "Image par défaut pour les actualités"
        }
      ],
      readingTime: 2
    },
    {
      id: "services-consulaires-2025",
      slug: "services-consulaires-modernisation",
      title: "Modernisation des Services Consulaires",
      content: "Le Consulat Général de Côte d'Ivoire à New York poursuit sa modernisation avec la mise en place de nouveaux services digitaux pour faciliter vos démarches administratives.",
      excerpt: "Découvrez les nouvelles améliorations apportées aux services consulaires pour une meilleure expérience utilisateur.",
      type: "NEWS",
      featured: false,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      author: {
        id: "consulat-admin",
        name: "Administration Consulaire"
      },
      category: {
        id: "services",
        name: "Services",
        slug: "services",
        color: "#00aa4f"
      },
      tags: [
        {
          id: "modernisation",
          name: "Modernisation",
          slug: "modernisation"
        }
      ],
      media: [
        {
          id: "services-image",
          url: "/assets/images-for-the-new-website/gallery-2.jpeg",
          alt: "Services Consulaires",
          caption: "Modernisation des services consulaires"
        }
      ],
      readingTime: 3
    },
    {
      id: "horaires-2025",
      slug: "horaires-consulat-janvier-2025",
      title: "Horaires du Consulat - Janvier 2025",
      content: "Nous vous informons des horaires d'ouverture du Consulat Général pour le mois de janvier 2025. Le consulat est ouvert du lundi au vendredi de 9h00 à 16h00.",
      excerpt: "Consultez les horaires d'ouverture du Consulat Général pour vos démarches administratives.",
      type: "NEWS",
      featured: false,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      author: {
        id: "consulat-admin",
        name: "Administration Consulaire"
      },
      category: {
        id: "informations",
        name: "Informations",
        slug: "informations",
        color: "#3b82f6"
      },
      tags: [
        {
          id: "horaires",
          name: "Horaires",
          slug: "horaires"
        }
      ],
      media: [
        {
          id: "horaires-image",
          url: "/assets/images-for-the-new-website/gallery-3.jpeg",
          alt: "Consulat Général",
          caption: "Consulat Général de Côte d'Ivoire à New York"
        }
      ],
      readingTime: 1
    },
    {
      id: "evenement-culturel-2025",
      slug: "evenement-culturel-fevrier",
      title: "Événement Culturel - Février 2025",
      content: "Le Consulat Général organise un événement culturel pour célébrer la richesse de la culture ivoirienne. Rejoignez-nous pour une soirée mémorable.",
      excerpt: "Participez à notre prochain événement culturel célébrant la diversité et la richesse de la culture ivoirienne.",
      type: "EVENT",
      featured: false,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      author: {
        id: "service-culturel",
        name: "Service Culturel"
      },
      category: {
        id: "culture",
        name: "Culture",
        slug: "culture",
        color: "#8b5cf6"
      },
      tags: [
        {
          id: "evenement",
          name: "Événement",
          slug: "evenement"
        },
        {
          id: "culture",
          name: "Culture",
          slug: "culture"
        }
      ],
      media: [
        {
          id: "culture-image",
          url: "/assets/images-for-the-new-website/gallery-4.jpeg",
          alt: "Événement Culturel",
          caption: "Événement culturel ivoirien"
        }
      ],
      readingTime: 2
    },
    {
      id: "visa-info-2025",
      slug: "informations-visa-mise-a-jour",
      title: "Mise à jour - Procédures Visa",
      content: "Nouvelles procédures pour les demandes de visa. Consultez les dernières exigences et documents nécessaires pour votre demande de visa.",
      excerpt: "Informez-vous sur les dernières mises à jour concernant les procédures de demande de visa.",
      type: "NEWS",
      featured: false,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      author: {
        id: "service-visa",
        name: "Service Visa"
      },
      category: {
        id: "visa",
        name: "Visa",
        slug: "visa",
        color: "#ef4444"
      },
      tags: [
        {
          id: "visa",
          name: "Visa",
          slug: "visa"
        },
        {
          id: "procedures",
          name: "Procédures",
          slug: "procedures"
        }
      ],
      media: [
        {
          id: "visa-image",
          url: "/assets/images-for-the-new-website/video-cover-1.jpeg",
          alt: "Procédures Visa",
          caption: "Informations sur les procédures visa"
        }
      ],
      readingTime: 4
    },
    {
      id: "passeport-info-2025",
      slug: "passeport-biometrique-informations",
      title: "Passeport Biométrique - Informations",
      content: "Tout ce que vous devez savoir sur la demande de passeport biométrique ivoirien. Consultez les documents requis et les étapes à suivre.",
      excerpt: "Guide complet pour votre demande de passeport biométrique ivoirien au Consulat Général.",
      type: "NEWS",
      featured: false,
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      author: {
        id: "service-passeport",
        name: "Service Passeport"
      },
      category: {
        id: "passeport",
        name: "Passeport",
        slug: "passeport",
        color: "#10b981"
      },
      tags: [
        {
          id: "passeport",
          name: "Passeport",
          slug: "passeport"
        },
        {
          id: "biometrique",
          name: "Biométrique",
          slug: "biometrique"
        }
      ],
      media: [
        {
          id: "passeport-image",
          url: "/assets/images-for-the-new-website/video-cover-2.jpeg",
          alt: "Passeport Biométrique",
          caption: "Demande de passeport biométrique"
        }
      ],
      readingTime: 3
    }
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 6,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  }
};