export const DOWNLOADGETURL = "downloadget_url"   //  app下载地址信息
export function downloadgeturlfn(data) {
  return {
    type: DOWNLOADGETURL,
    data
  }
}