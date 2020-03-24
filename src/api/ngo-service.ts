import { Controller, Get } from "giuseppe";
import { NgoFacade } from "../facade/ngo-facade";

@Controller("ngoService")
export class NgoService {

    @Get("getNgos")
    async getNgos(): Promise<any> {
        return NgoFacade.getNgos();
    }
}

