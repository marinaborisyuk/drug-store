using {db.store} from '../../db';

service ItemsService {
  entity Items as projection on store.Items;
}
