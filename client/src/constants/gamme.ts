import { TrendingUp, Building, Shield, Calculator, Layers, FileText, PiggyBank, Home, Briefcase, Landmark } from "lucide-react";

export const gammeCategories = [
  {
    id: "placement",
    title: "Placement",
    icon: TrendingUp,
    description: "Solutions d'investissement sur-mesure pour valoriser et diversifier votre patrimoine financier",
    subcategories: [
      {
        id: "produits-structures",
        name: "Produits Structurés",
        description: "",
        items: [],
        definitions: [
          { name: "Produits Structurés", acronym: "Solutions d'investissement combinées", description: "Solutions d'investissement combinant des produits financiers de différentes natures pour optimiser les rendements", icon: "layers" }
        ]
      },
      {
        id: "obligations",
        name: "Obligations",
        description: "",
        items: [],
        definitions: [
          { name: "Fonds obligataires datés", acronym: "Investissement à échéance", description: "Fonds investissant dans un portefeuille diversifié d'obligations avec une échéance définie, permettant de cibler un rendement à horizon connu.", icon: "layers" },
          { name: "Obligations d'entreprises", acronym: "Titres de dette corporate", description: "Titres de dette émis par des entreprises offrant généralement des rendements supérieurs aux obligations d'État en contrepartie d'un risque plus élevé.", icon: "briefcase" },
          { name: "Fonds ESG", acronym: "Investissement responsable", description: "Investissements obligataires intégrant des critères environnementaux, sociaux et de gouvernance dans leur processus de sélection.", icon: "compass" }
        ]
      },
      {
        id: "private-equity",
        name: "Private Equity",
        description: "",
        items: [],
        definitions: [
          { name: "FIP", acronym: "Fonds d'Investissement de Proximité", description: "Placements dans les PME innovantes et entreprises en développement territorial", icon: "compass" },
          { name: "FCPR", acronym: "Fonds Commun de Placement à Risque", description: "Investissements directs en capital-risque auprès d'entreprises en forte croissance", icon: "target" },
          { name: "FPCI", acronym: "Fonds Professionnel de Capital Investissement", description: "Investissements en capital-risque auprès d'entreprises en développement avec approche professionnelle", icon: "briefcase" },
          { name: "FCPI", acronym: "Fonds Commun de Placement dans l'Innovation", description: "Financement des petites entreprises innovantes et technologiques", icon: "zap" }
        ]
      }
    ]
  },
  {
    id: "immobilier",
    title: "Immobilier",
    icon: Building,
    description: "Investissements immobiliers directs et pierre-papier",
    subcategories: [
      {
        id: "scpi",
        name: "SCPI",
        description: "",
        items: [],
        definitions: [
          { name: "SCPI de rendement", acronym: "Immobilier tertiaire", description: "Investissement dans des immeubles de bureaux, commerces ou logistique pour générer des revenus réguliers.", icon: "briefcase" },
          { name: "SCPI fiscales", acronym: "Optimisation fiscale", description: "Solutions permettant de bénéficier d'avantages fiscaux tout en investissant dans l'immobilier.", icon: "layers" },
          { name: "SCPI européennes", acronym: "Diversification internationale", description: "Diversification géographique de votre patrimoine immobilier à travers l'Europe.", icon: "compass" }
        ]
      },
      {
        id: "immobilier-neuf-ancien",
        name: "Immobilier neuf et ancien",
        description: "",
        items: [],
        definitions: [
          { name: "Résidences gérées", acronym: "Investissement locatif clé en main", description: "Investissement dans des résidences services (étudiantes, seniors, tourisme) avec bail commercial.", icon: "briefcase" }
        ]
      }
    ]
  },
  {
    id: "assurance-epargne",
    title: "Assurance & Épargne",
    icon: Shield,
    description: "Solutions d'épargne long terme et transmission patrimoniale",
    subcategories: [
      {
        id: "assurance-vie",
        name: "Assurance-vie",
        description: "",
        items: [],
        definitions: [
          { name: "Contrats multisupports", acronym: "Épargne diversifiée", description: "Combinaison de fonds en euros sécurisés et d'unités de compte pour diversifier votre épargne.", icon: "layers" }
        ]
      }
    ]
  },
  {
    id: "financement-fiscalite",
    title: "Financement & Fiscalité",
    icon: Calculator,
    description: "Stratégies de financement et optimisation fiscale",
    subcategories: [
      {
        id: "solutions-financement",
        name: "Solutions de financement",
        description: "",
        items: [],
        definitions: [
          { name: "Crédit immobilier", acronym: "Financement de projets", description: "Accompagnement dans la recherche des meilleures conditions de financement pour vos projets immobiliers.", icon: "briefcase" },
          { name: "Crédit Lombard", acronym: "Financement adossé", description: "Financement adossé à votre portefeuille d'actifs pour financer vos projets sans céder vos investissements.", icon: "layers" }
        ]
      },
      {
        id: "accompagnement-fiscal",
        name: "Accompagnement fiscal",
        description: "",
        items: [],
        definitions: [
          { name: "Girardin industriel", acronym: "Réduction d'impôt Outre-mer", description: "Réduction d'impôt one-shot en contrepartie d'investissements productifs en Outre-mer.", icon: "compass" }
        ]
      }
    ]
  }
];

export type GammeCategory = typeof gammeCategories[number];
export type GammeSubcategory = GammeCategory['subcategories'][number];
