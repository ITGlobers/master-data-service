type DocumentInput = {
  fields: [FieldsInput]
}

type FieldsInput = {
  key: String
  value: String
}

export const UpdateDocument = async (
  _: any,
  { acronym, id, document, schema, isExternal }: { acronym: string, id: string, document: DocumentInput, schema: string, isExternal: boolean },
  ctx: Context
) => {
  const { clients: { DocumentsNoCache: documentsNoCacheClient, documentRestApi: documentRestApiClient } } = ctx

  const appId: any = process.env.VTEX_APP_ID;
  const settings = await ctx.clients.apps.getAppSettings(appId);

  if (settings.account && settings.appkey && settings.apptoken && isExternal){
    return documentRestApiClient.updateDocumentMD(acronym, id, document, settings)
  }else{
    return documentsNoCacheClient.updateDocumentMD(acronym, id, document, schema)
  }
} 
