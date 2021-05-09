import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DistrictEntity } from '../model/DistrictEntity';

@Injectable({
  providedIn: 'root'
})
export class CowinapiService {

  constructor(private _http: HttpClient) { }

  getAllDistrict():Observable<DistrictEntity[]>{
    return this._http.get<DistrictEntity[]>(
      environment.COWIN_BASE_URL + environment.COWIN_DISTRICT + 36
    );
  }

}
