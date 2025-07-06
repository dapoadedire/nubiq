export default function Home() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Sales Overview</h2>
          <p className="text-muted-foreground">
            Quick overview of your sales performance and metrics.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
          <p className="text-muted-foreground">
            Track your most recent customer orders and their status.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Customer Insights</h2>
          <p className="text-muted-foreground">
            Get insights about your customer base and their activity.
          </p>
        </div>
      </div>
    </div>
  );
}
