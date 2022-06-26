namespace db.store;

using {
  cuid,
  managed
} from '@sap/cds/common';
using {db.common.Phone as Phone} from '../common/types';

entity Clients : cuid, managed {
  @mandatory
  name         : localized String(50);
  @mandatory
  surname      : localized String(50);
  @mandatory
  number       : Phone;
  boughtCount  : Integer default 0;
}