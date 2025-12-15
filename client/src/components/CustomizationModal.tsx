import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface CustomizationModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
  basePrice: number;
}

const COLORS = [
  { name: "Natural", value: "#D4B896" },
  { name: "Navy", value: "#2C3E50" },
  { name: "Forest", value: "#27AE60" },
  { name: "Burgundy", value: "#8B4789" },
];

const SIZES = ["Small", "Medium", "Large"];

export default function CustomizationModal({
  open,
  onClose,
  productName,
  productImage,
  basePrice,
}: CustomizationModalProps) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [personalizationText, setPersonalizationText] = useState("");

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      product: productName,
      color: selectedColor.name,
      size: selectedSize,
      personalization: personalizationText,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-customization">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl" data-testid="text-modal-title">
            Customize Your {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-md overflow-hidden bg-muted">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-full object-cover"
                data-testid="img-customization-preview"
              />
            </div>
            <Badge variant="secondary" className="mt-3" data-testid="badge-made-to-order">
              Made to Order - Ships in 7-10 days
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block" data-testid="label-color">
                Choose Color
              </Label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-md border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-primary scale-110'
                        : 'border-border hover-elevate'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    data-testid={`button-color-${color.name.toLowerCase()}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2" data-testid="text-selected-color">
                Selected: {selectedColor.name}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block" data-testid="label-size">
                Select Size
              </Label>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    data-testid={`button-size-${size.toLowerCase()}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="personalization" className="text-sm font-medium mb-2 block" data-testid="label-personalization">
                Add Personalization (Optional)
              </Label>
              <Input
                id="personalization"
                placeholder="e.g., Your Name or Message"
                value={personalizationText}
                onChange={(e) => setPersonalizationText(e.target.value)}
                maxLength={30}
                data-testid="input-personalization"
              />
              <p className="text-xs text-muted-foreground mt-1" data-testid="text-char-count">
                {personalizationText.length}/30 characters
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">Total Price:</span>
                <span className="text-2xl font-bold" data-testid="text-total-price">
                  ${basePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleAddToCart} data-testid="button-add-to-cart">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
