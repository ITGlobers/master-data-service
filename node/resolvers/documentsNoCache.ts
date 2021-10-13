export const DocumentsNoCache = async (
  _: any,
  { acronym, schema, fields, where, sort, pageSize, page }: { acronym: string, schema: string, fields: [string], where: string, sort: string, pageSize: number, page: number },
  { clients: { DocumentsNoCache: documentsNoCacheClient } }: Context
) => documentsNoCacheClient.documentsNoCache(acronym, schema, fields, where, sort, pageSize, page)
