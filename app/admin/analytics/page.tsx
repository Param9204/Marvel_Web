"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Clock,
  Eye,
  Globe,
  Monitor,
  Pause,
  Play,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Helper for device color
const deviceColors: Record<string, string> = {
  Desktop: "#ef4444",
  Mobile: "#f59e0b",
  Tablet: "#10b981",
};

export default function VisitorAnalytics() {
  const [liveUsers, setLiveUsers] = useState(127);
  const [isLive, setIsLive] = useState(true);
  const [timeRange, setTimeRange] = useState("24h");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  const [realTimeData, setRealTimeData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [browserData, setBrowserData] = useState<any[]>([]);
  const [pageViews, setPageViews] = useState<any[]>([]);

  useEffect(() => {
    setRealTimeData([
      { time: "00:00", users: 45 },
      { time: "00:05", users: 52 },
      { time: "00:10", users: 48 },
      { time: "00:15", users: 61 },
      { time: "00:20", users: 55 },
      { time: "00:25", users: 67 },
      { time: "00:30", users: 73 },
    ]);

    // Fetch location data
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLocationData(data);
        }
      })
      .catch((err) => console.error("Error fetching locations:", err));

    // Fetch device data
    fetch("/api/analytics/devices")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDeviceData(data);
        }
      })
      .catch((err) => console.error("Error fetching devices:", err));

    // Fetch visitors data
    fetch("/api/analytics/visitors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const feedItems = data.slice(0, 8).map((visitor: any) => ({
            id: visitor.id,
            action: `New visitor from ${visitor.location}`,
            time: `${Math.floor((Date.now() - new Date(visitor.timestamp).getTime()) / 1000)} seconds ago`,
            type: "visitor",
          }));
          setActivityFeed(feedItems);
        }
      })
      .catch((err) => console.error("Error fetching visitors:", err));

    setBrowserData([
      { browser: "Chrome", users: 3420, percentage: 54 },
      { browser: "Safari", users: 1890, percentage: 30 },
      { browser: "Firefox", users: 630, percentage: 10 },
      { browser: "Edge", users: 380, percentage: 6 },
    ]);
    setPageViews([
      { page: "/", views: 12450, avgTime: "2:34" },
      { page: "/products", views: 8920, avgTime: "3:12" },
      { page: "/products/iron-man-mattress", views: 5680, avgTime: "4:45" },
      { page: "/features", views: 4320, avgTime: "2:18" },
      { page: "/contact", views: 2890, avgTime: "1:56" },
    ]);
  }, []);

  useEffect(() => {
    let userInterval: NodeJS.Timeout;
    let timeInterval: NodeJS.Timeout;
    let activityInterval: NodeJS.Timeout;
    if (isLive) {
      userInterval = setInterval(() => {
        setLiveUsers((prev) =>
          Math.max(50, prev + Math.floor(Math.random() * 20) - 10)
        );
      }, 3000);
      timeInterval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      activityInterval = setInterval(() => {
        const newActivity = {
          id: Date.now(),
          action: "New visitor from New York, NY",
          time: "Just now",
          type: "visitor",
        };
        setActivityFeed((prev) => [newActivity, ...prev.slice(0, 7)]);
      }, 8000);
    }
    return () => {
      clearInterval(userInterval);
      clearInterval(timeInterval);
      clearInterval(activityInterval);
    };
  }, [isLive]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "visitor":
        return <Users className="h-4 w-4 text-blue-400" />;
      case "product":
        return <Eye className="h-4 w-4 text-green-400" />;
      case "offer":
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
      case "conversion":
        return <Activity className="h-4 w-4 text-red-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-wide">
            Visitor Analytics
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time visitor tracking and engagement insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-gray-300 hover:border-primary focus:ring-primary focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-gray-200">
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className={
              isLive
                ? "bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white shadow-xl hover:from-red-700 hover:to-pink-900"
                : "border-gray-600 text-gray-300"
            }
          >
            {isLive ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isLive ? "Live" : "Paused"}
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Live Users</p>
                <p className="text-2xl font-bold text-gray-100">{liveUsers}</p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-green-500/10 text-green-400 border-green-500/20"
                >
                  {isLive ? "Live" : "Paused"}
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <Activity className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Page Views</p>
                <p className="text-2xl font-bold text-gray-100">
                  {pageViews
                    .reduce((acc, cur) => acc + cur.views, 0)
                    .toLocaleString()}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-blue-500/10 text-blue-400 border-blue-500/20"
                >
                  +12.5%
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Avg. Session
                </p>
                <p className="text-2xl font-bold text-gray-100">3:42</p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-green-500/10 text-green-400 border-green-500/20"
                >
                  +8.2%
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-100">24.8%</p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                >
                  -3.1%
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Users */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-red-500" />
              Real-time Users
            </CardTitle>
            <CardDescription>
              Live user activity over the last 30 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Device Breakdown */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-red-500" />
              Device Usage
            </CardTitle>
            <CardDescription>Visitor device distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {device.device === "Desktop" && (
                      <Monitor className="h-5 w-5 text-gray-400" />
                    )}
                    {device.device === "Mobile" && (
                      <Smartphone className="h-5 w-5 text-gray-400" />
                    )}
                    {device.device === "Tablet" && (
                      <Tablet className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="text-gray-100 font-medium">
                      {device.device}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-100 font-bold">
                      {device.users.toLocaleString()}
                    </span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${device.percentage}%`,
                          backgroundColor: device.color,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-12">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location and Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Insights */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-red-500" />
              Location Insights
            </CardTitle>
            <CardDescription>
              Top visitor locations with city breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {locationData.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <p className="text-gray-100 font-medium">
                        {location.city}
                      </p>
                      <p className="text-sm text-gray-400">
                        {location.state}, {location.country}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-100 font-bold">
                      {location.users.toLocaleString()}
                    </span>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className="bg-red-500 h-1 rounded-full"
                        style={{ width: `${(location.users / 1240) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-red-500" />
              Live Activity Feed
            </CardTitle>
            <CardDescription>
              Real-time visitor actions and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {activityFeed.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-gray-100 text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="h-5 w-5 mr-2 text-red-500" />
              Top Pages
            </CardTitle>
            <CardDescription>
              Most visited pages and engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pageViews.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-gray-100 font-medium">{page.page}</p>
                    <p className="text-sm text-gray-400">
                      Avg. time: {page.avgTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-100 font-bold">
                      {page.views.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-400">views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browser Stats */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-red-500" />
              Browser Distribution
            </CardTitle>
            <CardDescription>Visitor browser preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {browserData.map((browser, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-sm" />
                    <span className="text-gray-100 font-medium">
                      {browser.browser}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-100 font-bold">
                      {browser.users.toLocaleString()}
                    </span>
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${browser.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-8">
                      {browser.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
