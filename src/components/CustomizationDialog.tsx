import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface CustomizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  onConfirm: (customization: string, quantity: number) => void;
}

const commonCustomizations = [
  {
    title: "Custom Message/Text",
    description: "Add personalized messages, names, or custom text to your order"
  },
  {
    title: "Color Preference",
    description: "Specify your preferred color scheme or palette for the design"
  },
  {
    title: "Special Packaging",
    description: "Request premium or eco-friendly packaging options"
  },
  {
    title: "Gift Wrapping",
    description: "Beautiful gift wrapping service with ribbons and decorative elements"
  },
  {
    title: "Personalized Card",
    description: "Include a custom greeting card with your personal message"
  },
  {
    title: "Delivery Date Preference",
    description: "Specify your preferred delivery date or timeframe"
  },
  {
    title: "Bulk Order Discount",
    description: "Request a quote for bulk orders and volume discounts"
  }
];

export const CustomizationDialog = ({ 
  open, 
  onOpenChange, 
  productTitle,
  onConfirm 
}: CustomizationDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleConfirm = () => {
    const allCustomizations = [
      ...selectedOptions,
      customNotes.trim() ? `Additional notes: ${customNotes}` : ""
    ].filter(Boolean).join("; ");
    
    onConfirm(allCustomizations || "", quantity);
    
    // Reset state
    setQuantity(1);
    setCustomNotes("");
    setSelectedOptions([]);
    onOpenChange(false);
  };

  const toggleOption = (optionTitle: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionTitle) 
        ? prev.filter(o => o !== optionTitle)
        : [...prev, optionTitle]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Customize Your Order</DialogTitle>
          <DialogDescription className="text-base">
            {productTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 sm:space-y-6 py-3 sm:py-4">
          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-32"
            />
          </div>

          {/* Quick Customization Options */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Customization Options</Label>
            <p className="text-sm text-muted-foreground">Select all that apply to your order</p>
            <div className="space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
              {commonCustomizations.map((option) => (
                <div
                  key={option.title}
                  onClick={() => toggleOption(option.title)}
                  className={`
                    relative flex items-start gap-3 p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedOptions.includes(option.title) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
                    }
                  `}
                >
                  <Checkbox
                    id={option.title}
                    checked={selectedOptions.includes(option.title)}
                    onCheckedChange={() => toggleOption(option.title)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor={option.title}
                      className="text-sm font-semibold leading-none cursor-pointer block"
                    >
                      {option.title}
                    </label>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Customization Details</Label>
            <Textarea
              id="notes"
              placeholder="Describe any specific requirements, preferences, or special instructions..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Our team will review your customization requests and contact you for any clarifications
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="shadow-gold w-full sm:w-auto">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
