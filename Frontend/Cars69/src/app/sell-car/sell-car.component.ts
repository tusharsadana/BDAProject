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
import { PostService } from '../services/post.service';


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
  show = false;
  answerDialog:any;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private postService: PostService) {}

  openDialog(answer): void {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      width: '250px',
      data: answer
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

    this.postService.getOptions().subscribe(res => {
      console.log(res)
      this.manufacturer = res['manufacturer'];
      this.conditions = res['condition'];
      this.cylinders = res['cylinders'];
      this.fuelType = res['fuel'];
      this.transmission = res['transmission'];
      this.drive = res['drive'];
      this.types = res['type'];
      this.show = true;

    }, err => {

    });
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
    var date = new Date(this.date.value).getFullYear();
    this.sellCar.value['date'] = date;
    this.postService.getPrice(this.sellCar.value).subscribe(res => {
      console.log(res)
      this.answerDialog = res;
      this.openDialog(this.answerDialog);

    }, err =>{

    });
  }

}

