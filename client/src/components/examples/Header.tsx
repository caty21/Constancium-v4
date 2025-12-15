import Header from '../Header'

export default function HeaderExample() {
  return <Header cartItemCount={3} onMenuClick={() => console.log('Menu clicked')} onCartClick={() => console.log('Cart clicked')} />
}
