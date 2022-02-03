import { InstanceOptions, IOContext, MasterData } from '@vtex/api'
import { documentToField, fieldToDocument, resolveFields } from '../../utils'

type DocumentInput = {
  fields: [FieldsInput]
}

type FieldsInput = {
  key: String
  value: String
}
export class DocumentsNoCacheClient extends MasterData {

  constructor(context: IOContext, options?: InstanceOptions) {
    console.log("context: ", context)
    super(context, {
      ...options,
      headers: {
        ...(options && options.headers),
        ...{ Accept: 'application/vnd.vtex.ds.v10+json' },
        ...(context.adminUserAuthToken ? { VtexIdclientAutCookie: context.adminUserAuthToken } : null),
        ...(context.storeUserAuthToken ? { VtexIdclientAutCookie: context.storeUserAuthToken } : null),
        ...(context.authToken ? { VtexIdclientAutCookie: context.authToken } : null)
      }
    });
  }

  public async createDocumentMD(
    acronym: string,
    document: DocumentInput,
    schema: string
  ) {
    try {
      const fieldsPayload = await documentToField(document?.fields)

      const response = await this.createDocument({
        dataEntity: acronym,
        fields: fieldsPayload,
        schema: schema
      })

      return response
    } catch (error) {
      return error
    }
  }

  public async documentsNoCache(
    acronym: string,
    schema: string,
    fields: string[],
    where: string,
    sort: string,
    pageSize: number = 50,
    page: number = 1
  ) {
    try {
      const response = await this.searchDocumentsWithPaginationInfo({
        dataEntity: acronym,
        fields,
        where,
        schema,
        sort: sort || 'createdIn DESC',
        pagination: {
          page,
          pageSize
        }
      })

      const documents: any = fieldToDocument(response?.data)

      return {
        documents,
        pagination: response?.pagination
      }
    } catch (error) {
      return {}
    }
  }

  public async updateDocumentMD(
    acronym: string,
    id: string,
    document: DocumentInput,
    schema: string
  ) {
    try {
      const fieldsPayload = await documentToField(document?.fields)

      await this.updatePartialDocument({
        dataEntity: acronym,
        id: id,
        fields: fieldsPayload,
        schema: schema
      })

      return {
        DocumentId: id
      }
    } catch (error) {
      return error
    }
  }

  public async deleteDocumentMD(
    acronym: string,
    documentId: string
  ) {
    try {

      await this.deleteDocument({
        dataEntity: acronym,
        id: documentId
      })

      return {
        DocumentId: documentId
      }
    } catch (error) {
      return error
    }
  }

  public async getDocumentById(
    acronym: string,
    documentId: string,
    fields: string[],
  ) {
    try {

      const response: any = await this.getDocument({
        dataEntity: acronym,
        id: documentId,
        fields
      })

      const document: any = resolveFields(response)

      return {
        fields: document
      }

    } catch (error) {
      return error
    }
  }
}

