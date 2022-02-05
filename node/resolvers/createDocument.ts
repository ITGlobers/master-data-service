type DocumentInput = {
  fields: [FieldsInput]
}

type FieldsInput = {
  key: String
  value: String
}

export const CreateDocument = async (
  _: any,
  { acronym, document, schema }: { acronym: string, document: DocumentInput, schema: string },
  ctx: Context
) => {
  const { clients: { DocumentsNoCache: documentsNoCacheClient, documentRestApi: documentRestApiClient, } }= ctx

  const appId: any = process.env.VTEX_APP_ID;
  const settings = await ctx.clients.apps.getAppSettings(appId);

  if (settings.account && settings.appkey && settings.apptoken){
    return documentRestApiClient.createDocumentMD(acronym, document, settings)
  }else{
    return documentsNoCacheClient.createDocumentMD(acronym, document, schema)
  }

  return null

} 
