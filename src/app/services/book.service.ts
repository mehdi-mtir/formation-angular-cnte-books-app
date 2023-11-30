import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books = [
    new Book(1, "Atomic habits", "James clear", 20),
    new Book(2, "The slight edge", "Jeff Olsen", 30),
    new Book(3, "Power of habits", "Charles Duhigg", 25)
  ]

  booksChanged = new Subject<Book[]>();

  constructor() { }

  getBooks() : Book[]{
    return [...this.books];
  }

  getBookById(id : number):Book{
    let book = this.books.find(b=>b.id === id)
    if (book === undefined)
      book = new Book(0,'','',0)
    return book
  }

  getLastId():number{
    return this.books[this.books.length-1].id
  }

  addBook(book : Book){
    this.books = [...this.books, book];
  }

  editBook(book : Book){
    this.books = this.books.map(
      b=>b.id===book.id?book:b
    )
  }

  deleteBook(id : number){
    if (confirm('Êtes-vous sûre de vouloir supprimer le livre?'))
      this.books = this.books.filter(
        b=>b.id!==id
    )
    this.booksChanged.next([...this.books]);
    //console.log(this.books);
  }
}
