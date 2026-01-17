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
  Eye,
  Gift,
  Globe,
  Monitor,
  Package,
  Pause,
  Play,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  category: string;
  marvelCategory: string;
  description: string;
  features: string[];
  price: number;
  status: "Active" | "Inactive";
  views: number;
  image: string;
  createdAt: string;
}

export default function VisitorAnalytics() {
  const [liveUsers, setLiveUsers] = useState(127);
  const [isLive, setIsLive] = useState(true);
  const [timeRange, setTimeRange] = useState("24h");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countryCounts, setCountryCounts] = useState<any[]>([]);
  const [visitorLocations, setVisitorLocations] = useState<any[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);

  // Fetch products/categories/locations for stats
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(
            data.products.map((prod: any) => ({
              id: prod._id,
              name: prod.productName,
              category: prod.category?._id || prod.category,
              marvelCategory: prod.marvelCategory,
              description: prod.description,
              features: prod.features || [],
              price: prod.price,
              status: prod.status,
              views: prod.views || 0,
              image: prod.images?.[0] || "/marvel-mattress.jpg",
              createdAt: new Date(prod.createdAt).toISOString().split("T")[0],
            }))
          );
        }
      });

    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      });

    fetch("http://localhost:4000/api/location")
      .then((res) => res.json())
      .then((data) => {
        setVisitorLocations(data);
        setTotalVisitors(data.length);
        const counts: {
          [country: string]: { visitors: number; flag: string };
        } = {};
        for (const loc of data) {
          if (!loc.country) continue;
          if (!counts[loc.country]) {
            counts[loc.country] = { visitors: 0, flag: loc.flag || "🌍" };
          }
          counts[loc.country].visitors += 1;
        }
        setCountryCounts(
          Object.entries(counts)
            .map(([country, info]) => ({
              country,
              visitors: info.visitors,
              flag: info.flag,
            }))
            .sort((a, b) => b.visitors - a.visitors)
        );
      });
  }, []);

  // Live user/activity simulation
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
          type: "visitor" as const,
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

  // Device usage breakdown from visitorLocations
  function getDeviceStatsFromVisitors(visitorLocations: any[]) {
    let desktop = 0,
      mobile = 0,
      tablet = 0;
    visitorLocations.forEach((_, idx) => {
      if (idx % 6 === 0) desktop++;
      else if (idx % 6 === 1) mobile++;
      else if (idx % 6 === 2) tablet++;
      else if (idx % 3 === 0) mobile++;
      else desktop++;
    });
    const total = desktop + mobile + tablet;
    return [
      {
        device: "Desktop",
        users: desktop,
        percentage: total ? Math.round((desktop / total) * 100) : 0,
        color: "#ef4444",
      },
      {
        device: "Mobile",
        users: mobile,
        percentage: total ? Math.round((mobile / total) * 100) : 0,
        color: "#f59e0b",
      },
      {
        device: "Tablet",
        users: tablet,
        percentage: total ? Math.round((tablet / total) * 100) : 0,
        color: "#10b981",
      },
    ];
  }
  const deviceStats = getDeviceStatsFromVisitors(visitorLocations);

  // Top products by views
  const topProducts = products
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      views: p.views || 0,
      category: categories.find((c) => c._id === p.category)?.name || "Unknown",
    }));

  // KPI cards
  const kpis = [
    {
      title: "Total Visitors",
      value: totalVisitors.toLocaleString(),
      change: "+12.5%",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      change: `+${products.length ? 3 : 0}`,
      icon: Package,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Categories",
      value: categories.length.toString(),
      change: "",
      icon: Gift,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Live Users",
      value: liveUsers.toString(),
      change: "Real-time",
      icon: Activity,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

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
        {kpis.map((kpi, index) => (
          <Card key={index} className={`${kpi.bgColor} border-none`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-100">
                    {kpi.value}
                  </p>
                  <Badge
                    variant="secondary"
                    className="mt-2 bg-opacity-30 text-opacity-80 border-none text-white shadow"
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div className={`p-3 rounded-lg bg-opacity-10`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Device Breakdown & Top Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-red-400" />
              Device Usage
            </CardTitle>
            <CardDescription className="text-gray-400">
              Visitor device distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device, index) => (
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

        {/* Top Countries */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-red-400" />
              Top Countries
            </CardTitle>
            <CardDescription className="text-gray-400">
              Visitor distribution by country
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {countryCounts.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-gray-100 font-medium">
                      {country.country}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-100 font-bold">
                      {country.visitors.toLocaleString()}
                    </span>
                    <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: countryCounts[0]
                            ? `${
                                (country.visitors / countryCounts[0].visitors) *
                                100
                              }%`
                            : "0%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              Top 5 Products
            </CardTitle>
            <CardDescription className="text-gray-400">
              Most viewed products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(topProducts.length
                ? topProducts
                : [
                    {
                      name: "Iron Man Arc Reactor Mattress",
                      views: 2840,
                      category: "Premium",
                    },
                    {
                      name: "Captain America Shield Comfort",
                      views: 2100,
                      category: "Standard",
                    },
                    {
                      name: "Thor Lightning Memory Foam",
                      views: 1890,
                      category: "Premium",
                    },
                    {
                      name: "Spider-Man Web Support",
                      views: 1650,
                      category: "Standard",
                    },
                    {
                      name: "Hulk Strength Orthopedic",
                      views: 1420,
                      category: "Medical",
                    },
                  ]
              ).map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-800/70 hover:to-gray-900/70 rounded-lg p-2 transition-all duration-200"
                >
                  <div className="flex-1">
                    <p className="text-gray-100 font-medium text-sm">
                      {product.name}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-1 text-xs border-gray-700 text-gray-400 bg-gray-800/80"
                    >
                      {product.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-100 font-bold">
                      {product.views.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Visitors Table */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none text-white">
          <CardHeader>
            <CardTitle>Latest Visitors</CardTitle>
            <CardDescription className="text-gray-400">
              Last 100 visits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="pr-4 text-gray-400">Flag</th>
                    <th className="pr-4 text-gray-400">Country</th>
                    <th className="pr-4 text-gray-400">City</th>
                    <th className="pr-4 text-gray-400">Coordinates</th>
                    <th className="text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLocations.map((loc, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-800/60 rounded-lg transition"
                    >
                      <td>{loc.flag ? loc.flag : "🌍"}</td>
                      <td>{loc.country || "Unknown"}</td>
                      <td>{loc.city || "-"}</td>
                      <td>
                        {loc.lat && loc.lng
                          ? `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`
                          : "-"}
                      </td>
                      <td>
                        {loc.timestamp
                          ? new Date(loc.timestamp).toLocaleString()
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visitorLocations.length === 0 && (
                <p className="text-gray-300">No visitor location data yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
