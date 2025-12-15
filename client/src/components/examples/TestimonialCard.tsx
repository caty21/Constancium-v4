import TestimonialCard from '../TestimonialCard'

export default function TestimonialCardExample() {
  return (
    <div className="p-8 bg-secondary max-w-md">
      <TestimonialCard
        quote="Constancium a transformé ma vision de la gestion de patrimoine. Un accompagnement personnalisé et des résultats exceptionnels."
        author="Marie Dubois"
        role="Entrepreneure"
        rating={5}
      />
    </div>
  )
}
