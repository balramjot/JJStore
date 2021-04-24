import { Component, OnInit } from '@angular/core';
import {MatDialogRef,MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cancelproduct',
  templateUrl: './cancelproduct.component.html',
  styleUrls: ['./cancelproduct.component.css']
})
export class CancelproductComponent implements OnInit {

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CancelproductComponent>) { }

  ngOnInit(): void {
  }

  public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
    } 
    
  public cancelN(): void { 
    this.dialog.closeAll();
  }
  
}
