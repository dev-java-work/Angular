import { Component, OnInit } from "@angular/core";
import { IBook } from "./book";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";

@Component({
    selector: 'bm-books',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
    pageTitle : string = 'Book List!';
    imageWidth : number = 50;
    imageMargin :number = 2;
    showImage : boolean = false;
    filteredBooks : IBook[];
    _listFilter : string;

    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value : string){
        this._listFilter = value;
        this.filteredBooks = this.listFilter?this.performFilter(this.listFilter):this.books;
    }
    
    books : IBook[] = [
        {
          "bookId": 1,
          "bookName": "HArry Potter",
          "bookCode": "GDN-0011",
          "releaseDate": "March 19, 2016",
          "description": "written by J.K. Rowling",
          "price": 219.95,
          "starRating": 5.2,
          "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        },
        {
          "bookId": 2,
          "bookName": "Da Vinci Code",
          "bookCode": "GDN-0023",
          "releaseDate": "March 18, 2016",
          "description": "written by Dan Brown",
          "price": 321.99,
          "starRating": 4.2,
          "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        }
      ];

      constructor() {
          this.filteredBooks = this.books;
          this._listFilter = 'potter';
      }
      toggleImage() : void {
          this.showImage = !this.showImage;
      }

      ngOnInit() : void{
          console.log('In OnInit');
      }
      performFilter(filterBy:string): IBook[]{
          filterBy = filterBy.toLocaleLowerCase();
          return this.books.filter((book:IBook) =>book.bookName.toLocaleLowerCase().indexOf(filterBy)!==-1);
      }
}