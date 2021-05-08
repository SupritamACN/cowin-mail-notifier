import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css']
})
export class SubpageComponent implements OnInit, AfterViewInit {
  
  
  subscribersForm:any;
  unSubscribersForm:any;
  isVisible:boolean = true;
  email_message:string = '';
  district_message:string = '';
  subscriptionMessage:boolean = false;
  districtList: {
    id: Number;
    districtName: string;
  }[] = [
    {id: 1, districtName: 'Kolkata'},
    {id: 2, districtName: 'Birbhum'},
    {id: 3, districtName: 'Hoogly'},
    {id: 4, districtName: 'Medinapur'}
  ];
  stateList: {
    id: Number;
    stateName: string;
  }[] = [
    {id: 11, stateName: 'West Bengal'},
    {id: 22, stateName: 'Delhi'},
    {id: 32, stateName: 'Telengana'},
    {id: 34, stateName: 'Chennai'},
    {id: 44, stateName: 'Assam'},
  ];

  constructor(private _fb:FormBuilder){
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.subscribersForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      district: [null, Validators.required],
      state: [{value: this.stateList[2].id, disabled: true}]
    });
    this.unSubscribersForm = this._fb.group({
      u_email: [null, [Validators.required, Validators.email]]
    })
   }

   showUnsubscribeForm():void{
     this.isVisible = !this.isVisible;
   }
   doSubscribe():string{
    console.log(this.subscribersForm.value)
    this.email_message = this.subscribersForm.value.email;
    this.district_message = this.subscribersForm.value.district;
    this.subscriptionMessage = true;
    this.subscribersForm.reset();
    return 'success';
   }

   doUnSubscribe(e:any):string{
     console.log(this.unSubscribersForm.value)
     let val:any = this.unSubscribersForm.value;
     //TODO: return value after successful api call
     this.email_message = ''+val.u_email;
     this.subscriptionMessage = true;
     this.unSubscribersForm.reset();
     return val;
   }
}
