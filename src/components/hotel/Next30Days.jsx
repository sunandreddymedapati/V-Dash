import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Table2 } from "lucide-react";

// Generate demo data
const generateData = () => {
  const arr = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const label = date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
    arr.push({
      date: label,
      occupancy: Math.round(75 + Math.random() * 20),
      adr: Math.round(110 + Math.random() * 40),
      revenue: Math.round(42000 + Math.random() * 5000),
      pickup_1: Math.floor(Math.random() * 12),
      pickup_3: Math.floor(Math.random() * 20),
      pickup_7: Math.floor(Math.random() * 35),
      pickup_14: Math.floor(Math.random() * 40),
      pickup_30: Math.floor(Math.random() * 45),
    });
  }
  return arr;
};

const demoData = generateData();

const PickupPeriods = [
  { key: "pickup_1", label: "1 Day" },
  { key: "pickup_3", label: "3 Days" },
  { key: "pickup_7", label: "7 Days" },
  { key: "pickup_14", label: "14 Days" },
  { key: "pickup_30", label: "30 Days" },
];

const Next30Days = () => {
  const [activeTab, setActiveTab] = useState("otb-forecast");
  const [view, setView] = useState("chart");
  const [pickupPeriod, setPickupPeriod] = useState("pickup_1");

  return (
    <Card className="rounded-xl shadow-sm mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Next 30 Days</CardTitle>
        <div>
          <Button
            size="sm"
            variant={view === "chart" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setView("chart")}
          >
            <BarChart3 className="w-4 h-4 mr-1" /> Chart
          </Button>
          <Button
            size="sm"
            variant={view === "table" ? "default" : "outline"}
            onClick={() => setView("table")}
          >
            <Table2 className="w-4 h-4 mr-1" /> Table
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="otb-forecast">OTB & Forecast</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="pickup">Pickup</TabsTrigger>
          </TabsList>

          {/* Chart View */}
          {view === "chart" && (
            <>
              <TabsContent value="otb-forecast">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" label={{ value: 'ADR ($)', position: 'insideLeft', angle: -90 }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Occupancy (%)', position: 'insideRight', angle: 90 }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="adr"
                        stroke="#34a853"
                        name="ADR ($)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="occupancy"
                        stroke="#2563eb"
                        name="Occupancy (%)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="revenue">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'Revenue ($)', position: 'insideLeft', angle: -90 }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#ef4444"
                        name="OTB Revenue ($)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="pickup">
                <div className="flex items-center gap-3 mb-4">
                  {PickupPeriods.map((p) => (
                    <Button
                      key={p.key}
                      size="sm"
                      variant={pickupPeriod === p.key ? "default" : "outline"}
                      className="px-3"
                      onClick={() => setPickupPeriod(p.key)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'Pickup (Rooms)', position: 'insideLeft', angle: -90 }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={pickupPeriod}
                        stroke="#a21caf"
                        name={`Pickup (${PickupPeriods.find(p => p.key === pickupPeriod)?.label})`}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </>
          )}

          {/* Table View */}
          {view === "table" && (
            <>
              <TabsContent value="otb-forecast">
                <div className="overflow-x-auto max-h-80">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>ADR ($)</TableHead>
                        <TableHead>Occupancy (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoData.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.adr}</TableCell>
                          <TableCell>{row.occupancy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="revenue">
                <div className="overflow-x-auto max-h-80">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>OTB Revenue ($)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoData.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pickup">
                <div className="flex items-center gap-3 mb-4">
                  {PickupPeriods.map((p) => (
                    <Button
                      key={p.key}
                      size="sm"
                      variant={pickupPeriod === p.key ? "default" : "outline"}
                      className="px-3"
                      onClick={() => setPickupPeriod(p.key)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
                <div className="overflow-x-auto max-h-80">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Pickup ({PickupPeriods.find(p => p.key === pickupPeriod)?.label})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoData.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row[pickupPeriod]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Next30Days;
