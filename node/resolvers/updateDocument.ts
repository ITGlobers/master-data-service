type DocumentInput = {
  fields: [FieldsInput]
}

type FieldsInput = {
  key: String
  value: String
}

export const UpdateDocument = async (
  _: any,
  { acronym, id, document, schema }: { acronym: string, id: string, document: DocumentInput, schema: string },
  { clients: { DocumentsNoCache: documentsNoCacheClient } }: Context
) => {
  return  documentsNoCacheClient.updateDocumentMD(acronym, id, document, schema)
}
