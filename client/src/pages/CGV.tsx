import ConstanciumHeader from "@/components/ConstanciumHeader";
import ConstanciumFooter from "@/components/ConstanciumFooter";

export default function CGV() {
  return (
    <div className="min-h-screen">
      <ConstanciumHeader />
      
      <section className="pt-32 pb-20 md:pb-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-12 text-[#D4AF37]" data-testid="text-cgv-headline">
            Conditions Générales
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">1. Objet et champ d'application</h2>
              <p className="leading-relaxed">
                Les présentes conditions générales régissent l'accès et l'utilisation du site www.constancium.com ainsi que les services d'information relatifs aux services de conseil en gestion de patrimoine proposés par Constancium. Elles s'appliquent à tous les utilisateurs du site, à titre onéreux ou gratuit.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">2. Accès au site</h2>
              <p className="leading-relaxed">
                Le site www.constancium.com est accessible en permanence aux utilisateurs, sauf interruption pour maintenance technique. Constancium s'efforce de maintenir le site en parfait état de fonctionnement, mais ne peut garantir une disponibilité sans interruption.
              </p>
              <p className="leading-relaxed mt-4">
                L'utilisateur s'engage à accéder au site en utilisant un matériel approprié et à jour, dépourvu de virus, et un navigateur web récent et à jour.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">3. Services proposés</h2>
              <p className="leading-relaxed">
                Le site www.constancium.com a pour objet de fournir des informations générales concernant les services de conseil en gestion de patrimoine proposés par Constancium. Ces informations sont données à titre indicatif et ne constituent pas une offre commerciale définitive.
              </p>
              <p className="leading-relaxed mt-4">
                Toute demande de conseil spécifique doit faire l'objet d'une consultation directe avec un conseiller de Constancium en conformité avec la réglementation applicable.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">4. Informations fournis</h2>
              <p className="leading-relaxed">
                Constancium s'efforce de fournir des informations fiables et à jour. Toutefois, Constancium ne saurait être tenue responsable des imprécisions, omissions ou erreurs dans les informations publiées, ni des retards ou interruptions dans leur mise à jour.
              </p>
              <p className="leading-relaxed mt-4">
                Les informations publiées sont susceptibles d'être modifiées sans préavis. Les utilisateurs sont invités à consulter régulièrement le site pour connaître les mises à jour.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">5. Propriété intellectuelle</h2>
              <p className="leading-relaxed">
                Tous les éléments du site www.constancium.com (textes, images, graphismes, logos, icônes, sons, logiciels, mise en page) sont la propriété exclusive de Constancium ou font l'objet d'une autorisation d'utilisation.
              </p>
              <p className="leading-relaxed mt-4">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen utilisé, est interdite sans autorisation préalable écrite de Constancium.
              </p>
              <p className="leading-relaxed mt-4">
                Toute violation de ces droits entraînera des poursuites judiciaires conformément à la législation en vigueur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">6. Responsabilité</h2>
              <p className="leading-relaxed">
                Constancium ne peut être tenue responsable des dommages matériels ou immatériels résultant de l'accès ou de l'utilisation du site, notamment les pertes de données, les interruptions de service ou les virus informatiques.
              </p>
              <p className="leading-relaxed mt-4">
                Constancium ne sera pas responsable des dommages indirects tels que les pertes de revenus, les pertes d'opportunités commerciales ou les dommages immatériels.
              </p>
              <p className="leading-relaxed mt-4">
                L'utilisateur utilise le site à ses risques et périls. Constancium ne peut en aucun cas être tenue responsable du contenu ou des services proposés par des sites tiers vers lesquels le site www.constancium.com redirigerait l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">7. Données personnelles</h2>
              <p className="leading-relaxed">
                Constancium s'engage à protéger les données personnelles des utilisateurs conformément à la législation française et au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p className="leading-relaxed mt-4">
                Pour plus d'informations sur la gestion de vos données personnelles, veuillez consulter notre politique de confidentialité accessible via la Littérature Juridique.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">8. Conformité réglementaire</h2>
              <p className="leading-relaxed">
                Constancium s'engage à respecter l'ensemble de la réglementation applicable en matière de conseil en gestion de patrimoine, notamment les dispositions de l'AMF (Autorité des Marchés Financiers) et les obligations de conformité.
              </p>
              <p className="leading-relaxed mt-4">
                Le site est soumis aux lois françaises et toute utilisation du site implique l'acceptation de la juridiction des tribunaux français compétents.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">9. Modification des conditions</h2>
              <p className="leading-relaxed">
                Constancium se réserve le droit de modifier les présentes conditions générales à tout moment. Les utilisateurs sont invités à les consulter régulièrement. L'utilisation continue du site après modification signifie l'acceptation des nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-4 text-primary">10. Contact</h2>
              <p className="leading-relaxed">
                Pour toute question ou réclamation concernant les présentes conditions générales, veuillez nous contacter à l'adresse suivante :
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Constancium</strong><br />
                Email : capucine@constancium.com<br />
                Téléphone : 07 67 69 49 84
              </p>
            </section>
          </div>
        </div>
      </section>

      <ConstanciumFooter />
    </div>
  );
}
