import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";

export default function Cookies() {
  return (
    <div className="min-h-screen">
      <ConstanciumHeader />
      
      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-12 text-[#D4AF37]" data-testid="text-cookies-headline">
            Politique de Cookies
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Qu'est-ce qu'un cookie ?</h2>
              <p className="leading-relaxed">
                Un cookie est un petit fichier texte stocké sur votre ordinateur, smartphone ou tablette lors de votre visite sur notre site www.constancium.com. Ce fichier contient des informations relatives à votre navigation et ne permet pas directement votre identification personnelle.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Types de cookies utilisés</h2>
              <p className="leading-relaxed">
                <strong>Cookies de session :</strong> Ces cookies sont temporaires et disparaissent à la fermeture de votre navigateur. Ils sont utilisés pour mémoriser vos préférences lors de votre visite.
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Cookies persistants :</strong> Ces cookies restent sur votre appareil pendant une durée déterminée. Ils permettent de reconnaître votre appareil lors de visites ultérieures.
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Cookies d'analyse :</strong> Ces cookies nous permettent de comprendre comment vous utilisez notre site et d'améliorer nos services. Aucune donnée personnelle identifiante n'est collectée à travers ces cookies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Finalités des cookies</h2>
              <p className="leading-relaxed">
                Les cookies utilisés sur notre site www.constancium.com servent à :
              </p>
              <ul className="list-disc list-inside space-y-2 leading-relaxed mt-4">
                <li>Faciliter votre navigation sur le site</li>
                <li>Mémoriser vos préférences et paramètres</li>
                <li>Mesurer l'audience et analyser l'utilisation du site</li>
                <li>Améliorer nos services et adapter notre contenu à vos besoins</li>
                <li>Assurer la sécurité de votre expérience utilisateur</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Votre consentement</h2>
              <p className="leading-relaxed">
                En continuant à naviguer sur le site www.constancium.com sans modifier les paramètres de votre navigateur, vous acceptez l'utilisation de cookies. Vous pouvez à tout moment modifier vos préférences et refuser l'installation de cookies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Comment gérer vos cookies ?</h2>
              <p className="leading-relaxed">
                <strong>Sous Google Chrome :</strong> Cliquez en haut à droite sur le menu (trois lignes horizontales), sélectionnez "Paramètres", puis "Paramètres avancés". Dans la section "Confidentialité et sécurité", cliquez sur "Cookies et autres données de site" pour configurer vos préférences.
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Sous Mozilla Firefox :</strong> Cliquez en haut à droite sur le menu (trois lignes horizontales), allez dans "Options", puis "Vie privée et sécurité". Dans la section "Cookies et données de sites", configurez vos paramètres de confidentialité.
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Sous Safari :</strong> Cliquez en haut à droite du navigateur sur le menu (rouage), sélectionnez "Paramètres", puis "Confidentialité". Vous pouvez y configurer la gestion des cookies.
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Sous Microsoft Edge :</strong> Cliquez en haut à droite sur le menu (trois points), sélectionnez "Paramètres", puis "Confidentialité et services". Configurez vos préférences de cookies dans la section "Cookies et autres données de site".
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Refus des cookies</h2>
              <p className="leading-relaxed">
                Le refus d'installation de cookies peut entraîner l'impossibilité d'accéder à certains services ou fonctionnalités du site. Cependant, vous pouvez refuser les cookies non-essentiels tout en conservant l'accès aux fonctionnalités principales du site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Modifications de la politique</h2>
              <p className="leading-relaxed">
                Constancium se réserve le droit de modifier cette politique de cookies à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page pour être informés des modifications apportées.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">Contact</h2>
              <p className="leading-relaxed">
                Pour toute question concernant notre politique de cookies, veuillez nous contacter à l'adresse suivante : capucine@constancium.com
              </p>
            </section>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
