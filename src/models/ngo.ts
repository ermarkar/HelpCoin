export class Ngo {
    id?: number;
    name: string;
    description: string;
    ngoType: number;
    website: string;
    location: string;
    locationMap: string;
    owner: number;
    phone: string;
    phoneOther: string;
    fbHandler: string;
    instaHandler: string;
    registrationNo: string;
    registrationDate: string;
    photos: string[];
    email: string;
    constructor(data: {
        id?: number,
        name: string,
        description: string,
        ngoType: number,
        website: string,
        location: string,
        locationMap: string,
        owner: number,
        phone: string,
        phoneOther: string,
        fbHandler: string,
        instaHandler: string,
        registrationNo: string,
        registrationDate: string,
        photos: string[],
        email: string
    }) {
        this.id = data.id ? data.id : null;
        this.name = data.name;
        this.description = data.description;
        this.ngoType = data.ngoType;
        this.website = data.website;
        this.location = data.location;
        this.locationMap = data.locationMap;
        this.owner = data.owner;
        this.phone = data.phone;
        this.phoneOther = data.phoneOther;
        this.fbHandler = data.fbHandler;
        this.instaHandler = data.instaHandler;
        this.registrationNo = data.registrationNo;
        this.registrationDate = data.registrationDate;
        this.photos = data.photos;
        this.email = data.email;
    }
}
