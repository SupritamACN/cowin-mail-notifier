export class UserEntity{
    email:string;
    district:PlaceEntity;
    minAgeLimit:Number;

    constructor(email:string, district:PlaceEntity, minAgeLimit:Number){
        this.email = email;
        this.district = district;
        this.minAgeLimit = minAgeLimit;
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