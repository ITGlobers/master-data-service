export const GetDocument = async (
  _: any,
  { acronym, id, fields}: { acronym: string, id: string, fields: [string] },
  { clients: { DocumentsNoCache: documentsNoCacheClient } }: Context
) => documentsNoCacheClient.getDocumentById(acronym, id, fields)
