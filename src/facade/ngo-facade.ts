import { DB } from "../utilitis/db-connect";
import { DB_PROCS } from "../utilitis/procs";
import { Query } from "../models/query";
export class NgoFacade {

    private static PROCS = DB_PROCS.NGO;

    static async getNgos(): Promise<any> {
        const query = new Query({
            name: this.PROCS.GET,
            arguments: {}
        });
        return DB.query(query);
    }
}
