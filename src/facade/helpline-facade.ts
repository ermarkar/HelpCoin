import { DB } from "../utilitis/db-connect";
import { DB_PROCS } from "../utilitis/procs";
import { Query } from "../models/query";
import { HelplineNumber } from "../models/helpline-number";

export class HelplineFacade {

    private static PROCS = DB_PROCS.HELPLINE;

    static async getHelplineNumbers(): Promise<HelplineNumber[]> {
        const query = new Query({
            name: this.PROCS.GET,
            arguments: null
        });
        return DB.query(query);
    }

    static async addEditHelplineNumber(data: HelplineNumber): Promise<any> {
        const query = new Query({
            name: this.PROCS.ADD_EDIT,
            arguments: new HelplineNumber(data)
        });
        return DB.query(query);
    }
}
