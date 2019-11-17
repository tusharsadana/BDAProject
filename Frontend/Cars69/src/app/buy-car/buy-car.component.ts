import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-buy-car',
  templateUrl: './buy-car.component.html',
  styleUrls: ['./buy-car.component.css']
})
export class BuyCarComponent implements OnInit {
  
  buyCar: FormGroup;
  manufacturer: string[];
  conditions:string[];
  cylinders: string[];
  fuelType: string[];
  transmission: string[];
  drive: string[];
  types:string[];
  years: string[];  
  colors: string[];
  items: any;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.buyCar = this.fb.group({
      manufacture: [[], Validators.required],
      ageCar: [[], Validators.required],
      cyl: [[], Validators.required],
      fl: [[], Validators.required],
      dist: [ '', Validators.required],
      transs: [[], Validators.required],
      driveType: [[], Validators.required],
      carType: [[], Validators.required],
      color: [[], Validators.required]

    });

    this.manufacturer = ['a'];
    this.conditions = ['a'];
    this.cylinders = ['a'];
    this.fuelType = ['a'];
    this.transmission = ['a'];
    this.drive = ['a'];
    this.types = ['a'];
    this.years = ['a']
    this.colors = ['a'];    
    this.items = [{'title': 'A'}, {'title': 'B'}]

  }

  submitHandler(){
    console.log(this.buyCar.value)
  }


}
