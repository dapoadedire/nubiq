import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CategorySales } from '@/types/analytics';

interface CategoryChartProps {
  data?: CategorySales[];
  isLoading?: boolean;
}

export default function CategoryChart({ data, isLoading }: CategoryChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const chartData = data || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <XAxis 
            type="number" 
            tickLine={false} 
            axisLine={false}
            tickFormatter={formatCurrency}
            fontSize={12}
          />
          <YAxis 
            dataKey="category" 
            type="category" 
            width={120} 
            tickLine={false} 
            axisLine={false}
            fontSize={12}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value as number), 'Revenue']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              border: 'none' 
            }}
          />
          <Bar 
            dataKey="revenue" 
            fill="#10b981" 
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}