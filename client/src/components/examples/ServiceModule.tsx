import ServiceModule from '../ServiceModule'
import { Briefcase } from 'lucide-react'

export default function ServiceModuleExample() {
  return (
    <div className="p-8 max-w-md">
      <ServiceModule
        icon={Briefcase}
        title="Gestion de Patrimoine"
        description="Optimisez votre patrimoine avec des stratégies personnalisées adaptées à vos objectifs financiers et familiaux."
      />
    </div>
  )
}
