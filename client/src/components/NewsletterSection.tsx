import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubscribed(true);
    toast({
      title: "Welcome to our community!",
      description: "Check your email for a 10% discount code.",
    });
    setEmail("");
  };

  return (
    <section className="py-12 md:py-20 bg-accent">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" data-testid="text-newsletter-headline">
          Join Our Maker Community
        </h2>
        <p className="text-lg text-muted-foreground mb-6" data-testid="text-newsletter-description">
          Get early access to new designs, exclusive discounts, and behind-the-scenes stories from our artisans.
        </p>

        <ul className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          <li className="flex items-center gap-2" data-testid="text-benefit-1">
            <Check className="h-4 w-4 text-primary" />
            Early access to new collections
          </li>
          <li className="flex items-center gap-2" data-testid="text-benefit-2">
            <Check className="h-4 w-4 text-primary" />
            Exclusive member discounts
          </li>
          <li className="flex items-center gap-2" data-testid="text-benefit-3">
            <Check className="h-4 w-4 text-primary" />
            Behind-the-scenes stories
          </li>
        </ul>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              data-testid="input-newsletter-email"
            />
            <Button type="submit" data-testid="button-subscribe">
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-primary" data-testid="text-subscribed">
            <Check className="h-5 w-5" />
            <span className="font-medium">You're subscribed! Check your email.</span>
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground" data-testid="text-subscriber-count">
          Join 5,000+ subscribers
        </p>
      </div>
    </section>
  );
}
