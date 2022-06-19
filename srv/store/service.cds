using {db.store} from '../../db';

service StoreService {
  @readonly
  entity Items as
    projection on store.Items {
      ID,
      name,
      // price,
      description,
      ingredients,
      warnings,
      manufacturer,
      soldCount
    }
    order by soldCount desc;
}
