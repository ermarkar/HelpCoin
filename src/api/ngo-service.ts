import { Controller, Get, Body, Post } from "giuseppe";
import { NgoFacade } from "../facade/ngo-facade";
import { Ngo } from "../models/ngo";

@Controller("ngoService")
export class NgoService {

    @Get("getNgos")
    async getNgos(): Promise<any> {
        return NgoFacade.getNgos();
    }

    @Post("addEditNgo")
    async addEditNgo(@Body() data: Ngo): Promise<any> {
        return NgoFacade.addEditNgo(data);
    }
}

