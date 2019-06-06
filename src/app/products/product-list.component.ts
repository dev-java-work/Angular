import {Component, OnInit} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
selector : 'pm-products',
templateUrl : './product-list.component.html',
styleUrls : ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
 pageTitle : string = 'Product List!';
 imageWidth :number =50;
 imageMargin :number = 10;
 showImage : boolean;
 errorMessage : string;
 //listFilter : string ='cart';
 _listFilter : string;
 get listFilter() : string{
   return this._listFilter;
 }
 set listFilter(_listerner : string){
   this._listFilter = _listerner;
   this.filterProducts =  this._listFilter? this.performFilter(this._listFilter) : this.products;
 }
 filterProducts : IProduct[];
 products : IProduct[] ;

 constructor(private productService : ProductService){  
   //this.listFilter = 'cart';
 }
 performFilter(filterBy: string): IProduct[] {
  filterBy=filterBy.toLocaleLowerCase();
  return this.products.filter((product:IProduct) =>
                            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
 }
 toggleImage(): void {
   this.showImage = !this.showImage;
 }

 ngOnInit() : void {
   console.log("in onInit");
   this.productService.getProducts().subscribe(
     product => {
          this.products = product,
          this.filterProducts = this.products
     },
     error => this.errorMessage = <any>error
   );
   
 }

 onRatingClick(message : string) : void{
      this.pageTitle = 'Product List '+ message;
 }
}