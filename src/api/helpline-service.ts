import { Controller, Get, Body, Post } from "giuseppe";
import { HelplineFacade } from "../facade/helpline-facade";
import { HelplineNumber } from "../models/helpline-number";

@Controller("helplineService")
export class HelplineService {

    @Get("getHelplineNumbers")
    async getHelplineNumbers(): Promise<HelplineNumber[]> {
        return HelplineFacade.getHelplineNumbers();
    }

    @Post("addEditNgo")
    async addEditNgo(@Body() data: HelplineNumber): Promise<any> {
        return HelplineFacade.addEditHelplineNumber(data);
    }
}

