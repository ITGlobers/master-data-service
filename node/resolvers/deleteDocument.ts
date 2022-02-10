export const DeleteDocument = async (
  _: any,
  { acronym, documentId, isExternal }: { acronym: string, documentId: string, isExternal: boolean },
  ctx: Context
) => {
  const { clients: { DocumentsNoCache: documentsNoCacheClient, documentRestApi: documentRestApiClient } } = ctx

  const appId: any = process.env.VTEX_APP_ID;
  const settings = await ctx.clients.apps.getAppSettings(appId);

  if (settings.account && settings.appkey && settings.apptoken && isExternal){
    return documentRestApiClient.deleteDocumentMD(acronym, documentId, settings)
  }else{
    return documentsNoCacheClient.deleteDocumentMD(acronym, documentId)
  }
}
