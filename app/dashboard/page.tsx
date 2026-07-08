"use client";

import { useState, useEffect, useCallback } from "react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  city: string;
  timestamp: string;
}

type TimeFilter = "thisWeek" | "thisMonth" | "prevMonth" | "allTime";

function formatTimestamp(timestamp: string) {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return date.toLocaleDateString();
  } catch {
    return timestamp;
  }
}

function filterByTime(data: FormData[], filter: TimeFilter): FormData[] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter) {
    case "thisWeek": {
      const dayOfWeek = now.getDay();
      const startOfWeek = new Date(startOfToday);
      startOfWeek.setDate(startOfToday.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      return data.filter((d) => {
        try {
          return new Date(d.timestamp) >= startOfWeek;
        } catch {
          return false;
        }
      });
    }
    case "thisMonth": {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return data.filter((d) => {
        try {
          return new Date(d.timestamp) >= startOfMonth;
        } catch {
          return false;
        }
      });
    }
    case "prevMonth": {
      const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return data.filter((d) => {
        try {
          const date = new Date(d.timestamp);
          return date >= startOfPrevMonth && date < startOfThisMonth;
        } catch {
          return false;
        }
      });
    }
    case "allTime":
    default:
      return data;
  }
}

// Line chart component
function LineChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const [animated, setAnimated] = useState(false);
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, [data]);

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 280 + 10,
    y: 100 - ((d.value - minValue) / range) * 80 - 10,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = pathD + ` L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-5 shadow-lg">
      <h3 className="text-[#4a2c6a] font-bold text-sm mb-4">{title}</h3>
      <div className={`transition-all duration-700 ${animated ? "opacity-100" : "opacity-0"}`}>
        <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="10" y1={10 + i * 26.6} x2="290" y2={10 + i * 26.6} stroke="#e8d8f0" strokeWidth="0.5" />
          ))}
          <path d={areaD} fill="url(#areaGradient)" opacity="0.3" />
          <path
            d={pathD}
            fill="none"
            stroke="#e85d75"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: animated ? "none" : "1000",
              strokeDashoffset: animated ? "0" : "1000",
              transition: "stroke-dashoffset 1.5s ease-out",
            }}
          />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4a2c6a" stroke="white" strokeWidth="2" />
          ))}
          {data.map((d, i) => (
            <text key={i} x={points[i].x} y="115" textAnchor="middle" fontSize="8" fill="#9b7bb8">
              {d.label}
            </text>
          ))}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e85d75" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e85d75" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// Day-to-day bar chart
function DayBarChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const [animated, setAnimated] = useState(false);
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, [data]);

  const barColors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#fb923c", "#e85d75"];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-5 shadow-lg">
      <h3 className="text-[#4a2c6a] font-bold text-sm mb-4">{title}</h3>
      <div className="flex items-end gap-3 h-44">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <span
              className="text-xs font-bold text-[#4a2c6a] transition-all duration-700"
              style={{
                opacity: animated ? 1 : 0,
                transitionDelay: `${i * 80 + 600}ms`,
              }}
            >
              {item.value}
            </span>
            <div className="w-full relative overflow-hidden" style={{ height: "130px" }}>
              <div
                className="absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out"
                style={{
                  height: animated ? `${Math.max((item.value / maxValue) * 100, 5)}%` : "0%",
                  background: `linear-gradient(180deg, ${barColors[i % barColors.length]}, ${barColors[i % barColors.length]}cc)`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                  }}
                />
              </div>
            </div>
            <span className="text-[9px] text-[#9b7bb8] font-medium truncate w-full text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stat card with animated counter
function StatCard({
  label,
  value,
  icon,
  color,
  suffix,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / end), 30);
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-5 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#9b7bb8] text-xs font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-[#4a2c6a]">
            {displayValue}
            {suffix || ""}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: color + "20" }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("thisWeek");

  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbwxpW_GAnB0p9SyBpWmIw46r3_yt_xYLQFv5pH2X3r65TGiT-ILWHUHbp71nQIs9nAuMg/exec";

  const isConfigured = !GOOGLE_SHEET_URL.includes("YOUR_GOOGLE_SCRIPT_ID");

  const DEMO_DATA: FormData[] = [
    { name: "Rahul Sharma", email: "rahul@example.com", mobile: "+91 98765 43210", city: "Mumbai", timestamp: "2025-06-28T10:30:00.000Z" },
    { name: "Priya Patel", email: "priya@example.com", mobile: "+91 87654 32109", city: "Delhi", timestamp: "2025-06-28T11:45:00.000Z" },
    { name: "Amit Kumar", email: "amit@example.com", mobile: "+91 76543 21098", city: "Bangalore", timestamp: "2025-06-29T09:15:00.000Z" },
    { name: "Sneha Gupta", email: "sneha@example.com", mobile: "+91 65432 10987", city: "Mumbai", timestamp: "2025-06-27T14:20:00.000Z" },
    { name: "Vikram Singh", email: "vikram@example.com", mobile: "+91 54321 09876", city: "Pune", timestamp: "2025-06-26T16:30:00.000Z" },
    { name: "Anita Desai", email: "anita@example.com", mobile: "+91 43210 98765", city: "Delhi", timestamp: "2025-06-25T08:45:00.000Z" },
    { name: "Karan Mehta", email: "karan@example.com", mobile: "+91 32109 87654", city: "Bangalore", timestamp: "2025-06-24T12:00:00.000Z" },
    { name: "Deepa Nair", email: "deepa@example.com", mobile: "+91 21098 76543", city: "Chennai", timestamp: "2025-06-23T10:15:00.000Z" },
    { name: "Ravi Kumar", email: "ravi@example.com", mobile: "+91 99887 76655", city: "Hyderabad", timestamp: "2025-05-15T09:00:00.000Z" },
    { name: "Meera Joshi", email: "meera@example.com", mobile: "+91 88776 65544", city: "Pune", timestamp: "2025-05-20T14:30:00.000Z" },
    { name: "Arjun Reddy", email: "arjun@example.com", mobile: "+91 77665 54433", city: "Hyderabad", timestamp: "2025-05-10T11:00:00.000Z" },
    { name: "Pooja Iyer", email: "pooja@example.com", mobile: "+91 66554 43322", city: "Chennai", timestamp: "2025-05-05T16:45:00.000Z" },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!isConfigured) {
      setData(DEMO_DATA);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${GOOGLE_SHEET_URL}?action=read`);
      const result = await response.json();
      if (result.status === "success" && result.data) {
        setData(result.data);
      } else {
        setError("No data found or unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Make sure the Google Apps Script is deployed and accessible.");
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtered data based on time filter
  const filteredData = filterByTime(data, timeFilter);

  // Weekly submissions from filtered data
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = weekDays.map((label, i) => ({
    label,
    value: Math.max(
      0,
      filteredData.filter((d) => {
        try {
          return new Date(d.timestamp).getDay() === (i + 1) % 7;
        } catch {
          return false;
        }
      }).length
    ),
  }));

  // Day-to-day submissions from filtered data
  const getDayToDayData = () => {
    const days: { label: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
      const dateStr = date.toDateString();
      const count = filteredData.filter((d) => {
        try {
          return new Date(d.timestamp).toDateString() === dateStr;
        } catch {
          return false;
        }
      }).length;
      days.push({ label: dayStr, value: count });
    }
    return days;
  };

  const dayToDayData = getDayToDayData();
  const uniqueCities = new Set(filteredData.map((d) => d.city.toLowerCase())).size;

  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  const filterLabels: { key: TimeFilter; label: string; icon: string }[] = [
    { key: "thisWeek", label: "This Week", icon: "📅" },
    { key: "thisMonth", label: "This Month", icon: "🗓️" },
    { key: "prevMonth", label: "Previous Month", icon: "⏮️" },
    { key: "allTime", label: "All Time", icon: "📊" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vibrant happy background */}
      <div
        className="fixed inset-0"
        style={{
          background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 20%, #e8eaf6 40%, #e0f7fa 60%, #fff9c4 80%, #fce4ec 100%)",
        }}
      />

      {/* Animated floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #f472b6, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 -right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)", animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-20 left-1/4 w-[450px] h-[450px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)", animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-[350px] h-[350px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #fbbf24, transparent 70%)", animationDelay: "3s" }}
        />
        <div
          className="absolute top-10 left-1/2 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #34d399, transparent 70%)", animationDelay: "1.5s" }}
        />

        {/* Floating confetti dots */}
        <div className="absolute top-[10%] left-[15%] w-3 h-3 rounded-full bg-pink-400/30 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }} />
        <div className="absolute top-[20%] right-[20%] w-2 h-2 rounded-full bg-purple-400/30 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
        <div className="absolute top-[50%] left-[8%] w-2.5 h-2.5 rounded-full bg-blue-400/30 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3.5s" }} />
        <div className="absolute top-[70%] right-[12%] w-3 h-3 rounded-full bg-yellow-400/30 animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "2.8s" }} />
        <div className="absolute top-[35%] left-[80%] w-2 h-2 rounded-full bg-emerald-400/30 animate-bounce" style={{ animationDelay: "2s", animationDuration: "3.2s" }} />
        <div className="absolute top-[85%] left-[40%] w-2.5 h-2.5 rounded-full bg-rose-400/30 animate-bounce" style={{ animationDelay: "0.8s", animationDuration: "2.6s" }} />
      </div>

      {/* Header */}
      <header
        className="relative text-white py-5 px-6 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #ec4899 70%, #f472b6 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 80">
            <pattern id="headerPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" opacity="0.4" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#headerPattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              UPLIFT Dashboard
            </h1>
            <p className="text-sm opacity-90 mt-0.5">Analytics & Insights ✨</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/25">
              <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
              <span className="text-sm font-medium">Live</span>
            </div>
            <button
              onClick={fetchData}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg border border-white/25"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        {/* Setup Banner */}
        {!isConfigured && (
          <div
            className="rounded-2xl p-4 mb-6 flex items-start gap-3 backdrop-blur-sm"
            style={{
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div>
              <p className="text-[#7c3aed] font-semibold text-sm">Demo Mode Active</p>
              <p className="text-[#9b7bb8] text-xs mt-0.5">
                Showing sample data. Connect your Google Sheet to see real submissions.
              </p>
            </div>
          </div>
        )}

        {/* Time Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterLabels.map((f) => (
            <button
              key={f.key}
              onClick={() => setTimeFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                timeFilter === f.key
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105"
                  : "bg-white/60 backdrop-blur-sm text-[#4a2c6a] border border-white/40 hover:bg-white/80 hover:shadow-md"
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
              {timeFilter === f.key && (
                <span className="ml-1 bg-white/25 px-1.5 py-0.5 rounded-md text-[10px] font-bold">
                  {filteredData.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Leads"
            value={filteredData.length}
            color="#ec4899"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            label="Cities Reached"
            value={uniqueCities}
            color="#a855f7"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
          <StatCard
            label="This Week"
            value={filterByTime(data, "thisWeek").length}
            color="#60a5fa"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            }
          />
          <StatCard
            label="Conversion"
            value={78}
            suffix="%"
            color="#fbbf24"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
              </svg>
            }
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <LineChart data={weeklyData} title="📈 Weekly Submissions" />
          <DayBarChart data={dayToDayData} title="📊 Day to Day Submissions" />
        </div>

        {/* Data Table */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-white/20 flex items-center justify-between">
            <h3 className="text-[#4a2c6a] font-bold text-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              Submissions
              <span className="text-[10px] font-normal bg-purple-100/60 text-purple-600 px-2 py-0.5 rounded-full">
                {filteredData.length} records
              </span>
            </h3>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-10 h-10 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mb-4"></div>
              <p className="text-[#4a2c6a] font-medium text-sm">Loading...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-6 text-center">
              <p className="text-red-500 text-sm">{error}</p>
              <button onClick={fetchData} className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-xs">
                Try Again
              </button>
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              {filteredData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#9b7bb8] text-sm">No submissions found for this period.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50/50">
                      <th className="text-left py-3 px-4 font-semibold text-xs text-[#7c3aed]">#</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs text-[#7c3aed]">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs text-[#7c3aed]">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs text-[#7c3aed]">Mobile</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs text-[#7c3aed]">City</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs text-[#7c3aed]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} className="border-b border-white/20 hover:bg-purple-50/30 transition-colors">
                        <td className="py-3 px-4 text-[#4a2c6a] font-medium text-xs">{index + 1}</td>
                        <td className="py-3 px-4 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-[#4a2c6a] font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#9b7bb8] text-xs">{item.email}</td>
                        <td className="py-3 px-4 text-[#4a2c6a] text-xs">{item.mobile}</td>
                        <td className="py-3 px-4 text-xs">
                          <span className="bg-purple-100/60 text-purple-700 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                            {item.city}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#9b7bb8] text-xs">{formatDate(item.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}