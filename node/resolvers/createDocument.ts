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
) => {
  console.log('estoy en el resolver')
  return  documentsNoCacheClient.createDocumentMD(acronym, document, schema)
}
