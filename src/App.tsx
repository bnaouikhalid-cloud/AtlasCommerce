/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Search,
  Bell,
  Settings,
  Menu,
  X,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const revenueData = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 139 },
  { name: 'Mar', revenue: 2000, orders: 980 },
  { name: 'Apr', revenue: 2780, orders: 390 },
  { name: 'May', revenue: 1890, orders: 480 },
  { name: 'Jun', revenue: 2390, orders: 380 },
  { name: 'Jul', revenue: 3490, orders: 430 },
  { name: 'Aug', revenue: 4000, orders: 240 },
  { name: 'Sep', revenue: 3000, orders: 139 },
  { name: 'Oct', revenue: 2000, orders: 980 },
  { name: 'Nov', revenue: 2780, orders: 390 },
  { name: 'Dec', revenue: 3490, orders: 430 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Youssef Benali', product: 'Handwoven Berber Rug', date: '2023-10-24', amount: 1250, status: 'Delivered' },
  { id: '#ORD-002', customer: 'Fatima Zahra', product: 'Argan Oil 500ml', date: '2023-10-24', amount: 350, status: 'Processing' },
  { id: '#ORD-003', customer: 'Karim Tazi', product: 'Leather Travel Bag', date: '2023-10-23', amount: 890, status: 'Shipped' },
  { id: '#ORD-004', customer: 'Amina Chraibi', product: 'Mint Tea Set', date: '2023-10-23', amount: 420, status: 'Delivered' },
  { id: '#ORD-005', customer: 'Omar El Fassi', product: 'Ceramic Tagine', date: '2023-10-22', amount: 280, status: 'Pending' },
];

// --- Components ---

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "bg-[#0f1535]/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
    className
  )}>
    {children}
  </div>
);

const KPICard = ({ title, value, change, isPositive, icon: Icon }: any) => (
  <GlassCard className="p-5 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <span className={cn(
          "text-xs font-bold flex items-center",
          isPositive ? "text-emerald-400" : "text-rose-400"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {change}
        </span>
      </div>
    </div>
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0075FF] to-[#00C6FF] flex items-center justify-center shadow-lg shadow-blue-500/30">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </GlassCard>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b19] text-white font-sans selection:bg-blue-500/30 overflow-hidden flex">
      {/* Background Orbs for Glassmorphism Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0075FF]/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#E100FF]/20 blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full p-4">
          <GlassCard className="h-full flex flex-col">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0075FF] to-[#00C6FF] flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">Atlas<span className="font-light">Commerce</span></span>
              </div>
              <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 py-2">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', active: true },
                { icon: ShoppingCart, label: 'Orders' },
                { icon: Package, label: 'Products' },
                { icon: Users, label: 'Customers' },
                { icon: TrendingUp, label: 'Analytics' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    item.active 
                      ? "bg-white/10 text-white shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] border border-white/5" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    item.active ? "bg-gradient-to-br from-[#0075FF] to-[#00C6FF] text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-400"
                  )}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="p-4 mt-auto">
              <GlassCard className="p-4 bg-gradient-to-br from-[#0075FF]/20 to-[#E100FF]/20 border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 backdrop-blur-md border border-white/20">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Need help?</h4>
                <p className="text-xs text-gray-300 mb-3">Please check our docs</p>
                <button className="w-full py-2 px-4 bg-white text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  DOCUMENTATION
                </button>
              </GlassCard>
            </div>
          </GlassCard>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span>Pages</span>
                <span>/</span>
                <span className="text-white">Dashboard</span>
              </div>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#0f1535]/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Type here..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-400 w-48"
              />
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer group">
              <img 
                src="https://picsum.photos/seed/moroccan/100/100" 
                alt="User" 
                className="w-9 h-9 rounded-full border-2 border-white/10 group-hover:border-[#0075FF] transition-colors object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-medium text-gray-300 hidden sm:block group-hover:text-white transition-colors">Amine B.</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 z-10">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Today's Money" value="53,000 MAD" change="+55%" isPositive={true} icon={Wallet} />
              <KPICard title="Today's Users" value="2,300" change="+3%" isPositive={true} icon={Users} />
              <KPICard title="New Clients" value="+3,462" change="-2%" isPositive={false} icon={CreditCard} />
              <KPICard title="Total Sales" value="103,430 MAD" change="+5%" isPositive={true} icon={ShoppingCart} />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlassCard className="lg:col-span-2 p-6 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white">Sales Overview</h2>
                  <p className="text-sm text-emerald-400 flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span className="font-bold">+5% more</span> <span className="text-gray-400 ml-1">in 2023</span>
                  </p>
                </div>
                <div className="flex-1 min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0075FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0075FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 21, 53, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#0075FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white">Active Users</h2>
                  <p className="text-sm text-emerald-400 flex items-center mt-1">
                    <span className="font-bold">(+23%)</span> <span className="text-gray-400 ml-1">than last week</span>
                  </p>
                </div>
                <div className="flex-1 min-h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData.slice(-6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: 'rgba(15, 21, 53, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                      <Bar dataKey="orders" fill="#fff" radius={[4, 4, 0, 0]} barSize={10} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Users</p>
                    <p className="text-lg font-bold text-white">32,984</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#0075FF] w-[60%] h-full rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Clicks</p>
                    <p className="text-lg font-bold text-white">2.42m</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#0075FF] w-[80%] h-full rounded-full" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Recent Orders Table */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Recent Orders</h2>
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    <span className="text-emerald-400 font-bold mr-1">30 done</span> this month
                  </p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">Order</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">Customer</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">Product</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">Amount</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, idx) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-4 px-4 border-b border-white/5">
                          <span className="text-sm font-bold text-white">{order.id}</span>
                        </td>
                        <td className="py-4 px-4 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <img 
                              src={`https://picsum.photos/seed/${order.customer.replace(' ', '')}/40/40`} 
                              alt={order.customer} 
                              className="w-8 h-8 rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{order.customer}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 border-b border-white/5">
                          <span className="text-sm text-gray-400">{order.product}</span>
                        </td>
                        <td className="py-4 px-4 border-b border-white/5">
                          <span className="text-sm font-medium text-white">{order.amount} MAD</span>
                        </td>
                        <td className="py-4 px-4 border-b border-white/5">
                          <span className={cn(
                            "px-3 py-1 text-xs font-bold rounded-full border",
                            order.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            order.status === 'Processing' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                            order.status === 'Shipped' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                            "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          )}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

          </div>
        </div>
      </main>
    </div>
  );
}

