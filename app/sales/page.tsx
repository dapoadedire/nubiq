'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Download,
  ArrowUp,
  ArrowDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Period } from '@/types/analytics';
import { 
  useSalesOverview, 
  useRegionalSales, 
  useCategorySales, 
  useTrafficAnalytics 
} from '@/hooks/useAnalytics';
import RevenueChart from '@/components/analytics/RevenueChart';
import RegionalChart from '@/components/analytics/RegionalChart';
import CategoryChart from '@/components/analytics/CategoryChart';
import TrafficAnalytics from '@/components/analytics/TrafficAnalytics';
import ErrorState from '@/components/analytics/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SalesPage() {
  const [period, setPeriod] = useState<Period>('week');
  
  const { data: salesData, isLoading: salesLoading, error: salesError, refetch: refetchSales } = useSalesOverview(period);
  const { data: regionalData, isLoading: regionalLoading } = useRegionalSales(period);
  const { data: categoryData, isLoading: categoryLoading, error: categoryError, refetch: refetchCategory } = useCategorySales(period);
  const { data: trafficData, isLoading: trafficLoading, error: trafficError, refetch: refetchTraffic } = useTrafficAnalytics(period);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRevenue = () => {
    if (!salesData) return 0;
    switch (period) {
      case 'day':
        return salesData.dailyRevenue;
      case 'week':
        return salesData.weeklyRevenue;
      case 'month':
        return salesData.monthlyRevenue;
      case 'year':
        return salesData.yearlyRevenue;
      default:
        return salesData.weeklyRevenue;
    }
  };

  const getTotalOrders = () => {
    if (!salesData?.orderCounts) return 0;
    return salesData.orderCounts.reduce((sum, order) => sum + order._count.id, 0);
  };

  const getDeliveredOrders = () => {
    if (!salesData?.orderCounts) return 0;
    const delivered = salesData.orderCounts.find(order => order.status === 'DELIVERED');
    return delivered?._count.id || 0;
  };

  const getRevenueChange = () => {
    if (!salesData) return { value: '0%', trend: 'neutral' as const };
    // This is a placeholder - in a real app, you would compare to previous period
    const change = 12.5;
    return { 
      value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`, 
      trend: change >= 0 ? 'up' as const : 'down' as const
    };
  };

  const getOrdersChange = () => {
    if (!salesData) return { value: '0%', trend: 'neutral' as const };
    // This is a placeholder - in a real app, you would compare to previous period
    const change = 8.3;
    return { 
      value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`, 
      trend: change >= 0 ? 'up' as const : 'down' as const
    };
  };

  const handleExport = () => {
    console.log('Export functionality would be implemented here');
  };

  if (salesError) {
    return (
      <div className="flex-1 p-8">
        <ErrorState 
          title="Failed to load sales data" 
          message="Unable to connect to the analytics service. Please try again."
          onRetry={refetchSales}
        />
      </div>
    );
  }

  const revenueChange = getRevenueChange();
  const ordersChange = getOrdersChange();

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={(value: Period) => setPeriod(value)}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Comprehensive insights into your sales performance and trends
        </p>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Revenue</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold">{formatCurrency(getRevenue())}</span>
                <div className={`flex items-center text-sm font-medium ${revenueChange.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {revenueChange.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {revenueChange.value}
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="p-2 rounded-full bg-blue-50/50">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Orders</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold">{getTotalOrders()}</span>
                <div className={`flex items-center text-sm font-medium ${ordersChange.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {ordersChange.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {ordersChange.value}
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="p-2 rounded-full bg-indigo-50/50">
                <ShoppingCart className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Delivered</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold">{getDeliveredOrders()}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {getTotalOrders() > 0 ? `${Math.round((getDeliveredOrders() / getTotalOrders()) * 100)}%` : '0%'}
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="p-2 rounded-full bg-green-50/50">
                <Package className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground mb-1">Conversion</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold">
                  {salesData?.conversionRate ? `${(salesData.conversionRate * 100).toFixed(1)}%` : '0%'}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Goal: 4.0%
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="p-2 rounded-full bg-amber-50/50">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Revenue Overview</h2>
              </div>
              <Separator />
              <div className="p-6">
                {salesError ? (
                  <ErrorState 
                    title="Failed to load revenue data" 
                    onRetry={refetchSales}
                  />
                ) : (
                  <div className="h-[300px]">
                    <RevenueChart data={salesData} isLoading={salesLoading} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Regional Distribution</h2>
              </div>
              <Separator />
              <div className="p-6">
                <div className="h-[300px]">
                  <RegionalChart data={regionalData} isLoading={regionalLoading} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Sales by Category</h2>
              </div>
              <Separator />
              <div className="p-6">
                {categoryError ? (
                  <ErrorState 
                    title="Failed to load category data" 
                    onRetry={refetchCategory}
                  />
                ) : (
                  <div className="h-[300px]">
                    <CategoryChart data={categoryData} isLoading={categoryLoading} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Traffic Analytics</h2>
              </div>
              <Separator />
              <div className="p-6">
                {trafficError ? (
                  <ErrorState 
                    title="Failed to load traffic data" 
                    onRetry={refetchTraffic}
                  />
                ) : (
                  <TrafficAnalytics data={trafficData} isLoading={trafficLoading} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}