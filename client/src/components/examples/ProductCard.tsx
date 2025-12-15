import ProductCard from '../ProductCard'
import productImage from '@assets/generated_images/handmade_ceramic_mug_product.png'

export default function ProductCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <ProductCard 
        id="example-1"
        name="Ceramic Coffee Mug"
        price={32.00}
        image={productImage}
        rating={5}
        reviewCount={24}
        onCustomize={() => console.log('Customize clicked')}
      />
    </div>
  )
}
