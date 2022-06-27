using {db.store} from '../../db';

service StoreService {
  @readonly
  entity Items as
    projection on store.Items {
      ID,
      name,
      price,
      description,
      ingredients,
      warnings,
      manufacturer,
      soldCount
    }
    order by soldCount desc;
  @readonly
  entity Clients as projection on store.Clients;  

  action purchase(client : Clients: ID, item : Items: ID);
  
  event purchased { 
    client : Clients: ID;
    item : Items: ID 
  };
}
