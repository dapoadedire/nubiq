import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { SalesOverview } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';

interface RevenueChartProps {
  data?: SalesOverview;
  isLoading?: boolean;
}

export default function RevenueChart({ data, isLoading }: RevenueChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const chartData = data ? [
    { period: 'Daily', revenue: data.dailyRevenue },
    { period: 'Weekly', revenue: data.weeklyRevenue },
    { period: 'Monthly', revenue: data.monthlyRevenue },
    { period: 'Yearly', revenue: data.yearlyRevenue },
  ] : [];

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="period" />
              <YAxis />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}