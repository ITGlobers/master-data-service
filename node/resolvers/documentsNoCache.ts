export const DocumentsNoCache = async (
  _: any,
  {
    acronym,
    schema,
    fields,
    where,
    sort,
    pageSize,
    page,
    isExternal,
  }: {
    acronym: string;
    schema: string;
    fields: [string];
    where: string;
    sort: string;
    pageSize: number;
    page: number;
    isExternal: boolean
  },
  ctx: Context
) => {
  const {
    clients: {
      DocumentsNoCache: documentsNoCacheClient,
      documentRestApi: documentRestApiClient,
    },
  } = ctx;

  const appId: any = process.env.VTEX_APP_ID;
  const settings = await ctx.clients.apps.getAppSettings(appId);

  if (settings.account && settings.appkey && settings.apptoken && isExternal) {
    return documentRestApiClient.searchDocuments(
      acronym,
      schema,
      fields,
      where,
      sort,
      pageSize,
      settings
    );
  } else {
    return documentsNoCacheClient.documentsNoCache(
      acronym,
      schema,
      fields,
      where,
      sort,
      pageSize,
      page
    );
  }
};
