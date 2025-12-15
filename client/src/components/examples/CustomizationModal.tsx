import { useState } from 'react'
import CustomizationModal from '../CustomizationModal'
import { Button } from '@/components/ui/button'
import productImage from '@assets/generated_images/leather_journal_product_photo.png'

export default function CustomizationModalExample() {
  const [open, setOpen] = useState(true)
  
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Customization Modal</Button>
      <CustomizationModal
        open={open}
        onClose={() => setOpen(false)}
        productName="Leather Journal"
        productImage={productImage}
        basePrice={45.00}
      />
    </div>
  )
}
