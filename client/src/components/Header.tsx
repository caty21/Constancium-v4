import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface HeaderProps {
  cartItemCount?: number;
  onMenuClick?: () => void;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onMenuClick, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            size="icon" 
            variant="ghost" 
            className="md:hidden"
            onClick={onMenuClick}
            data-testid="button-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/">
            <h1 className="font-serif text-2xl font-bold cursor-pointer" data-testid="text-logo">
              Artisan
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/shop">
            <Button variant="ghost" data-testid="link-shop">Shop</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" data-testid="link-about">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" data-testid="link-contact">Contact</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:flex" data-testid="badge-newsletter">
            Join 5,000+ makers
          </Badge>
          <Button 
            size="icon" 
            variant="ghost"
            onClick={onCartClick}
            className="relative"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center" data-testid="text-cart-count">
                {cartItemCount}
              </span>
            )}
          </Button>
          <Button size="icon" variant="ghost" data-testid="button-account">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
