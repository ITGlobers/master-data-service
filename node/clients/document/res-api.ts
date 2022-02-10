import { InstanceOptions, IOContext, JanusClient } from "@vtex/api";
import { fieldToDocument, documentToField, resolveFields } from "../../utils";

type Settings = {
  account: string;
  appkey: string;
  apptoken: string;
};

type DocumentInput = {
  fields: [FieldsInput];
};

type FieldsInput = {
  key: String;
  value: String;
};

export class DocumentRestApiClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...(options && options.headers),
        ...{ Accept: "application/vnd.vtex.ds.v10+json" },
      },
    });
  }

  public async searchDocuments(
    acronym: string,
    schema: string = "",
    fields: string[],
    where: string = "",
    sort: string = "",
		pageSize: number = 50,
    settings: Settings,
  ) {
    try {
      const response = await this.http.get(
        `/api/dataentities/${acronym}/search?_size=${pageSize}&_fields=${fields}&_where=${where}&_schema=${schema}&_sort=${sort}`,
        {
          headers: {
            "X-VTEX-API-AppKey": settings.appkey,
            "X-VTEX-API-AppToken": settings.apptoken,
            "Content-Type": "application/json",
            Accept: "application/vnd.vtex.ds.v10+json",
          },
          params: {
            an: settings.account,
          },
        }
      );

      const documents: any = fieldToDocument(response);

      return {
        documents
      };
    } catch (error) {
      return error;
    }
  }

  public async createDocumentMD(
    acronym: string,
    document: DocumentInput,
    settings: Settings
  ) {
    try {
      const fieldsPayload = await documentToField(document?.fields);
      const response = await this.http.post(
        `/api/dataentities/${acronym}/documents`,
        fieldsPayload,
        {
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": settings.appkey,
            "X-VTEX-API-AppToken": settings.apptoken,
          },
          params: {
            an: settings.account,
          },
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  public async getDocumentById(
    acronym: string,
    documentId: string,
    fields: string[],
    settings: Settings
  ) {
    try {
      const response = await this.http.get(
        `/api/dataentities/${acronym}/documents/${documentId}?_fields=${
          fields || ""
        }`,
        {
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": settings.appkey,
            "X-VTEX-API-AppToken": settings.apptoken,
          },
          params: {
            an: settings.account,
          },
        }
      );

      const document: any = resolveFields(response);

      return {
        fields: document,
      };
    } catch (error) {
      return error;
    }
  }

  public async updateDocumentMD(
    acronym: string,
    id: string,
    document: DocumentInput,
    settings: Settings
  ) {
    try {
      const fieldsPayload = await documentToField(document?.fields);
      await this.http.patch(
        `/api/dataentities/${acronym}/documents/${id}`,
        fieldsPayload,
        {
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": settings.appkey,
            "X-VTEX-API-AppToken": settings.apptoken,
          },
          params: {
            an: settings.account,
          },
        }
      );
      
      return {
        DocumentId: id
      }
    } catch (error) {
      return error;
    }
  }

  public async deleteDocumentMD(
    acronym: string,
    documentId: string,
    settings: Settings
  ) {
    try {
      await this.http.delete(
        `/api/dataentities/${acronym}/documents/${documentId}`,
        {
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": settings.appkey,
            "X-VTEX-API-AppToken": settings.apptoken,
          },
          params: {
            an: settings.account,
          },
        }
      );

      return {
        DocumentId: documentId
      }
    } catch (error) {
      return error;
    }
  }
}
