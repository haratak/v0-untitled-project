"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { StoreComparison } from "@/components/store-comparison"
import { Settings } from "@/components/settings"
import { BarChart, PieChart, Settings2 } from "lucide-react"

export default function ABCAnalysisPage() {
  const [selectedStore, setSelectedStore] = useState<string>("全店舗")
  const [comparisonStore, setComparisonStore] = useState<string>("東京店")
  const [dateRange, setDateRange] = useState({ from: new Date(2024, 2, 1), to: new Date(2025, 2, 31) })
  const [activeTab, setActiveTab] = useState<string>("summary")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">ABC分析 - 店舗比較</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-1 block">基準店舗</label>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger>
              <SelectValue placeholder="店舗を選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="全店舗">全店舗</SelectItem>
              <SelectItem value="東京店">東京店</SelectItem>
              <SelectItem value="大阪店">大阪店</SelectItem>
              <SelectItem value="名古屋店">名古屋店</SelectItem>
              <SelectItem value="福岡店">福岡店</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">比較店舗</label>
          <Select value={comparisonStore} onValueChange={setComparisonStore}>
            <SelectTrigger>
              <SelectValue placeholder="比較する店舗を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="全店舗">全店舗</SelectItem>
              <SelectItem value="東京店">東京店</SelectItem>
              <SelectItem value="大阪店">大阪店</SelectItem>
              <SelectItem value="名古屋店">名古屋店</SelectItem>
              <SelectItem value="福岡店">福岡店</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">対象期間</label>
          <DatePickerWithRange className="w-full" date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          「{selectedStore}」と「{comparisonStore}」の比較
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <BarChart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <PieChart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setActiveTab("settings")}>
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="summary"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                概要
              </TabsTrigger>
              <TabsTrigger
                value="group-a"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                グループA
              </TabsTrigger>
              <TabsTrigger
                value="group-b"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                グループB
              </TabsTrigger>
              <TabsTrigger
                value="group-c"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                グループC
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                設定
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="p-6">
              <StoreComparison
                baseStore={selectedStore}
                comparisonStore={comparisonStore}
                view="summary"
                dateRange={dateRange}
              />
            </TabsContent>

            <TabsContent value="group-a" className="p-6">
              <StoreComparison
                baseStore={selectedStore}
                comparisonStore={comparisonStore}
                view="group"
                group="A"
                dateRange={dateRange}
              />
            </TabsContent>

            <TabsContent value="group-b" className="p-6">
              <StoreComparison
                baseStore={selectedStore}
                comparisonStore={comparisonStore}
                view="group"
                group="B"
                dateRange={dateRange}
              />
            </TabsContent>

            <TabsContent value="group-c" className="p-6">
              <StoreComparison
                baseStore={selectedStore}
                comparisonStore={comparisonStore}
                view="group"
                group="C"
                dateRange={dateRange}
              />
            </TabsContent>

            <TabsContent value="settings" className="p-6">
              <Settings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
