import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// HTML content for visa service
const visaContentFr = `
<div class="space-y-8">
  <div class="text-center">
    <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
      <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </div>
    <h1 class="mb-4 text-4xl font-bold text-gray-900">Service VISA</h1>
    <p class="mx-auto max-w-2xl text-lg text-gray-600">
      Veuillez préparer tous les documents listés ci-dessous pour compléter votre demande de visa.
    </p>
  </div>

  <div class="bg-gray-50 p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-900">Documents requis</h2>
    <ol class="space-y-4">
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">1</span>
        <span class="text-gray-700 pt-1">Le passeport d'une validité de six (06) mois ou plus</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">2</span>
        <span class="text-gray-700 pt-1">Une photo d'identité en couleur / fond blanc</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">3</span>
        <span class="text-gray-700 pt-1">La lettre d'invitation légalisée ou la confirmation de la réservation d'hôtel</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">4</span>
        <span class="text-gray-700 pt-1">L'itinéraire du voyage (billet aller-retour)</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">5</span>
        <span class="text-gray-700 pt-1">La copie du Carnet de vaccination contre la fièvre jaune</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">6</span>
        <span class="text-gray-700 pt-1">La copie de la Green Card pour autre nationalité ou visa (exceptés visa B1 et B2)</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">7</span>
        <span class="text-gray-700 pt-1">Pour l'enfant mineur : une autorisation parentale notariée pour le parent qui ne voyage pas</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">8</span>
        <span class="text-gray-700 pt-1">Pour les personnes qui voyagent avec l'enfant mineur : copies du passeport et du visa ou de la Green Card</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">9</span>
        <span class="text-gray-700 pt-1">La copie du reçu de paiement du visa</span>
      </li>
    </ol>
  </div>

  <div class="border-2 border-red-200 bg-red-50 p-6 rounded-lg">
    <div class="flex items-start">
      <svg class="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <div class="space-y-3">
        <h3 class="text-lg font-bold text-gray-900">IMPORTANT</h3>
        <div class="text-gray-700">
          <p class="mb-3">
            Les documents susmentionnés devront être ensuite téléchargés sur la plate-forme express54.org.
            Après analyse des documents, les requérants seront contactés par email afin de faire parvenir leurs passeports.
          </p>
          <p>
            Pour plus d'informations, veuillez appeler le Service Consulaire au 
            <a href="tel:+16464767614" class="font-bold text-green-600 hover:underline">(646) 476-7614</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="border-2 border-green-200 bg-green-50 p-6 rounded-lg">
    <h3 class="mb-4 text-lg font-bold text-gray-900">Paiement</h3>
    <p class="mb-6 text-gray-700">
      Le traitement de votre demande commencera après réception du paiement et de tous les documents requis.
    </p>
    <div class="text-center">
      <a href="https://express54.org" target="_blank" class="inline-flex items-center rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105">
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        Procéder au paiement
      </a>
    </div>
  </div>

  <div class="border-2 border-orange-200 bg-orange-50 p-6 rounded-lg">
    <h3 class="mb-4 text-lg font-bold text-gray-900">Démarches en ligne</h3>
    <p class="mb-6 text-gray-700">
      Effectuez votre demande de visa directement sur notre plateforme digitalisée
    </p>
    <div class="text-center">
      <a href="https://www.express54.org" target="_blank" class="inline-flex items-center rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105">
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        www.express54.org
      </a>
    </div>
  </div>
</div>
`

const visaContentEn = `
<div class="space-y-8">
  <div class="text-center">
    <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
      <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </div>
    <h1 class="mb-4 text-4xl font-bold text-gray-900">VISA Service</h1>
    <p class="mx-auto max-w-2xl text-lg text-gray-600">
      Please prepare all the documents listed below to complete your visa application.
    </p>
  </div>

  <div class="bg-gray-50 p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-900">Required Documents</h2>
    <ol class="space-y-4">
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">1</span>
        <span class="text-gray-700 pt-1">The passport with a six-month validity or more</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">2</span>
        <span class="text-gray-700 pt-1">One picture I.D in color with white background</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">3</span>
        <span class="text-gray-700 pt-1">Legalized invitation letter or Hotel booking</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">4</span>
        <span class="text-gray-700 pt-1">Flight booking itinerary</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">5</span>
        <span class="text-gray-700 pt-1">Copy of the yellow fever vaccine</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">6</span>
        <span class="text-gray-700 pt-1">Copy of the Green Card for non US Citizens or valid visa (Visa B1 and B2 are not accepted)</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">7</span>
        <span class="text-gray-700 pt-1">For minor children : A notarized parental consent written by the parent not traveling</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">8</span>
        <span class="text-gray-700 pt-1">Person traveling with the child : Copy of passport and visa or Green Card</span>
      </li>
      <li class="flex items-start">
        <span class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">9</span>
        <span class="text-gray-700 pt-1">Copy of the visa payment receipt</span>
      </li>
    </ol>
  </div>

  <div class="border-2 border-red-200 bg-red-50 p-6 rounded-lg">
    <div class="flex items-start">
      <svg class="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <div class="space-y-3">
        <h3 class="text-lg font-bold text-gray-900">IMPORTANT</h3>
        <div class="text-gray-700">
          <p class="mb-3">
            The documents for the visa should be uploaded on the platform called: express54.org
            Upon approval, applicants will be contacted by email in order to send their passports to the Embassy for the visa.
          </p>
          <p>
            For more information, please contact the Consular Service at 
            <a href="tel:+16464767614" class="font-bold text-green-600 hover:underline">(646) 476-7614</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="border-2 border-green-200 bg-green-50 p-6 rounded-lg">
    <h3 class="mb-4 text-lg font-bold text-gray-900">Payment</h3>
    <p class="mb-6 text-gray-700">
      Processing of your application will begin after receipt of payment and all required documents.
    </p>
    <div class="text-center">
      <a href="https://express54.org" target="_blank" class="inline-flex items-center rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105">
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        Proceed to payment
      </a>
    </div>
  </div>

  <div class="border-2 border-orange-200 bg-orange-50 p-6 rounded-lg">
    <h3 class="mb-4 text-lg font-bold text-gray-900">Online procedures</h3>
    <p class="mb-6 text-gray-700">
      Submit your visa application directly on our digitalized platform
    </p>
    <div class="text-center">
      <a href="https://www.express54.org" target="_blank" class="inline-flex items-center rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:scale-105">
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        www.express54.org
      </a>
    </div>
  </div>
</div>
`

async function copyExistingContent() {
  try {
    console.log('🚀 Starting copy of existing services content...')

    // Update visa page with existing content
    const visaPage = await prisma.page.findUnique({
      where: { slug: 'services/visa' },
    })

    if (visaPage) {
      await prisma.page.update({
        where: { id: visaPage.id },
        data: {
          content: {
            fr: visaContentFr.trim(),
            en: visaContentEn.trim(),
          },
          requiredDocs: {
            fr: [
              "Le passeport d'une validité de six (06) mois ou plus",
              "Une photo d'identité en couleur / fond blanc",
              "La lettre d'invitation légalisée ou la confirmation de la réservation d'hôtel",
              "L'itinéraire du voyage (billet aller-retour)",
              "La copie du Carnet de vaccination contre la fièvre jaune",
              "La copie de la Green Card pour autre nationalité ou visa (exceptés visa B1 et B2)",
              "Pour l'enfant mineur : une autorisation parentale notariée pour le parent qui ne voyage pas",
              "Pour les personnes qui voyagent avec l'enfant mineur : copies du passeport et du visa ou de la Green Card",
              "La copie du reçu de paiement du visa"
            ],
            en: [
              "The passport with a six-month validity or more",
              "One picture I.D in color with white background",
              "Legalized invitation letter or Hotel booking",
              "Flight booking itinerary",
              "Copy of the yellow fever vaccine",
              "Copy of the Green Card for non US Citizens or valid visa (Visa B1 and B2 are not accepted)",
              "For minor children : A notarized parental consent written by the parent not traveling",
              "Person traveling with the child : Copy of passport and visa or Green Card",
              "Copy of the visa payment receipt"
            ]
          },
          processingTime: {
            fr: "3-5 jours ouvrables après réception des documents",
            en: "3-5 business days after receiving documents"
          },
          formLink: "https://express54.org",
          paymentLink: "https://express54.org"
        },
      })
      console.log('✅ Updated visa page content')
    }

    console.log('🎉 Content copy completed!')
  } catch (error) {
    console.error('❌ Copy failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the copy
copyExistingContent()