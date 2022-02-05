export const GetDocument = async (
  _: any,
  { acronym, id, fields}: { acronym: string, id: string, fields: [string] },
  ctx: Context
) => {
  const { clients: { DocumentsNoCache: documentsNoCacheClient, documentRestApi: documentRestApiClient, } } = ctx

  const appId: any = process.env.VTEX_APP_ID;
  const settings = await ctx.clients.apps.getAppSettings(appId);

  if (settings.account && settings.appkey && settings.apptoken){
    return documentRestApiClient.getDocumentById(acronym, id, fields, settings)
  } else {
    return documentsNoCacheClient.getDocumentById(acronym, id, fields)
  }

  return null
}
