export const GetDocument = async (
  _: any,
  { acronym, id, fields, isExternal}: { acronym: string, id: string, fields: [string], isExternal: boolean },
  ctx: Context
) => {
  const { clients: { DocumentsNoCache: documentsNoCacheClient, documentRestApi: documentRestApiClient} } = ctx

  const appId: any = process.env.VTEX_APP_ID;
  const settings = await ctx.clients.apps.getAppSettings(appId);

  if (settings.account && settings.appkey && settings.apptoken && isExternal){
    return documentRestApiClient.getDocumentById(acronym, id, fields, settings)
  } else {
    return documentsNoCacheClient.getDocumentById(acronym, id, fields)
  }
}
