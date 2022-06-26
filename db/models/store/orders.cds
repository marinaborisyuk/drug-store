namespace db.store;

using {
  cuid,
  managed
} from '@sap/cds/common';

using {db.store.Clients as Clients} from './clients';
using {db.store.Items as Items} from './items';

entity Orders : cuid, managed {
  @mandatory  
  client : Association to Clients;
  @mandatory  
  item   : Association to Items;
}