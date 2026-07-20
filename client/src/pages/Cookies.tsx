import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";

export default function Cookies() {
  return (
    <div className="min-h-screen">
      <ConstanciumHeader />

      <section className="pt-32 pb-20 md:pb-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-12 text-[#D4AF37]" data-testid="text-cookies-headline">
            Politique de Cookies
          </h1>

          <div className="max-w-none space-y-8 text-[#0F1729]">

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-[#0F1729]">Utilisation des cookies</h2>
              <p className="leading-relaxed">
                Le site <strong>www.constancium.com</strong> n'utilise pas de cookies de traçage, de publicité ou d'analyse comportementale.
              </p>
              <p className="leading-relaxed mt-4">
                Aucune donnée de navigation n'est collectée, partagée ou revendue à des tiers. Aucun outil d'analytics tiers (Google Analytics, Hotjar, Meta Pixel, etc.) n'est installé sur ce site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-[#0F1729]">Cookie technique de session</h2>
              <p className="leading-relaxed">
                Le site peut déposer un unique <strong>cookie de session</strong>, strictement nécessaire au bon fonctionnement technique de la navigation (maintien de la connexion, sécurité des formulaires). Ce cookie est temporaire : il est automatiquement supprimé à la fermeture de votre navigateur.
              </p>
              <p className="leading-relaxed mt-4">
                Ce type de cookie est exempté de consentement au sens de la réglementation RGPD et des recommandations de la CNIL, car il ne permet pas de vous identifier ni de vous suivre.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-[#0F1729]">Vos droits</h2>
              <p className="leading-relaxed">
                Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les cookies. Cela n'affectera pas votre accès au contenu du site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-[#0F1729]">Modifications</h2>
              <p className="leading-relaxed">
                Constancium se réserve le droit de mettre à jour cette politique si les pratiques du site venaient à évoluer. Toute modification serait reflétée sur cette page.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-[#0F1729]">Contact</h2>
              <p className="leading-relaxed">
                Pour toute question relative à cette politique, vous pouvez écrire à :{" "}
                <a href="mailto:capucine@constancium.com" className="text-[#D4AF37] hover:underline">
                  capucine@constancium.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
