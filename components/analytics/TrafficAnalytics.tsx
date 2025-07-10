import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TrafficAnalytics as TrafficAnalyticsType } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface TrafficAnalyticsProps {
  data?: TrafficAnalyticsType;
  isLoading?: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TrafficAnalytics({ data, isLoading }: TrafficAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-[180px] w-full" />
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-[180px] w-full" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-sm font-medium">Traffic Sources</h3>
            </div>
            <Separator />
            <div className="p-4">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <XAxis dataKey="source" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      formatter={(value) => [`${value} visits`, 'Count']}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-sm font-medium">Device Usage</h3>
            </div>
            <Separator />
            <div className="p-4">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="count"
                      label={({ device, percent }) => 
                        `${device}: ${((percent || 0) * 100).toFixed(0)}%`
                      }
                      labelLine={{ stroke: '#ccc', strokeWidth: 0.5, strokeDasharray: '2 2' }}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} visits`, 'Count']}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-sm font-medium">User Engagement</h3>
            </div>
            <Separator />
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Average Time on Site</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xl font-semibold">
                      {data?.timeSpent.averageTimeSeconds 
                        ? `${Math.floor(data.timeSpent.averageTimeSeconds / 60)}m ${data.timeSpent.averageTimeSeconds % 60}s`
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Bounce Rate</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xl font-semibold">
                      {data?.bounceRate.bounceRate 
                        ? `${(data.bounceRate.bounceRate * 100).toFixed(1)}%`
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-sm font-medium">Time by Page</h3>
            </div>
            <Separator />
            <div className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-3/4">Page</TableHead>
                    <TableHead className="text-right">Avg. Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.timeSpent.timeByPage.slice(0, 5).map((page, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-sm truncate max-w-[200px]">{page.page}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {Math.floor(page.averageSeconds / 60)}m {page.averageSeconds % 60}s
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}