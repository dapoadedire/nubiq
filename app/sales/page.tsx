import {
  Download,
  BarChart4,
  ClipboardList,
  PackageCheck,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Function to get background color class based on the color name
const getColorClass = (color: string, intensity: string) => {
  const colorMap: Record<string, Record<string, string>> = {
    rose: {
      "100": "bg-rose-100",
      "300": "bg-rose-300",
    },
    amber: {
      "100": "bg-amber-100",
      "300": "bg-amber-300",
    },
    green: {
      "100": "bg-green-100",
      "300": "bg-green-300",
    },
    violet: {
      "100": "bg-violet-100",
      "300": "bg-violet-300",
    },
  };

  return colorMap[color]?.[intensity] || "";
};

// Sales summary data
const salesSummary = [
  {
    label: "Total Sales",
    value: "$12,426",
    change: "+16% from last month",
    color: "green",
    icon: <BarChart4 size={20} />,
  },
  {
    label: "Orders",
    value: "436",
    change: "+8% from last month",
    color: "amber",
    icon: <ClipboardList size={20} />,
  },
  {
    label: "Delivered",
    value: "385",
    change: "+12% from last month",
    color: "violet",
    icon: <PackageCheck size={20} />,
  },
  {
    label: "New Customers",
    value: "64",
    change: "+24% from last month",
    color: "rose",
    icon: <UserPlus size={20} />,
  },
];

export default function SalesPage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Sales Analytics</h1>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-[70fr_30fr] gap-6">
        <div className="p-4 bg-white rounded-xl flex flex-col gap-4 shadow">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-2xl font-bold text-gray-800">
                Today&apos;s Sales Summary
              </h2>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 flex items-center">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>
          <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-4">
            {salesSummary.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer",
                  getColorClass(item.color, "100")
                )}
              >
                <div className="flex flex-col items-start gap-3 w-full">
                  <div
                    className={cn(
                      "rounded-full text-white p-2.5",
                      getColorClass(item.color, "300")
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-start gap-1 w-full">
                    <p className="text-sm md:text-base font-medium text-gray-600">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold my-1">{item.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center">
                      {item.change}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">Top Products</h2>
          <p className="text-muted-foreground">
            Detailed product performance analytics coming soon. This will show
            your best-selling products and their metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
