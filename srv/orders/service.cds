using {db.store} from '../../db';

service OrdersService {
  entity Orders as projection on store.Orders;
  @readonly
  entity Items as projection on store.Items {
    ID,
    name,
    description
  };
  @readonly
  entity Clients as projection on store.Clients {
    ID,
    name,
    surname,
    number 
  };
}
