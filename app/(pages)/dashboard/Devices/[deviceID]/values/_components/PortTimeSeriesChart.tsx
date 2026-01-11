"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/Card/Card";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import {
  useValuesTimeseriesRQ,
  useValuesPortStatsRQ,
} from "@/app/_lib/_react-query-hooks/values/useValuesRQ";
import { Badge } from "@/app/_components/Badge/Badge";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

interface PortTimeSeriesChartProps {
  deviceId: string;
  device: IDevice;
  portKey: string;
  filters?: {
    startTime?: string;
    endTime?: string;
    limit?: number;
  };
}

export default function PortTimeSeriesChart({
  deviceId,
  device,
  portKey,
  filters,
}: PortTimeSeriesChartProps) {
  // Get port details
  const port = device.ports?.find((p) => p.portKey === portKey);

  // Fetch timeseries data
  const { data: timeseriesData, isLoading: timeseriesLoading } =
    useValuesTimeseriesRQ(deviceId, portKey, {
      startTime: filters?.startTime,
      endTime: filters?.endTime,
      limit: filters?.limit || 10000,
    });

  // Fetch stats if date range provided
  const { data: statsData, isLoading: statsLoading } = useValuesPortStatsRQ(
    deviceId,
    portKey,
    filters?.startTime ||
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    filters?.endTime || new Date().toISOString()
  );

  const chartData = useMemo(() => {
    if (!timeseriesData?.data?.dataPoints) return [];
    return timeseriesData.data.dataPoints;
  }, [timeseriesData]);

  const stats = statsData?.data;

  // Prepare simple ASCII chart
  const renderSimpleChart = () => {
    if (chartData.length === 0) return null;

    const values = chartData
      .map((dp) => {
        const val = typeof dp.value === "number" ? dp.value : 0;
        return val;
      })
      .filter((v) => !isNaN(v));

    if (values.length === 0) return null;

    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const height = 10;
    const width = Math.min(values.length, 100);

    // Create simple chart with ASCII blocks
    const rows: string[] = [];
    for (let h = height; h > 0; h--) {
      let row = "";
      for (let i = 0; i < width && i < values.length; i++) {
        const normalized = (values[i] - minVal) / range;
        const blocks = ["░", "▒", "▓", "█"];
        const blockIndex = Math.floor(normalized * blocks.length);
        row += blocks[Math.min(blockIndex, blocks.length - 1)];
      }
      rows.push(row);
    }

    return (
      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
        {rows.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
        <div className="text-center text-xs mt-2 text-gray-400">
          Min: {minVal.toFixed(2)} | Max: {maxVal.toFixed(2)} | Data points:{" "}
          {values.length}
        </div>
      </div>
    );
  };

  if (timeseriesLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  const portType = portKey?.substring(0, 2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {portType === "DI" && "🔘"}
                  {portType === "AI" && "📊"}
                  {portType === "MI" && "🔧"}
                </span>
                <div>
                  <CardTitle>{port?.name || portKey}</CardTitle>
                  <p className="text-sm text-gray-600">{portKey}</p>
                </div>
              </div>
            </div>
            {port?.unit && <Badge variant="info">{port.unit}</Badge>}
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-xs text-gray-600 mb-1">Count</p>
              <p className="text-2xl font-bold text-primary">{stats.count}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-xs text-gray-600 mb-1">Min</p>
              <p className="text-2xl font-bold text-blue-600">
                {typeof stats.minValue === "number"
                  ? stats.minValue.toFixed(2)
                  : stats.minValue}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-xs text-gray-600 mb-1">Max</p>
              <p className="text-2xl font-bold text-red-600">
                {typeof stats.maxValue === "number"
                  ? stats.maxValue.toFixed(2)
                  : stats.maxValue}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-xs text-gray-600 mb-1">Avg</p>
              <p className="text-2xl font-bold text-green-600">
                {typeof stats.avgValue === "number"
                  ? stats.avgValue.toFixed(2)
                  : stats.avgValue}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-xs text-gray-600 mb-1">Latest</p>
              <p className="text-2xl font-bold text-purple-600">
                {typeof stats.lastValue === "number"
                  ? stats.lastValue.toFixed(2)
                  : stats.lastValue}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ASCII Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Time Series Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {renderSimpleChart() ? (
            renderSimpleChart()
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No data available for this port</p>
              <p className="text-sm">
                Try adjusting your date range or check if the device has sent
                any values
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-300 bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Timestamp
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-gray-700">
                    Calibrated Value
                  </th>
                  {portType === "MI" && (
                    <th className="px-4 py-2 text-right font-semibold text-gray-700">
                      Raw Value
                    </th>
                  )}
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">
                    Quality
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.length > 0 ? (
                  chartData.slice(0, 50).map((dp, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-gray-700">
                        {new Date(dp.ts).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-primary">
                        {typeof dp.value === "number"
                          ? dp.value.toFixed(2)
                          : dp.value}
                      </td>
                      {portType === "MI" && (
                        <td className="px-4 py-2 text-right text-gray-600">
                          {typeof dp.rawValue === "number"
                            ? dp.rawValue.toFixed(2)
                            : dp.rawValue}
                        </td>
                      )}
                      <td className="px-4 py-2 text-center">
                        <Badge
                          variant={
                            dp.quality === "good"
                              ? "success"
                              : dp.quality === "bad"
                              ? "error"
                              : "warning"
                          }
                          className="text-xs"
                        >
                          {dp.quality || "unknown"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No data points available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {chartData.length > 50 && (
            <p className="text-xs text-gray-500 mt-4 text-center">
              Showing first 50 of {chartData.length} data points
            </p>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-700">
            <strong>💡 Note:</strong> Charts are rendered as ASCII
            visualizations for basic analysis. For advanced charting with zoom,
            pan, and interactive features, integrate a charting library like
            Chart.js or ApexCharts. The backend provides all necessary data
            points for visualization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
