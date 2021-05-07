import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css']
})
export class SubpageComponent implements OnInit, AfterViewInit {
    
  selectedState:Number = 3;
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
    this.selectedState = this.stateList[0].id;
    
  }
  
  subscribersForm:any;

  ngOnInit(): void {
    this.subscribersForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      district: [null, Validators.required],
      state: [null]
    })
   }


}
