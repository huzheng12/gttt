const defaultState = {
  tibirenzheng: {},
  userxinxi: {},
  tradearr: [],
  lever: 1,
  LeverageFoundationInformation: "1",
  historyflg: "0",
  TransactionPage: "0",
  dianjigengduo: 0,
  tiaozhuanzijinhuanzhuan: "",
  allposiont: "",
  headerZX: "1",//修改手机号码邮箱，，后主动推送更新header组件
  aheyuenameischange: 0,
  withdrawmoney: '0',
  chongxinkaiqi: 0,
  differentiatedtransactions: 0,//用于判断k线时时数据是否发送接收多个，区分首页和交易页面的
  change_language_flg: 0,//切换语言
  isHistory: 0,
  a: true
}
export const datum = (state = defaultState, action) => {
  switch (action.type) {
    case "isHistory":
      return { ...state, isHistory: action.isHistory }
    case "a":
      return { ...state, a: false }
    case "withdrawmoney":
      return { ...state, withdrawmoney: action.withdrawmoney }
    case "change_language_flg":
      return { ...state, change_language_flg: action.change_language_flg }
    case "differentiatedtransactions":
      return { ...state, differentiatedtransactions: action.num }
    case "chongxinkaiqi":
      return { ...state, chongxinkaiqi: action.chongxinkaiqi }
    case "tibirenzheng":
      return { ...state, tibirenzheng: action.tibirenzheng }
    case "zhanghaoxinxi":
      return { ...state, userxinxi: action.userxinxi }
    case "tradeArr":
      return { ...state, tradearr: action.tradeArr }
    case "lever":
      return { ...state, lever: action.lever }
    case "LeverageFoundationInformation":
      return { ...state, LeverageFoundationInformation: action.LeverageFoundationInformation }
    case "historyflg":
      return { ...state, historyflg: action.historyflg }
    case "TransactionPage":
      return { ...state, TransactionPage: action.TransactionPage }

    case "dianjigengduo":
      return { ...state, dianjigengduo: action.dianjigengduo }
    case "tiaozhuanzijinhuanzhuan":
      return { ...state, tiaozhuanzijinhuanzhuan: action.tiaozhuanzijinhuanzhuan }
    case "allposiont":
      return { ...state, allposiont: action.allposiont }
    case "headerZX":
      return { ...state, headerZX: action.headerZX }
    case "aheyuenameischange":
      return { ...state, aheyuenameischange: action.aheyuenameischange }

    default:
      return state;
  }
}
