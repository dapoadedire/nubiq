import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrafficAnalytics as TrafficAnalyticsType } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TrafficAnalyticsProps {
  data?: TrafficAnalyticsType;
  isLoading?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function TrafficAnalytics({ data, isLoading }: TrafficAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const sourceData = data?.sources.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  })) || [];

  const deviceData = data?.devices.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  })) || [];

  const chartConfig = {
    count: {
      label: 'Count',
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sourceData}>
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ device, percent }) => `${device}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Average Time on Site</span>
                <span className="font-medium">
                  {data?.timeSpent.averageTimeSeconds 
                    ? `${Math.floor(data.timeSpent.averageTimeSeconds / 60)}m ${data.timeSpent.averageTimeSeconds % 60}s`
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Bounce Rate</span>
                <span className="font-medium">
                  {data?.bounceRate.bounceRate 
                    ? `${(data.bounceRate.bounceRate * 100).toFixed(1)}%`
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time by Page</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Avg. Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.timeSpent.timeByPage.slice(0, 5).map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{page.page}</TableCell>
                    <TableCell>
                      {Math.floor(page.averageSeconds / 60)}m {page.averageSeconds % 60}s
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}