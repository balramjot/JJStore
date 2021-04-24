import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AsyncValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { MainServiceService } from './../../core/shared/service/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

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
   * insert new manufacturer
   * @param formData 
   */
  addManufacturer(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/addManufacturer_db/", formData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }
  
  /**
   * check duplicate manufacturer name
   */
  manufacturerExistsOrNot(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      var obj = new Object({ manufacturer: control.value });
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post("http://localhost:3000/administrator/asynCheckManufacturer_db",obj, httpOptions).pipe(
        map(res => {
          return res['Code'] == 0 ? { asynerror: true } : null;       
        })
      );
    };
  }  
  
 /**
  * update manufacturer status
  * @param formData 
  */
  updateManufacturerStatus(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/updateManufacturerStatus_db/", formData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }
  
  /**
   * update manufacturer
   * @param formData 
   * @param manuId 
   */
  editManufacturer(formData: any, manuId: number){
    let newFormData = Object.assign(formData, {"manuId": manuId.toString()});
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/editManufacturer_db/", newFormData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }
   
  /**
   * get all manufacturers
   */
  getAllManufacturer(){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get("http://localhost:3000/administrator/getAllManufacturer_db/", httpOptions);
  }
  

} 
