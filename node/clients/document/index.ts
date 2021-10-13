import { InstanceOptions, IOContext, MasterData } from '@vtex/api'

export class DocumentsNoCacheClient extends MasterData {

  constructor(context: IOContext, options?: InstanceOptions) {
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

  public async documentsNoCache(
    acronym: string,
    schema: string,
    fields: string[],
    where: string,
    sort: string,
    pageSize: number = 50,
    page: number = 1
    ){
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

    const documents: any = this.resolveDocuments(response?.data)

    return {
      documents,
      pagination: response?.pagination
    }
  }

  private resolveDocuments(data: any){
    let fields: any = []

    data.forEach((item: any) => {
      fields.push({
        fields: this.resolveFields(item)
      })
    })

    return fields
  }

  private resolveFields(item: any){
    let fields: any = []

    Object.keys(item).forEach((name: string) => {
      fields = [...fields, {
        key: name,
        value: item[name]
      }]
    })

    return fields
  }
}

