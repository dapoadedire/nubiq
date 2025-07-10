'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Download 
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
import MetricCard from '@/components/analytics/MetricCard';
import RevenueChart from '@/components/analytics/RevenueChart';
import RegionalChart from '@/components/analytics/RegionalChart';
import CategoryChart from '@/components/analytics/CategoryChart';
import TrafficAnalytics from '@/components/analytics/TrafficAnalytics';
import ErrorState from '@/components/analytics/ErrorBoundary';

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

  return (
    <div className="flex-1 p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your sales performance and trends
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={(value: Period) => setPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(getRevenue())}
          icon={DollarSign}
          isLoading={salesLoading}
          trend="up"
        />
        <MetricCard
          title="Total Orders"
          value={getTotalOrders()}
          icon={ShoppingCart}
          isLoading={salesLoading}
          trend="up"
        />
        <MetricCard
          title="Delivered Orders"
          value={getDeliveredOrders()}
          icon={Package}
          isLoading={salesLoading}
          trend="up"
        />
        <MetricCard
          title="Conversion Rate"
          value={salesData?.conversionRate ? `${(salesData.conversionRate * 100).toFixed(1)}%` : '0%'}
          icon={TrendingUp}
          isLoading={salesLoading}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={salesData} isLoading={salesLoading} />
        <RegionalChart data={regionalData} isLoading={regionalLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={categoryData} isLoading={categoryLoading} />
        <div className="lg:col-span-1">
          {categoryError ? (
            <ErrorState 
              title="Failed to load category data" 
              onRetry={refetchCategory}
            />
          ) : null}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Traffic Analytics</h2>
        {trafficError ? (
          <ErrorState 
            title="Failed to load traffic data" 
            onRetry={refetchTraffic}
          />
        ) : (
          <TrafficAnalytics data={trafficData} isLoading={trafficLoading} />
        )}
      </div>
    </div>
  );
}