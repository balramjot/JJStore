import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ManufacturerService } from './../manufacturer.service';


@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit, OnDestroy {
  /**
   * variables
   */
  private querySubscription;
  private subs = new SubSink;

  addManufacturerForm: FormGroup;
  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';
  fetchData: any = { 'tblData':'' };
  sentParmas: any = new Object();

  editForm: boolean = false;
  editManufacturerForm: FormGroup;

  /**
   * for data tables
   */
  displayedColumns: string[] = ['col1','col2', 'col3', 'col4'];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

   /**
    * constructor
    */
  constructor(private route: Router, private fb: FormBuilder, private service: ManufacturerService) { }

  /**
   * initializing form values on page load
   */
  ngOnInit(): void {
    this.addManufacturerForm = this.fb.group({
      manufacturer: new FormControl(null, { validators: [Validators.required],  asyncValidators: [this.service.manufacturerExistsOrNot()],  updateOn: 'blur'}),
    });

    this.service.Obs$.subscribe(()=> {
      this.getAllManufacturers();
    });

    this.getAllManufacturers();                                                                 
    this.dataSource = new MatTableDataSource(this.fetchData.tblData);

    this.editForm = false;

    this.editManufacturerForm = this.fb.group({
      manufacturer: new FormControl(null, { validators: [Validators.required] })
    });
  }

  /**
   * create new manufacturer
   */
  addManufacturer(formData: any){
    this.dataLoading = true;              
    this.querySubscription = this.service.addManufacturer(formData).subscribe(
      (res)=> {
        if (res['Code'] > 0)                        
        {
          this.error = false;
          this.errorMessage = res['Message'];                                    
          this.dataLoading = false;                                              
          this.success = true;                                              
          this.addManufacturerForm.reset();                                          
          this.addManufacturerForm.controls.manufacturer.setErrors(null);                                       
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

  /**
   * get all manufacturers
   */
  getAllManufacturers() {
    this.querySubscription = this.service.getAllManufacturer().subscribe((res) => {
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
   * edit manufacturer
   * @param formData 
   * @param manuId 
   */
  editManufacturer(formData: any, manuId : number){
    this.dataLoading = true;                                      
    this.querySubscription = this.service.editManufacturer(formData, manuId).subscribe(
      (res)=> {
        if (res['Code'] > 0)                           
        {
          this.error = false;
          this.errorMessage = res['Message'];                                    
          this.dataLoading = false;                                               
          this.success = true;                                          
          this.editManufacturerForm.reset();                  
          this.editManufacturerForm.controls.manufacturer.setErrors(null);
          this.editForm = false;                          
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

  /**
   * particular manufacturer information
   * @param event 
   * @param req 
   */
  getManufacturerInfo(event,req){
    this.editForm = true;    
    this.editManufacturerForm.controls['manufacturer'].setValue(req.manufacturer);                                        
    this.sentParmas = { 'manuId': req.id };
  }

  /**
   * manufacturer status update
   * @param event 
   * @param req1 
   * @param req2 
   */
  updateManufacturerStatus(event,req1,req2){
    this.dataLoading = true;                         
    this.sentParmas = { "param1": req1, "param2": req2 };
    this.querySubscription = this.service.updateManufacturerStatus(this.sentParmas).subscribe(
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

   /**
   * unsubscribing all the services after their use
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
