export const DeleteDocument = async (
  _: any,
  { acronym, documentId }: { acronym: string, documentId: string },
  { clients: { DocumentsNoCache: documentsNoCacheClient } }: Context
) => documentsNoCacheClient.deleteDocumentMD(acronym, documentId)
