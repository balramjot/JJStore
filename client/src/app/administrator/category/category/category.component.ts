import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CategoryService } from './../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  /**
   * variables
   */
  private querySubscription;
  private subs = new SubSink;

  addCategoryForm: FormGroup;
  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';
  fetchData: any = { 'tblData':'' };
  sentParmas: any = new Object();

  editForm: boolean = false;
  editCategoryForm: FormGroup;

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
  constructor(private route: Router, private fb: FormBuilder, private service: CategoryService) { }

  /**
   * initializing form values on page load
   */
  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      category: new FormControl(null, { validators: [Validators.required],  asyncValidators: [this.service.categoryExistsOrNot()],  updateOn: 'blur'}),
    });

    this.service.Obs$.subscribe(()=> {
      this.getAllCategories();
    });

    this.getAllCategories();                                                                 
    this.dataSource = new MatTableDataSource(this.fetchData.tblData);

    this.editForm = false;

    this.editCategoryForm = this.fb.group({
      category: new FormControl(null, { validators: [Validators.required] })
    });
  }

  /**
   * create new category
   */
  addCategory(formData: any){
    this.dataLoading = true;              
    this.querySubscription = this.service.addCategory(formData).subscribe(
      (res)=> {
        if (res['Code'] > 0)                        
        {
          this.error = false;
          this.errorMessage = res['Message'];                                    
          this.dataLoading = false;                                              
          this.success = true;                                              
          this.addCategoryForm.reset();                                          
          this.addCategoryForm.controls.category.setErrors(null);                                       
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
   * get all categories
   */
  getAllCategories() {
    this.querySubscription = this.service.getAllCategory().subscribe((res) => {
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
   * edit category
   * @param formData 
   * @param catId 
   */
  editCategory(formData: any, catId : number){
    this.dataLoading = true;                                      
    this.querySubscription = this.service.editCategory(formData, catId).subscribe(
      (res)=> {
        if (res['Code'] > 0)                           
        {
          this.error = false;
          this.errorMessage = res['Message'];                                    
          this.dataLoading = false;                                               
          this.success = true;                                          
          this.editCategoryForm.reset();                  
          this.editCategoryForm.controls.category.setErrors(null);
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
   * particular category information
   * @param event 
   * @param req 
   */
  getCategoryInfo(event,req){
    this.editForm = true;    
    this.editCategoryForm.controls['category'].setValue(req.category);                                        
    this.sentParmas = { 'catId': req.id };
  }

  /**
   * category status update
   * @param event 
   * @param req1 
   * @param req2 
   */
  updateCategoryStatus(event,req1,req2){
    this.dataLoading = true;                         
    this.sentParmas = { "param1": req1, "param2": req2 };
    this.querySubscription = this.service.updateCategoryStatus(this.sentParmas).subscribe(
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
