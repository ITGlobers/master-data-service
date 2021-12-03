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
  { clients: { DocumentsNoCache: documentsNoCacheClient } }: Context
) => documentsNoCacheClient.createDocumentMD(acronym, document, schema)
