import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { PlaceEntity, UserEntity } from 'src/app/model/UserEntity';
import { CowinapiService } from 'src/app/service/cowinapi.service';
import { DistrictEntity } from 'src/app/model/DistrictEntity';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css']
})
export class SubpageComponent implements OnInit, AfterViewInit {


  subscribersForm: any;
  unSubscribersForm: any;
  isVisible: boolean = true;
  email_message: string = '';
  district_message: string = '';
  subscriptionMessage: boolean = false;
  districtList: DistrictEntity[] = [];
  selectedSate:Number = 36;
  stateList: {
    id: Number;
    stateName: string;
  }[] = [
      { id: 36, stateName: 'West Bengal' },
    ];

  constructor(private _fb: FormBuilder,
    private _userService: UserService,
    private _cowinapiService: CowinapiService) {
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this._cowinapiService.getAllDistrict().subscribe(
      (res:any) => {
        res.districts.forEach((d:any) => {
          this.districtList.push(new DistrictEntity(d.district_id, d.district_name));
        })
      }
    )

    this.subscribersForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      district: [null, Validators.required],
      state: [{ value: this.stateList[0].id, disabled: true }]
    });
    this.unSubscribersForm = this._fb.group({
      u_email: [null, [Validators.required, Validators.email]]
    })
  }

  toggleForm(): void {
    this.email_message = this.subscribersForm.value.email;
    this.district_message = this.subscribersForm.value.district;
    this.subscriptionMessage = false;
    this.isVisible = !this.isVisible;
  }
  doSubscribe(): void {
    let districtName = '';
    this.districtList.forEach(d => {
      if(d.district_id == this.subscribersForm.value.district)
        districtName = d.district_name;
    })
    let userEntity:UserEntity = new UserEntity(
      this.subscribersForm.value.email,
      new PlaceEntity(
        this.subscribersForm.value.district,
        districtName
      )
    );
    this.subscribersForm.state = this.stateList[0].id;
    this._userService.doSubsribeUser(userEntity).subscribe(
      res => {
        this.email_message = 'Please verify ' + this.subscribersForm.value.email + ', to comeplete subsription for';
        this.district_message = districtName;
        this.subscriptionMessage = true;
        this.subscribersForm.patchValue(
          {
            'email': null,
            'district': null
          }
        );
        return 'success';
      },
      err => {
        console.log(err.error.text);
        this.subscriptionMessage = true;
        this.email_message = err.error.text;
        this.district_message = '';
        return 'Issue while saving the user';
      }
    );
  }

  doUnSubscribe(e: any): string {
    console.log(this.unSubscribersForm.value)
    let val: any = this.unSubscribersForm.value;
    //TODO: return value after successful api call
    this._userService.doUnSubscribeUser(this.unSubscribersForm.value.u_email).subscribe(
      res => {
        this.email_message = '' + val.u_email + ', unsubscribed!';
        this.subscriptionMessage = true;
        this.unSubscribersForm.reset();
      },
      err => {
        this.email_message = '' + err.error.text;
        this.subscriptionMessage = true;
        this.unSubscribersForm.reset();      
      }
    )
    return val;
  }
}
