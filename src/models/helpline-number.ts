export class HelplineNumber {
    id: number;
    name: string;
    profession: string;
    helpingArea: string;
    helpingHours: string;
    contactNo: string;
    constructor(data?: {
        id: number,
        name: string,
        profession: string,
        helpingArea: string,
        helpingHours: string,
        contactNo: string
    }) {
        this.id = data.id;
        this.name = data.name;
        this.profession = data.profession;
        this.helpingArea = data.helpingArea;
        this.helpingHours = data.helpingHours;
        this.contactNo = data.contactNo;
    }
}