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
    pageSize: number = 1,
    page: number = 1
    ){
    const response = await this.searchDocuments({
      dataEntity: acronym,
      fields,
      where,
      schema,
      pagination: {
        page,
        pageSize
      }
    })

    const documents: any = this.resolveDocuments(response)

    return {
      documents
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

