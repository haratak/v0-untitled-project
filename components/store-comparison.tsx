"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, ChevronDown, ChevronUp, Download, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DateRange } from "react-day-picker"

interface StoreComparisonProps {
  baseStore: string
  comparisonStore: string
  view: "summary" | "group" | "single"
  group?: "A" | "B" | "C"
  dateRange: DateRange | undefined
}

export function StoreComparison({ baseStore, comparisonStore, view, group, dateRange }: StoreComparisonProps) {
  const [displayMode, setDisplayMode] = useState<"table" | "chart">("table")
  const [sortColumn, setSortColumn] = useState<string>("sales")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // 実際の実装ではAPIからデータを取得します
  const summaryData = {
    baseStore: {
      name: baseStore,
      totalSales: 2946485262,
      totalItems: 9324,
      groupA: { percentage: 70.0, items: 806, sales: 2062105971 },
      groupB: { percentage: 20.0, items: 1862, sales: 589676445 },
      groupC: { percentage: 10.0, items: 6656, sales: 294702846 },
      topItems: [
        { name: "有機もも肉", sales: 47215748, percentage: 1.6 },
        { name: "精肉サービス品", sales: 38626298, percentage: 1.31 },
        { name: "鮮魚サービス品", sales: 31730407, percentage: 1.08 },
      ],
    },
    compStore: {
      name: comparisonStore,
      totalSales: 2124357891,
      totalItems: 8756,
      groupA: { percentage: 65.3, items: 754, sales: 1387254698 },
      groupB: { percentage: 22.1, items: 1923, sales: 469682541 },
      groupC: { percentage: 12.6, items: 6079, sales: 267420652 },
      topItems: [
        { name: "精肉サービス品", sales: 42158963, percentage: 1.98 },
        { name: "有機もも肉", sales: 38562489, percentage: 1.82 },
        { name: "鮮魚サービス品", sales: 28965412, percentage: 1.36 },
      ],
    },
  }

  if (view === "summary") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">概要比較</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            エクスポート
          </Button>
        </div>

        <div className="space-y-6">
          {/* 総売上比較 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-base font-medium mb-4">総売上比較</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{baseStore}</span>
                  <span className="font-medium">¥{summaryData.baseStore.totalSales.toLocaleString()}</span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{comparisonStore}</span>
                  <div>
                    <span className="font-medium">¥{summaryData.compStore.totalSales.toLocaleString()}</span>
                    <span className="text-red-500 text-sm ml-2">
                      {(
                        ((summaryData.compStore.totalSales - summaryData.baseStore.totalSales) /
                          summaryData.baseStore.totalSales) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
                <Progress
                  value={(summaryData.compStore.totalSales / summaryData.baseStore.totalSales) * 100}
                  className="h-2 bg-gray-200"
                />
              </div>
            </div>
          </div>

          {/* 商品数比較 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-base font-medium mb-4">商品数比較</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{baseStore}</span>
                  <span className="font-medium">{summaryData.baseStore.totalItems.toLocaleString()} 商品</span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{comparisonStore}</span>
                  <div>
                    <span className="font-medium">{summaryData.compStore.totalItems.toLocaleString()} 商品</span>
                    <span className="text-red-500 text-sm ml-2">
                      {(
                        ((summaryData.compStore.totalItems - summaryData.baseStore.totalItems) /
                          summaryData.baseStore.totalItems) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
                <Progress
                  value={(summaryData.compStore.totalItems / summaryData.baseStore.totalItems) * 100}
                  className="h-2 bg-gray-200"
                />
              </div>
            </div>
          </div>

          {/* グループ構成比 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-base font-medium mb-4">グループ構成比</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">{baseStore}</h4>
                <div className="flex h-6 mb-2">
                  <div
                    className="bg-green-500 text-white text-xs flex items-center justify-center"
                    style={{ width: `${summaryData.baseStore.groupA.percentage}%` }}
                  >
                    A: {summaryData.baseStore.groupA.percentage}%
                  </div>
                  <div
                    className="bg-yellow-500 text-white text-xs flex items-center justify-center"
                    style={{ width: `${summaryData.baseStore.groupB.percentage}%` }}
                  >
                    B: {summaryData.baseStore.groupB.percentage}%
                  </div>
                  <div
                    className="bg-red-500 text-white text-xs flex items-center justify-center"
                    style={{ width: `${summaryData.baseStore.groupC.percentage}%` }}
                  >
                    C: {summaryData.baseStore.groupC.percentage}%
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="font-medium">グループA</p>
                    <p>{summaryData.baseStore.groupA.items}商品</p>
                    <p>¥{(summaryData.baseStore.groupA.sales / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="font-medium">グループB</p>
                    <p>{summaryData.baseStore.groupB.items}商品</p>
                    <p>¥{(summaryData.baseStore.groupB.sales / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="font-medium">グループC</p>
                    <p>{summaryData.baseStore.groupC.items}商品</p>
                    <p>¥{(summaryData.baseStore.groupC.sales / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">{comparisonStore}</h4>
                <div className="flex h-6 mb-2">
                  <div
                    className="bg-green-500 text-white text-xs flex items-center justify-center"
                    style={{ width: `${summaryData.compStore.groupA.percentage}%` }}
                  >
                    A: {summaryData.compStore.groupA.percentage}%
                  </div>
                  <div
                    className="bg-yellow-500 text-white text-xs flex items-center justify-center"
                    style={{ width: `${summaryData.compStore.groupB.percentage}%` }}
                  >
                    B: {summaryData.compStore.groupB.percentage}%
                  </div>
                  <div
                    className="bg-red-500 text-white text-xs flex items-center justify-center"
                    style={{ width: `${summaryData.compStore.groupC.percentage}%` }}
                  >
                    C: {summaryData.compStore.groupC.percentage}%
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="font-medium">グループA</p>
                    <p>
                      {summaryData.compStore.groupA.items}商品{" "}
                      <ComparisonIndicator
                        value={summaryData.compStore.groupA.items - summaryData.baseStore.groupA.items}
                      />
                    </p>
                    <p>
                      ¥{(summaryData.compStore.groupA.sales / 1000000).toFixed(1)}M{" "}
                      <ComparisonIndicator
                        value={summaryData.compStore.groupA.sales - summaryData.baseStore.groupA.sales}
                        percentage
                        baseValue={summaryData.baseStore.groupA.sales}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">グループB</p>
                    <p>
                      {summaryData.compStore.groupB.items}商品{" "}
                      <ComparisonIndicator
                        value={summaryData.compStore.groupB.items - summaryData.baseStore.groupB.items}
                      />
                    </p>
                    <p>
                      ¥{(summaryData.compStore.groupB.sales / 1000000).toFixed(1)}M{" "}
                      <ComparisonIndicator
                        value={summaryData.compStore.groupB.sales - summaryData.baseStore.groupB.sales}
                        percentage
                        baseValue={summaryData.baseStore.groupB.sales}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">グループC</p>
                    <p>
                      {summaryData.compStore.groupC.items}商品{" "}
                      <ComparisonIndicator
                        value={summaryData.compStore.groupC.items - summaryData.baseStore.groupC.items}
                      />
                    </p>
                    <p>
                      ¥{(summaryData.compStore.groupC.sales / 1000000).toFixed(1)}M{" "}
                      <ComparisonIndicator
                        value={summaryData.compStore.groupC.sales - summaryData.baseStore.groupC.sales}
                        percentage
                        baseValue={summaryData.baseStore.groupC.sales}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* トップ商品比較 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-base font-medium mb-4">トップ商品比較</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">{baseStore}のトップ3商品</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商品名</TableHead>
                      <TableHead className="text-right">売上</TableHead>
                      <TableHead className="text-right">構成比</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summaryData.baseStore.topItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">¥{item.sales.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.percentage.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">{comparisonStore}のトップ3商品</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商品名</TableHead>
                      <TableHead className="text-right">売上</TableHead>
                      <TableHead className="text-right">構成比</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summaryData.compStore.topItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">¥{item.sales.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.percentage.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === "group" && group) {
    // 実際の実装ではAPIからデータを取得します
    const data = getComparisonData(baseStore, comparisonStore, group)

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">グループ{group}の比較</h2>
          <div className="flex items-center gap-2">
            <Tabs value={displayMode} onValueChange={(value) => setDisplayMode(value as "table" | "chart")}>
              <TabsList className="h-8">
                <TabsTrigger value="table" className="px-3 h-7">
                  テーブル
                </TabsTrigger>
                <TabsTrigger value="chart" className="px-3 h-7">
                  グラフ
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              エクスポート
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">商品数</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">{baseStore}</p>
                <p className="text-xl font-bold">{data.baseItemCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{comparisonStore}</p>
                <p className="text-xl font-bold">{data.compItemCount}</p>
                <ComparisonIndicator value={data.compItemCount - data.baseItemCount} />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">グループ売上</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">{baseStore}</p>
                <p className="text-xl font-bold">¥{data.baseTotalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{comparisonStore}</p>
                <p className="text-xl font-bold">¥{data.compTotalAmount.toLocaleString()}</p>
                <ComparisonIndicator
                  value={data.compTotalAmount - data.baseTotalAmount}
                  percentage
                  baseValue={data.baseTotalAmount}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">構成比</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">{baseStore}</p>
                <p className="text-xl font-bold">{data.baseTotalPercentage.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{comparisonStore}</p>
                <p className="text-xl font-bold">{data.compTotalPercentage.toFixed(2)}%</p>
                <ComparisonIndicator value={data.compTotalPercentage - data.baseTotalPercentage} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">並び替え:</label>
            <Select value={sortColumn} onValueChange={setSortColumn}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">売上金額</SelectItem>
                <SelectItem value="percentage">構成比</SelectItem>
                <SelectItem value="rank">順位</SelectItem>
                <SelectItem value="diff">差異</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            >
              {sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {data.totalItems}件中 {data.items.length}件表示
          </div>
        </div>

        {displayMode === "table" ? (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead rowSpan={2}>商品名</TableHead>
                  <TableHead colSpan={3} className="text-center border-b">
                    {baseStore}
                  </TableHead>
                  <TableHead colSpan={3} className="text-center border-b">
                    {comparisonStore}
                  </TableHead>
                  <TableHead rowSpan={2} className="text-center">
                    差異
                  </TableHead>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead className="text-right">構成比</TableHead>
                  <TableHead className="text-right">順位</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead className="text-right">構成比</TableHead>
                  <TableHead className="text-right">順位</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((item) => {
                  const salesDiff = item.compAmount - item.baseAmount
                  const percentageDiff = item.compPercentage - item.basePercentage
                  const rankDiff = item.baseRank - item.compRank // 順位は低いほうが良いので反転

                  return (
                    <TableRow key={item.id} className={getSalesDiffClass(salesDiff)}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.baseAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.basePercentage.toFixed(2)}%</TableCell>
                      <TableCell className="text-right">{item.baseRank}</TableCell>
                      <TableCell className="text-right">{item.compAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.compPercentage.toFixed(2)}%</TableCell>
                      <TableCell className="text-right">{item.compRank}</TableCell>
                      <TableCell>
                        <div className="flex flex-col items-end text-xs">
                          <span className={getSalesDiffClass(salesDiff, true)}>
                            {salesDiff > 0 ? "+" : ""}
                            {salesDiff.toLocaleString()}円 ({((salesDiff / item.baseAmount) * 100).toFixed(1)}%)
                          </span>
                          <span className={getRankDiffClass(rankDiff, true)}>
                            {rankDiff !== 0 ? (rankDiff > 0 ? "↑" : "↓") : "→"}
                            {Math.abs(rankDiff)}位
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow className="bg-muted/50 font-medium">
                  <TableCell>合計: {data.totalItems}商品</TableCell>
                  <TableCell className="text-right">{data.baseTotalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{data.baseTotalPercentage.toFixed(2)}%</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">{data.compTotalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{data.compTotalPercentage.toFixed(2)}%</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    <span className={getSalesDiffClass(data.compTotalAmount - data.baseTotalAmount, true)}>
                      {data.compTotalAmount - data.baseTotalAmount > 0 ? "+" : ""}
                      {(data.compTotalAmount - data.baseTotalAmount).toLocaleString()}円
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-muted-foreground">グラフ表示は実装中です</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

interface ComparisonIndicatorProps {
  value: number
  percentage?: boolean
  baseValue?: number
}

function ComparisonIndicator({ value, percentage = false, baseValue = 0 }: ComparisonIndicatorProps) {
  if (value === 0) return <Minus className="inline h-3 w-3 text-gray-400" />

  let displayValue = value
  let displayText = ""

  if (percentage && baseValue) {
    displayValue = (value / baseValue) * 100
    displayText = `${displayValue > 0 ? "+" : ""}${displayValue.toFixed(1)}%`
  } else {
    displayText = `${value > 0 ? "+" : ""}${value.toLocaleString()}`
  }

  if (value > 0) {
    return (
      <span className="text-green-600 text-xs ml-1">
        {displayText} <ChevronUp className="inline h-3 w-3" />
      </span>
    )
  } else {
    return (
      <span className="text-red-600 text-xs ml-1">
        {displayText} <ChevronDown className="inline h-3 w-3" />
      </span>
    )
  }
}

// 差異に基づく背景色クラスを取得
function getSalesDiffClass(diff: number, textOnly = false): string {
  if (diff === 0) return ""

  if (textOnly) {
    return diff > 0 ? "text-green-600" : "text-red-600"
  } else {
    return diff > 0 ? "bg-green-50" : diff < 0 ? "bg-red-50" : ""
  }
}

// 順位差異に基づくテキスト色クラスを取得
function getRankDiffClass(diff: number, textOnly = false): string {
  if (diff === 0) return "text-gray-500"
  return diff > 0 ? "text-green-600" : "text-red-600"
}

// モックデータ生成関数
function getComparisonData(baseStore: string, comparisonStore: string, group: string) {
  // 実際の実装ではAPIからデータを取得します
  const groupData = {
    A: {
      items: [
        {
          id: 1,
          name: "有機もも肉",
          baseAmount: 47215748,
          basePercentage: 1.6,
          baseRank: 1,
          compAmount: 38562489,
          compPercentage: 1.82,
          compRank: 2,
        },
        {
          id: 2,
          name: "精肉サービス品",
          baseAmount: 38626298,
          basePercentage: 1.31,
          baseRank: 2,
          compAmount: 42158963,
          compPercentage: 1.98,
          compRank: 1,
        },
        {
          id: 3,
          name: "鮮魚サービス品",
          baseAmount: 31730407,
          basePercentage: 1.08,
          baseRank: 3,
          compAmount: 28965412,
          compPercentage: 1.36,
          compRank: 3,
        },
        {
          id: 4,
          name: "鶏肉",
          baseAmount: 29298314,
          basePercentage: 0.99,
          baseRank: 4,
          compAmount: 25478963,
          compPercentage: 1.2,
          compRank: 4,
        },
        {
          id: 5,
          name: "豚肉切落し",
          baseAmount: 27461005,
          basePercentage: 0.93,
          baseRank: 5,
          compAmount: 22145789,
          compPercentage: 1.04,
          compRank: 6,
        },
        {
          id: 6,
          name: "有機ネギ",
          baseAmount: 26635712,
          basePercentage: 0.9,
          baseRank: 6,
          compAmount: 23654789,
          compPercentage: 1.11,
          compRank: 5,
        },
        {
          id: 7,
          name: "豚バラ切落し",
          baseAmount: 24725403,
          basePercentage: 0.84,
          baseRank: 7,
          compAmount: 19875632,
          compPercentage: 0.94,
          compRank: 8,
        },
        {
          id: 8,
          name: "牛肉・豚肉 合",
          baseAmount: 22897183,
          basePercentage: 0.78,
          baseRank: 8,
          compAmount: 21456987,
          compPercentage: 1.01,
          compRank: 7,
        },
      ],
      totalItems: 806,
      baseItemCount: 806,
      compItemCount: 754,
      baseTotalAmount: 2062105971,
      baseTotalPercentage: 70.0,
      compTotalAmount: 1387254698,
      compTotalPercentage: 65.3,
    },
    B: {
      items: [
        {
          id: 11,
          name: "なっちゃんオレンジ",
          baseAmount: 624095,
          basePercentage: 0.02,
          baseRank: 807,
          compAmount: 587452,
          compPercentage: 0.03,
          compRank: 810,
        },
        {
          id: 12,
          name: "牛肉スジ肉",
          baseAmount: 624031,
          basePercentage: 0.02,
          baseRank: 808,
          compAmount: 598741,
          compPercentage: 0.03,
          compRank: 805,
        },
        {
          id: 13,
          name: "金の銘柄トレカシング",
          baseAmount: 622117,
          basePercentage: 0.02,
          baseRank: 809,
          compAmount: 612478,
          compPercentage: 0.03,
          compRank: 802,
        },
        {
          id: 14,
          name: "カマタムキ",
          baseAmount: 622103,
          basePercentage: 0.02,
          baseRank: 810,
          compAmount: 587412,
          compPercentage: 0.03,
          compRank: 811,
        },
        {
          id: 15,
          name: "はかうりアソート",
          baseAmount: 621312,
          basePercentage: 0.02,
          baseRank: 811,
          compAmount: 602145,
          compPercentage: 0.03,
          compRank: 804,
        },
        {
          id: 16,
          name: "ソース焼そば",
          baseAmount: 619387,
          basePercentage: 0.02,
          baseRank: 812,
          compAmount: 587412,
          compPercentage: 0.03,
          compRank: 812,
        },
        {
          id: 17,
          name: "コマツナ",
          baseAmount: 618718,
          basePercentage: 0.02,
          baseRank: 813,
          compAmount: 574125,
          compPercentage: 0.03,
          compRank: 815,
        },
        {
          id: 18,
          name: "だいこんおろさん",
          baseAmount: 617535,
          basePercentage: 0.02,
          baseRank: 814,
          compAmount: 587412,
          compPercentage: 0.03,
          compRank: 813,
        },
      ],
      totalItems: 1862,
      baseItemCount: 1862,
      compItemCount: 1923,
      baseTotalAmount: 589676445,
      baseTotalPercentage: 20.0,
      compTotalAmount: 469682541,
      compTotalPercentage: 22.1,
    },
    C: {
      items: [
        {
          id: 21,
          name: "ＰＡＲＭチョコチョコ濃厚カカオ",
          baseAmount: 167404,
          basePercentage: 0.01,
          baseRank: 2669,
          compAmount: 154789,
          compPercentage: 0.01,
          compRank: 2675,
        },
        {
          id: 22,
          name: "業務用みそ　しじみ",
          baseAmount: 167360,
          basePercentage: 0.01,
          baseRank: 2670,
          compAmount: 158741,
          compPercentage: 0.01,
          compRank: 2670,
        },
        {
          id: 23,
          name: "きつね揚げ",
          baseAmount: 167350,
          basePercentage: 0.01,
          baseRank: 2671,
          compAmount: 162478,
          compPercentage: 0.01,
          compRank: 2665,
        },
        {
          id: 24,
          name: "特撰　味付海苔しょうゆ",
          baseAmount: 167304,
          basePercentage: 0.01,
          baseRank: 2672,
          compAmount: 157412,
          compPercentage: 0.01,
          compRank: 2672,
        },
        {
          id: 25,
          name: "冷凍肉用　生豚肉ロース",
          baseAmount: 167217,
          basePercentage: 0.01,
          baseRank: 2673,
          compAmount: 152145,
          compPercentage: 0.01,
          compRank: 2678,
        },
        {
          id: 26,
          name: "減塩紅さしみ辛子",
          baseAmount: 167184,
          basePercentage: 0.01,
          baseRank: 2674,
          compAmount: 157412,
          compPercentage: 0.01,
          compRank: 2673,
        },
        {
          id: 27,
          name: "さつまいも（紅はるかスティックカット）",
          baseAmount: 167180,
          basePercentage: 0.01,
          baseRank: 2675,
          compAmount: 154125,
          compPercentage: 0.01,
          compRank: 2677,
        },
        {
          id: 28,
          name: "あずきむらた",
          baseAmount: 167143,
          basePercentage: 0.01,
          baseRank: 2676,
          compAmount: 157412,
          compPercentage: 0.01,
          compRank: 2674,
        },
      ],
      totalItems: 6656,
      baseItemCount: 6656,
      compItemCount: 6079,
      baseTotalAmount: 294702846,
      baseTotalPercentage: 10.0,
      compTotalAmount: 267420652,
      compTotalPercentage: 12.6,
    },
  }

  return groupData[group as keyof typeof groupData]
}
