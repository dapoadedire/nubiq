import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CategorySales } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryChartProps {
  data?: CategorySales[];
  isLoading?: boolean;
}

export default function CategoryChart({ data, isLoading }: CategoryChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const chartData = data || [];

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}