export type Action = {
  corpName: string
  date: string // 実施日
  actionName: string // 活動内容
  place: string // 場所
  DateOfAbsence: string // 公欠提出日
  result: string // 結果
}
// todo:以下のものも追加
// 公欠状態
// 報告受領日

export const actionData: Action[] = [
  {
    corpName: "mukai株式会社",
    date: "12/1",
    actionName: "インターン",
    place: "オンライン",
    DateOfAbsence: "13日",
    result: "合格",
  },
  {
    corpName: "mukai株式会社",
    date: "12/1",
    actionName: "インターン",
    place: "オンライン",
    DateOfAbsence: "13日",
    result: "合格",
  },
]
