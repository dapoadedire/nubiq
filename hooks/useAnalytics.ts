import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { 
  SalesOverview, 
  RegionalSales, 
  CategorySales, 
  TrafficAnalytics, 
  Period 
} from '@/types/analytics';

const fetchSalesOverview = async (period: Period): Promise<SalesOverview> => {
  const response = await api.get(`/api/v1/analytics/sales/overview?period=${period}`);
  return response.data;
};

const fetchRegionalSales = async (period: Period): Promise<RegionalSales[]> => {
  const response = await api.get(`/api/v1/analytics/sales/by-region?period=${period}`);
  return response.data;
};

const fetchCategorySales = async (period: Period): Promise<CategorySales[]> => {
  const response = await api.get(`/api/v1/analytics/sales/by-category?period=${period}`);
  return response.data;
};

const fetchTrafficAnalytics = async (period: Period): Promise<TrafficAnalytics> => {
  const response = await api.get(`/api/v1/analytics/traffic?period=${period}`);
  return response.data;
};

export const useSalesOverview = (period: Period) => {
  return useQuery({
    queryKey: ['sales-overview', period],
    queryFn: () => fetchSalesOverview(period),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useRegionalSales = (period: Period) => {
  return useQuery({
    queryKey: ['regional-sales', period],
    queryFn: () => fetchRegionalSales(period),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useCategorySales = (period: Period) => {
  return useQuery({
    queryKey: ['category-sales', period],
    queryFn: () => fetchCategorySales(period),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useTrafficAnalytics = (period: Period) => {
  return useQuery({
    queryKey: ['traffic-analytics', period],
    queryFn: () => fetchTrafficAnalytics(period),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};