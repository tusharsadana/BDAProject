import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SellDialogComponent } from '../sell-dialog/sell-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}



export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-sell-car',
  templateUrl: './sell-car.component.html',
  styleUrls: ['./sell-car.component.css'],
  providers: [{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ]
})
export class SellCarComponent implements OnInit {

  sellCar: FormGroup;
  manufacturer: string[];
  conditions:string[];
  cylinders: string[];
  fuelType: string[];
  transmission: string[];
  drive: string[];
  types:string[];
  text: '';  


  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      width: '250px',
      data: {name: 'tushar', animal: 'yay'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit() {

    this.sellCar = this.fb.group({
      manufacture: [[], Validators.required],
      cond: [[], Validators.required],
      cyl: [[], Validators.required],
      fl: [[], Validators.required],
      dist: [ '', Validators.required],
      transs: [[], Validators.required],
      driveType: [[], Validators.required],
      carType: [[], Validators.required],
      text: ['', Validators.required]

    });

    this.manufacturer = ['a'];
    this.conditions = ['a'];
    this.cylinders = ['a'];
    this.fuelType = ['a'];
    this.transmission = ['a'];
    this.drive = ['a'];
    this.types = ['a'];
    

  

  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  submitHandler(){
    console.log(this.sellCar.value)
    console.log(this.date.value)
  }

}

