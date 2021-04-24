import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ProductService } from './../product.service';
import { NewproductComponent } from './../newproduct/newproduct.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  /**
   * variables
   */
  private querySubscription;
  private subs = new SubSink;

  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';
  fetchData: any = { 'tblData':'' };
  sentParmas: any = new Object();

  displayedColumns: string[] = ['col1','col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: Router, private fb: FormBuilder, private service: ProductService, public dialog: MatDialog) { }
  
  
  /**
   * initialize form values on page load
   */
  ngOnInit(): void {
    this.getAllProducts();
    this.dataSource = new MatTableDataSource(this.fetchData.tblData);

    this.service.Obs$.subscribe(()=> {
      this.getAllProducts();
    });
  }
 
  /**
   * get all products list
   */
  getAllProducts(){
    this.querySubscription = this.service.getAllProduct().subscribe((res) => {
    this.fetchData.tblData = res['data'];
    this.dataSource = new MatTableDataSource(this.fetchData.tblData);
    this.dataSource.sort = this.sort;      
    this.dataSource.paginator = this.paginator;
  },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.success = false;
      },
      () => {
      }
    );
  }

  /**
   * filter data tables
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * update product status
   * @param event 
   * @param req1 
   * @param req2 
   */
  updateProductStatus(event,req1,req2){
      this.dataLoading = true;                         
      this.sentParmas = { "param1": req1, "param2": req2 };
      this.querySubscription = this.service.updateProductStatus(this.sentParmas).subscribe(
        (res)=> {
          if (res['Code'] > 0)                
          {
            this.error = false;
            this.errorMessage = res['Message'];               
            this.dataLoading = false;                          
            this.success = true;                               
          }
          else                                             
          {
            this.error = true;
            this.success = false;
            this.errorMessage = res['Message'];
            this.dataLoading = false;
          }
        },
        (error)=>{                                        
          this.error = true;
          this.success = false;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        ()=>{
          this.dataLoading = false;
        }
    );
  }

openDialog(): void {
    const dialogRef = this.dialog.open(NewproductComponent,{
      disableClose: true,
      autoFocus: false,
      width: '40%'
    });
    
    dialogRef.afterOpened().subscribe(result => {
      document.getElementById("blurBackground").className = "blur-background";
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
    });
  }

   /**
   * unsubscribing all the services after their use
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
