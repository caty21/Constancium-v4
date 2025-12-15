import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating?: number;
}

export default function TestimonialCard({ quote, author, role, avatar, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 h-full" data-testid="card-testimonial">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
          />
        ))}
      </div>
      
      <blockquote className="font-display text-lg italic text-white/90 leading-relaxed mb-6" data-testid="text-quote">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {author.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-white" data-testid="text-author">
            {author}
          </div>
          <div className="text-sm text-white/60" data-testid="text-role">
            {role}
          </div>
        </div>
      </div>
    </Card>
  );
}
