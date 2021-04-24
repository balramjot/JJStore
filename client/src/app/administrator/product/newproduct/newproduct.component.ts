import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from './../product.service';
import { CancelproductComponent } from '../cancelproduct/cancelproduct.component';
import { qtyAltQty } from '../../../core/shared/validator/qty-altqty.validator';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit, OnDestroy {

  /**
   * variables
   */
  private querySubscription;
  private subs = new SubSink;

  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;

  errorMessage : String = '';

  wasFormChanged: boolean = false;
  fileData: string[] = [];
  previewUrl:any = null;
  uploadedFilePath: string = null;
  customImage: string = "assets/img/dummy.jpg";

  addProductForm: FormGroup;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  uploadButtonCheck: boolean = false;

  constructor(private route: Router, private fb: FormBuilder, private service: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      skuNo: new FormControl(null, { validators: [Validators.required], asyncValidators: [this.service.skuNoExistsOrNot()], updateOn: 'blur' }),
      category: [null, Validators.required],
      manufacturer: [null, Validators.required],
      productName: [null, Validators.required],
      productDescription: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      allotedQuantity: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
  },{
    validator: qtyAltQty('quantity', 'allotedQuantity')
});
     
  }

  closeDialog(): void {  
    if(this.wasFormChanged){
      const dialogRef = this.dialog.open(CancelproductComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }
  
  uploadFile() {     
      this.dataLoading = true;    
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append('file[]', this.files[i]);
      }
      
      this.querySubscription = this.service.uploadImage(formData).subscribe(
        (res)=> {
          if (res['Code'] > 0) {
            this.error = false;
            this.success = true;
          } else {
            this.error = true;
            this.success = false;
          }
          this.errorMessage = res['Message'];
          this.dataLoading = false;
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
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

   /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
            this.files[index].progressBarValue = true;
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }

      if(this.files.length === index + 1)
        this.uploadButtonCheck = true;
    }, 1000, 
    
    
      );
  }

    /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    let fileType: string[] = ["image/png","image/jpg","image/jpeg","image/gif","image/tiff","image/bpg"];
    for (const item of files) {
      if(fileType.indexOf(item.type) != -1) {
        item.progress = 0;
        this.files.push(item);
      } else {
          this.error = true;
          this.success = false;
          this.errorMessage = "Invalid Image Format";
        }
          
    }
    
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * add new product to the database
   */
  addProduct(formData: any) {
    let fileLength: Number = this.files.length;
      let obj = {
        'fileLength': fileLength
      }
     
      formData.push(obj);
      console.log(formData);

    //   this.dataLoading = true;                                                                      
    //   this.querySubscription = this.service.addProduct(formData).subscribe(
    //     (res)=> {
    //       this.error = false;
    //       this.success = true;
    //       this.errorMessage = res['Message'];
    //       this.dataLoading = false;
    //       this.dialog.closeAll();
    //     },
    //     (error)=>{                                                                                 
    //       this.error = true;
    //       this.success = false;
    //       this.errorMessage = error.message;
    //       this.dataLoading = false;
    //     },
    //     ()=>{
    //       this.dataLoading = false;
    //     }
    // );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
