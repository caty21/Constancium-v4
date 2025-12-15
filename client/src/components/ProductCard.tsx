import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  onCustomize?: () => void;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  rating = 5, 
  reviewCount = 0,
  onCustomize 
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-product-${id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            data-testid={`img-product-${id}`}
          />
          <Badge className="absolute top-3 right-3" data-testid={`badge-handmade-${id}`}>
            Handmade
          </Badge>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-serif text-xl font-semibold mb-1" data-testid={`text-product-name-${id}`}>
              {name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                />
              ))}
              {reviewCount > 0 && (
                <span className="text-sm text-muted-foreground ml-1" data-testid={`text-review-count-${id}`}>
                  ({reviewCount})
                </span>
              )}
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground" data-testid={`text-price-${id}`}>
              ${price.toFixed(2)}
            </p>
          </div>
          
          <Button 
            className="w-full" 
            variant="default"
            onClick={() => {
              console.log(`Customize clicked for ${name}`);
              onCustomize?.();
            }}
            data-testid={`button-customize-${id}`}
          >
            Customize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
