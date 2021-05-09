export class UserEntity{
    email:string;
    district:PlaceEntity;

    constructor(email:string, district:PlaceEntity){
        this.email = email;
        this.district = district;
    }
}
export class PlaceEntity{
    place_id:string;
    place_name:string;

    constructor(place_id:string, place_name:string){
        this.place_id = place_id;
        this.place_name = place_name;
    }
}