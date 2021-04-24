import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AsyncValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { MainServiceService } from './../../core/shared/service/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
   * get products list
   */
  getAllProduct(){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get("http://localhost:3000/administrator/getAllProduct_db/", httpOptions);
  }

  /**
   * update product status
   * @param formData 
   */
  updateProductStatus(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/updateProductStatus_db/", formData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }

  uploadImage(formData: any){
    var newFormData = new FormData();
    for (var newfile of formData.getAll('file[]')) {
      newFormData.append('file', newfile);
    } 
    let httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json'}) };
    return this.http.post("http://localhost:3000/administrator/uploadImage_db/", newFormData, httpOptions);
  }

  /**
   * check duplicate sku number
   */
  skuNoExistsOrNot(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      var obj = new Object({ skuNo: control.value });
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post("http://localhost:3000/administrator/asynCheckSkuNo_db",obj, httpOptions).pipe(
        map(res => {
          return res['Code'] == 0 ? { asynerror: true } : null;       
        })
      );
    };
  }
  
  addProduct(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/addProduct_db/", formData, httpOptions)
    .pipe(
      tap(()=>{
      this._Obs$.next();
      })
    );
  }

}
