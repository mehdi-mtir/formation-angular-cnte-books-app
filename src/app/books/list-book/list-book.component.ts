import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit, OnDestroy {
  books? : Book[];
  bookSubscription? : Subscription;

  constructor(private service : BookService){}

  deleteBook(id : number){
    this.service.deleteBook(id);
  }

  ngOnDestroy(): void {
      this.bookSubscription?.unsubscribe();
  }

  ngOnInit(): void {
      /*this.service.getBooks().subscribe(
        books => this.books=books
      )*/
      this.books = this.service.getBooks();
      this.bookSubscription = this.service.booksChanged.subscribe({
        next : books => this.books = books
      })
  }

}
