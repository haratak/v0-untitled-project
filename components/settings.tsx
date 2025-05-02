"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Settings() {
  const [activeTab, setActiveTab] = useState<string>("classification")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">ABC分析設定</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="classification">分類基準</TabsTrigger>
          <TabsTrigger value="display">表示設定</TabsTrigger>
          <TabsTrigger value="advanced">詳細設定</TabsTrigger>
        </TabsList>

        <TabsContent value="classification">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>グループ分類基準</CardTitle>
                <CardDescription>ABC分析のグループ分類パラメータを設定します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="group-a">グループA (累計構成比)</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input id="group-a" type="number" defaultValue="70" className="w-20" />
                    <span>%まで</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    売上上位から累計構成比が設定値に達するまでの商品をグループAとします
                  </p>
                </div>

                <div>
                  <Label htmlFor="group-b">グループB (累計構成比)</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input id="group-b" type="number" defaultValue="90" className="w-20" />
                    <span>%まで</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    グループA以降から累計構成比が設定値に達するまでの商品をグループBとします
                  </p>
                </div>

                <div>
                  <Label htmlFor="group-c">グループC</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    グループAとBに含まれない残りの商品がグループCとなります
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>分析項目</CardTitle>
                <CardDescription>ABC分析の基準となる項目を選択します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>分析基準項目</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      売上
                    </Button>
                    <Button variant="outline">利益</Button>
                    <Button variant="outline">数量</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>期間設定</Label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">週次</SelectItem>
                      <SelectItem value="month">月次</SelectItem>
                      <SelectItem value="quarter">四半期</SelectItem>
                      <SelectItem value="year">年次</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>商品カテゴリ</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全カテゴリ</SelectItem>
                      <SelectItem value="food">食品</SelectItem>
                      <SelectItem value="daily">日用品</SelectItem>
                      <SelectItem value="apparel">衣料品</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="display">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>表示設定</CardTitle>
                <CardDescription>ABC分析の表示に関する設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-diff">差異を色分け表示</Label>
                  <Switch id="show-diff" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-percentage">パーセンテージ表示</Label>
                  <Switch id="show-percentage" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-rank">順位変動表示</Label>
                  <Switch id="show-rank" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="highlight-rows">行の背景色強調</Label>
                  <Switch id="highlight-rows" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>テーブル表示設定</CardTitle>
                <CardDescription>テーブルの表示項目と順序を設定します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>表示項目</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="show-sales" defaultChecked />
                      <Label htmlFor="show-sales">売上金額</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-percentage" defaultChecked />
                      <Label htmlFor="show-percentage">構成比</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-rank" defaultChecked />
                      <Label htmlFor="show-rank">順位</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-diff" defaultChecked />
                      <Label htmlFor="show-diff">差異</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-profit" />
                      <Label htmlFor="show-profit">利益</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-quantity" />
                      <Label htmlFor="show-quantity">数量</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rows-per-page">1ページあたりの表示件数</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="rows-per-page">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10件</SelectItem>
                      <SelectItem value="20">20件</SelectItem>
                      <SelectItem value="50">50件</SelectItem>
                      <SelectItem value="100">100件</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>詳細設定</CardTitle>
                <CardDescription>ABC分析の詳細設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-update">データ自動更新</Label>
                  <Switch id="auto-update" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-frequency">更新頻度</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="update-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">1時間ごと</SelectItem>
                      <SelectItem value="daily">1日ごと</SelectItem>
                      <SelectItem value="weekly">1週間ごと</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="exclude-zero">売上0円の商品を除外</Label>
                  <Switch id="exclude-zero" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-tax">税込金額で計算</Label>
                  <Switch id="include-tax" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>エクスポート設定</CardTitle>
                <CardDescription>データエクスポートの設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>エクスポート形式</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      CSV
                    </Button>
                    <Button variant="outline">Excel</Button>
                    <Button variant="outline">PDF</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>エクスポート項目</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="export-summary" defaultChecked />
                      <Label htmlFor="export-summary">概要</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="export-details" defaultChecked />
                      <Label htmlFor="export-details">詳細データ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="export-charts" />
                      <Label htmlFor="export-charts">グラフ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="export-settings" />
                      <Label htmlFor="export-settings">設定情報</Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">設定を保存</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
