import { IOClients } from '@vtex/api'

import { DocumentsNoCacheClient } from './document'
import {DocumentRestApiClient} from './document/res-api'


export class Clients extends IOClients {
  get DocumentsNoCache() {
    return this.getOrSet('DocumentsNoCache', DocumentsNoCacheClient)
  }

  get documentRestApi() {
    return this.getOrSet('documentRestApi', DocumentRestApiClient)
  }
}
