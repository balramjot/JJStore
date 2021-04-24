import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AsyncValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { MainServiceService } from './../../core/shared/service/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /**
   * observalbe variable
   */
  private _Obs$ = new Subject<void>();

  /**
   * constructor
   * @param http 
   * @param mainService 
   */
  constructor(private http: HttpClient, private mainService: MainServiceService) { }

  /**
   * Observable for asynchronous requests
   */
  get Obs$(){
    return this._Obs$;
  }
  
  /**
   * insert new category
   * @param formData 
   */
  addCategory(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/addCategory_db/", formData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }
  
  /**
   * check duplicate category name
   */
  categoryExistsOrNot(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      var obj = new Object({ category: control.value });
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post("http://localhost:3000/administrator/asynCheckCategory_db",obj, httpOptions).pipe(
        map(res => {
          return res['Code'] == 0 ? { asynerror: true } : null;       
        })
      );
    };
  }  
  
 /**
  * update category status
  * @param formData 
  */
  updateCategoryStatus(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/updateCategoryStatus_db/", formData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }
  
  /**
   * update category
   * @param formData 
   * @param catId 
   */
  editCategory(formData: any, catId: number){
    let newFormData = Object.assign(formData, {"catId": catId.toString()});
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/editCategory_db/", newFormData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }
   
  /**
   * get all categories
   */
  getAllCategory(){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get("http://localhost:3000/administrator/getAllCategory_db/", httpOptions);
  }
  

} 
