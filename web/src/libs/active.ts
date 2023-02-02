export class ActiveClass {
  static selectionResult = ['--','合格','不合格','抽選落ち','延期','中止','保留','test']
  //   結果
  static witchSelectionResult = (selectionResult: number) => {
    switch (selectionResult) {
      case 0:
        return '--'
      case 2:
        return '合格'
      case 3:
        return '不合格'
      case 4:
        return '抽選落ち'
      case 5:
        return '延期'
      case 6:
        return '中止'
      case 7:
        return '保留'
      default:
        return '--'
    }
  }
}
