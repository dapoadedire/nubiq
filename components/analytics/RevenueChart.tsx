import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { SalesOverview } from '@/types/analytics';

interface RevenueChartProps {
  data?: SalesOverview;
  isLoading?: boolean;
}

export default function RevenueChart({ data, isLoading }: RevenueChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const chartData = data ? [
    { period: 'Daily', revenue: data.dailyRevenue },
    { period: 'Weekly', revenue: data.weeklyRevenue },
    { period: 'Monthly', revenue: data.monthlyRevenue },
    { period: 'Yearly', revenue: data.yearlyRevenue },
  ] : [];

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
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <XAxis 
            dataKey="period" 
            tickLine={false} 
            axisLine={false}
            fontSize={12}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
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
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
            barSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}