import { useEffect, useState, useRef } from "react";

interface StatProps {
  value: string;
  label: string;
  suffix?: string;
  decimals?: number;
}

function Statistic({ value, label, suffix = "", decimals = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const targetValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, targetValue]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-stat-value">
        {displayValue}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-muted-foreground" data-testid="text-stat-label">
        {label}
      </div>
    </div>
  );
}

export default function StatisticsBanner() {
  const stats = [
    { value: "2.8", label: "Milliards d'Euros d'Actifs", suffix: "Md€", decimals: 1 },
    { value: "30", label: "Ans d'Expérience", suffix: "+" },
    { value: "1200", label: "Familles Clientes", suffix: "+" },
    { value: "96", label: "Taux de Satisfaction Client", suffix: "%" },
  ];

  return (
    <section className="py-20 md:py-24 bg-muted" data-testid="section-statistics">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <Statistic key={index} {...stat} />
          ))}
        </div>
        <p className="text-center text-muted-foreground text-xs mt-8" data-testid="text-finzzle-note">
          *Chiffres de 2024, du groupe Finzzle dont Constancium est membre.
        </p>
      </div>
    </section>
  );
}
