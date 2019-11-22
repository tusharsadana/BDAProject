import {
  Component,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material";
import {
  Inject
} from '@angular/core';



@Component({
  selector: 'app-sell-dialog',
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.css']
})
export class SellDialogComponent implements OnInit {
  description: any;
  initial:any;
  final:any;

  constructor(private dialogRef: MatDialogRef < SellDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data['ans'];
    this.initial = Math.round(this.description - (this.description*0.05)) 
    this.final = Math.round(this.description  + (this.description*0.05))

  }

  ngOnInit() {
  }

}
