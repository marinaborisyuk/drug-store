namespace db.store;

using {
  cuid,
  managed
} from '@sap/cds/common';
using {db.common.Price as Price} from '../common/types';

entity Items : cuid, managed {
  @mandatory
  name         : localized String(50);
  @mandatory
  price        : Price;
  @mandatory
  description  : localized String(500);
  @mandatory
  ingredients  : localized String(500);
  @mandatory
  warnings     : localized String(500);
  @mandatory
  manufacturer : String(200);
  @assert.range : [
    0,
    2147483647 // Integer max value
  ]
  soldCount    : Integer default 0;
}
