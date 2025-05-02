"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps {
  storeId: string
  group: "A" | "B" | "C"
}

export function DataTable({ storeId, group }: DataTableProps) {
  // 実際の実装ではAPIからデータを取得します
  const data = getGroupData(storeId, group)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>商品名</TableHead>
            <TableHead className="text-right">金額</TableHead>
            <TableHead className="text-right">構成比</TableHead>
            <TableHead className="text-right">累計構成比</TableHead>
            <TableHead className="text-right">ABC/グループ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.amount.toLocaleString()}</TableCell>
              <TableCell className="text-right">{item.percentage.toFixed(2)}%</TableCell>
              <TableCell className="text-right">{item.cumulativePercentage.toFixed(2)}%</TableCell>
              <TableCell className="text-right">{item.group}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/50">
            <TableCell>商品数: {data.totalItems}</TableCell>
            <TableCell className="text-right font-medium">{data.totalAmount.toLocaleString()}</TableCell>
            <TableCell className="text-right"></TableCell>
            <TableCell className="text-right font-medium">{data.totalPercentage.toFixed(2)}%</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

// モックデータ生成関数
function getGroupData(storeId: string, group: string) {
  const groupData = {
    A: {
      items: [
        { id: 1, name: "有機もも肉", amount: 47215748, percentage: 1.6, cumulativePercentage: 1.6, group: "A" },
        { id: 2, name: "精肉サービス品", amount: 38626298, percentage: 1.31, cumulativePercentage: 2.91, group: "A" },
        { id: 3, name: "鮮魚サービス品", amount: 31730407, percentage: 1.08, cumulativePercentage: 3.99, group: "A" },
        { id: 4, name: "鶏肉", amount: 29298314, percentage: 0.99, cumulativePercentage: 4.98, group: "A" },
        { id: 5, name: "豚肉切落し", amount: 27461005, percentage: 0.93, cumulativePercentage: 5.91, group: "A" },
        { id: 6, name: "有機ネギ", amount: 26635712, percentage: 0.9, cumulativePercentage: 6.82, group: "A" },
        { id: 7, name: "豚バラ切落し", amount: 24725403, percentage: 0.84, cumulativePercentage: 7.66, group: "A" },
        { id: 8, name: "牛肉・豚肉 合", amount: 22897183, percentage: 0.78, cumulativePercentage: 8.43, group: "A" },
        { id: 9, name: "牛バラ焼肉", amount: 21993723, percentage: 0.75, cumulativePercentage: 9.18, group: "A" },
        { id: 10, name: "豚バラスライス", amount: 21650741, percentage: 0.74, cumulativePercentage: 9.92, group: "A" },
      ],
      totalItems: 806,
      totalAmount: 2062105971,
      totalPercentage: 69.99,
    },
    B: {
      items: [
        {
          id: 11,
          name: "なっちゃんオレンジ",
          amount: 624095,
          percentage: 0.02,
          cumulativePercentage: 70.01,
          group: "B",
        },
        { id: 12, name: "牛肉スジ肉", amount: 624031, percentage: 0.02, cumulativePercentage: 70.03, group: "B" },
        {
          id: 13,
          name: "金の銘柄トレカシング",
          amount: 622117,
          percentage: 0.02,
          cumulativePercentage: 70.05,
          group: "B",
        },
        { id: 14, name: "カマタムキ", amount: 622103, percentage: 0.02, cumulativePercentage: 70.07, group: "B" },
        { id: 15, name: "はかうりアソート", amount: 621312, percentage: 0.02, cumulativePercentage: 70.09, group: "B" },
        { id: 16, name: "ソース焼そば", amount: 619387, percentage: 0.02, cumulativePercentage: 70.11, group: "B" },
        { id: 17, name: "コマツナ", amount: 618718, percentage: 0.02, cumulativePercentage: 70.13, group: "B" },
        { id: 18, name: "だいこんおろさん", amount: 617535, percentage: 0.02, cumulativePercentage: 70.15, group: "B" },
        {
          id: 19,
          name: "ショッピングバッグナチュラル",
          amount: 616949,
          percentage: 0.02,
          cumulativePercentage: 70.17,
          group: "B",
        },
        { id: 20, name: "和牛ヘルスター", amount: 616428, percentage: 0.02, cumulativePercentage: 70.2, group: "B" },
      ],
      totalItems: 1862,
      totalAmount: 589676445,
      totalPercentage: 20.01,
    },
    C: {
      items: [
        {
          id: 21,
          name: "ＰＡＲＭチョコチョコ濃厚カカオ",
          amount: 167404,
          percentage: 0.01,
          cumulativePercentage: 90.0,
          group: "C",
        },
        {
          id: 22,
          name: "業務用みそ　しじみ",
          amount: 167360,
          percentage: 0.01,
          cumulativePercentage: 90.01,
          group: "C",
        },
        { id: 23, name: "きつね揚げ", amount: 167350, percentage: 0.01, cumulativePercentage: 90.02, group: "C" },
        {
          id: 24,
          name: "特撰　味付海苔しょうゆ",
          amount: 167304,
          percentage: 0.01,
          cumulativePercentage: 90.03,
          group: "C",
        },
        {
          id: 25,
          name: "冷凍肉用　生豚肉ロース",
          amount: 167217,
          percentage: 0.01,
          cumulativePercentage: 90.03,
          group: "C",
        },
        { id: 26, name: "減塩紅さしみ辛子", amount: 167184, percentage: 0.01, cumulativePercentage: 90.04, group: "C" },
        {
          id: 27,
          name: "さつまいも（紅はるかスティックカット）",
          amount: 167180,
          percentage: 0.01,
          cumulativePercentage: 90.05,
          group: "C",
        },
        { id: 28, name: "あずきむらた", amount: 167143, percentage: 0.01, cumulativePercentage: 90.06, group: "C" },
        {
          id: 29,
          name: "ぶどうと赤葡萄グレープ",
          amount: 167135,
          percentage: 0.01,
          cumulativePercentage: 90.07,
          group: "C",
        },
        {
          id: 30,
          name: "スーパーカップ１．５倍とんこつラーメン",
          amount: 167109,
          percentage: 0.01,
          cumulativePercentage: 90.08,
          group: "C",
        },
      ],
      totalItems: 6656,
      totalAmount: 294702846,
      totalPercentage: 10.0,
    },
  }

  return groupData[group as keyof typeof groupData]
}
