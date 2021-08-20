import { IOClients } from '@vtex/api'

import { DocumentsNoCacheClient } from './document'


export class Clients extends IOClients {
  get DocumentsNoCache() {
    return this.getOrSet('DocumentsNoCache', DocumentsNoCacheClient)
  }
}
