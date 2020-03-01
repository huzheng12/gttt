export const BBASSETFN = "bbassetfn"
export function bbassetfn(data) {
  return {
    type: BBASSETFN,
    data
  }
}



export const BBSYMBOLFN = "bbsymbolfn"
export function bbsymbolfn(data) {
  return {
    type: BBSYMBOLFN,
    data
  }
}


export const BBINSTRUMENTFN = "bbinstrumentfn"
export function bbinstrumentfn(data) {
  return {
    type: BBINSTRUMENTFN,
    data
  }
}
export const BBORDERBOOKLFN = "bborderBookLfn"
export function bborderBookLfn(data) {
  return {
    type: BBORDERBOOKLFN,
    data
  }
}
export const BBACTIVEORDERFN = "bbactive_orderfn"
export function bbactive_orderfn(data) {
  return {
    type: BBACTIVEORDERFN,
    data
  }
}
export const BBACCOUNTEXPFN = "bb_account_expfn"
export function bb_account_expfn(data) {
  return {
    type: BBACCOUNTEXPFN,
    data
  }
}
export const BBTRADEFN = "bbtradefn"
export function bbtradefn(language) {
  for (let i = 0; i < language.length; i++) {
    language[i].xin = '1'
  }
  return {
    type: BBTRADEFN,
    language
  }
}