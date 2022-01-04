import {
  ParamsContext,
  RecorderState,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients'
import { DocumentsNoCache } from './resolvers/documentsNoCache'
import { CreateDocument } from './resolvers/createDocument'
import { UpdateDocument } from './resolvers/updateDocument'
import { DeleteDocument } from './resolvers/deleteDocument'
import { GetDocument } from './resolvers/getDocument'

const MEDIUM_TIMEOUT_MS = 2 * 1000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Query: {
        DocumentsNoCache,
        GetDocument
      },
      Mutation: {
        CreateDocument,
        UpdateDocument,
        DeleteDocument
      }
    },
  },
})
