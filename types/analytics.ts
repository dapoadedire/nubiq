export type Period = 'day' | 'week' | 'month' | 'year';

export type OrderStatus = 'CANCELLED' | 'DELIVERED' | 'PENDING' | 'SHIPPED' | 'REFUNDED' | 'PROCESSING';

export interface SalesOverview {
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  orderCounts: Array<{
    _count: { id: number };
    status: OrderStatus;
  }>;
  conversionRate: number;
}

export interface RegionalSales {
  region: string;
  revenue: number;
}

export interface CategorySales {
  category: string;
  revenue: number;
}

export interface TrafficAnalytics {
  sources: Array<{ 
    source: string; 
    count: number; 
  }>;
  devices: Array<{ 
    device: string; 
    count: number; 
  }>;
  timeSpent: {
    averageTimeSeconds: number;
    timeByPage: Array<{ 
      page: string; 
      averageSeconds: number; 
    }>;
  };
  bounceRate: {
    bounceRate: number;
    exitPages: Array<{ 
      page: string; 
      count: number; 
    }>;
  };
}

export interface AnalyticsApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}