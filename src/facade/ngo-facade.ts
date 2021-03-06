import { DB } from "../utilitis/db-connect";
import { DB_PROCS } from "../utilitis/procs";
import { Query } from "../models/query";
import { Ngo } from "../models/ngo";

export class NgoFacade {

    private static PROCS = DB_PROCS.NGO;

    static async getNgos(): Promise<any> {
        const query = new Query({
            name: this.PROCS.GET,
            arguments: {}
        });
        return DB.query(query);
    }

    static async addEditNgo(data: Ngo): Promise<any> {
        const query = new Query({
            name: this.PROCS.ADD_EDIT,
            arguments: new Ngo(data)
        });
        return DB.query(query);
    }
}
