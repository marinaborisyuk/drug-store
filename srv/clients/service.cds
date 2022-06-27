using {db.store} from '../../db';

service ClientsService {
  entity Clients as projection on store.Clients;
}
