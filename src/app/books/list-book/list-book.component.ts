import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  books? : Book[];

  constructor(private service : BookService){}

  deleteBook(id : number){
    this.service.deleteBook(id);
  }

  ngOnInit(): void {
      this.service.getBooks().subscribe(
        books => this.books=books
      )
      this.service.booksChanged.subscribe(
        books => this.books = books
      )
  }

}
