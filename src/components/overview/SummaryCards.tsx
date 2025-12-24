import { PieChart, Users, Wallet, FileText } from 'lucide-react';
import { formatCurrency, formatSlices } from '@/lib/calculations';

interface SummaryCardsProps {
  totalSlices: number;
  activeFounders: number;
  totalCash: number;
  totalEntries: number;
}

export function SummaryCards({ totalSlices, activeFounders, totalCash, totalEntries }: SummaryCardsProps) {
  const stats = [
    {
      label: 'Total Slices',
      value: formatSlices(totalSlices),
      icon: <PieChart className="h-5 w-5" />,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Active Founders',
      value: String(activeFounders),
      icon: <Users className="h-5 w-5" />,
      color: 'text-category-salary',
      bg: 'bg-green-50',
    },
    {
      label: 'Cash Invested',
      value: formatCurrency(totalCash),
      icon: <Wallet className="h-5 w-5" />,
      color: 'text-category-cash',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Entries',
      value: String(totalEntries),
      icon: <FileText className="h-5 w-5" />,
      color: 'text-category-time',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="stat-card animate-fade-in"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="financial-number text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
