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
  // acronym: string, schema: string, fields: [string], where: string, pageSize: number, page: number
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

    const fieldsData: any = this.parseData(response)

    return {
      documents: [
        {
          fields: fieldsData
        }
      ]
    }
  }

  private parseData(data: any){
    let fields: any = []

    data.map((item: any) => {
      Object.keys(item).map(name => {
        fields = [...fields, {
          key: name,
          value: item[name]
        }]
      })
    })

    return fields
  }
}

