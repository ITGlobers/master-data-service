export const DocumentsNoCache = async (
  _: any,
  { acronym, schema, fields, where, pageSize, page }: { acronym: string, schema: string, fields: [string], where: string, pageSize: number, page: number },
  { clients: { DocumentsNoCache: documentsNoCacheClient } }: Context
) => documentsNoCacheClient.documentsNoCache(acronym, schema, fields, where, pageSize, page)