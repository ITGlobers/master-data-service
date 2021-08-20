import { InstanceOptions, IOContext, AppGraphQLClient } from '@vtex/api'

export class DocumentsNoCacheClient extends AppGraphQLClient {

  constructor (context: IOContext, options?: InstanceOptions) {
    super('vtex.store-graphql@2.x', context, options)
  }
  public documentsNoCache (acronym: string, schema: string, fields: [string], where: string, pageSize: number, page: number) {
    return this.graphql
      .query<any, any>(
        {
          query: `
          query GetDocuments($acronym: String, $fields: [String], $schema: String, $where: String, $pageSize: Int, $page: Int){
            documents(acronym: $acronym, fields: $fields, schema: $schema, where: $where, pageSize: $pageSize, page: $page)
            {
              fields {
                key
                value
              }
            }
          }
          `,
          variables: {
            "schema": schema,
            "acronym": acronym,
            "fields": fields,
            "where": where,
            "pageSize": pageSize,
            "page": page
          },
        },
        {
          headers: {
            ...this.options?.headers,
            'Proxy-Authorization': this.context.authToken,
            VtexIdclientAutCookie: this.context.authToken,
          },
        }
      )
      .then(( data: any) => {
        console.log("Mi data es", data);
        
        return data.data
      })
      .catch((error) => {
        return error
      })
  }   
}
