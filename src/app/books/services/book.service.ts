import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books:Book[] = [];

  private baseUrl = 'http://localhost:3000/books'

  booksChanged = new Subject<Book[]>();

  constructor(private http : HttpClient) { }

  /*getBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(this.baseUrl)
    //return [...this.books];
  }*/

  getBooks() : Book[]{
    this.http.get<Book[]>(this.baseUrl).subscribe(
      books =>{
        this.books = books;
        this.booksChanged.next(this.books)
      }
    )
    return this.books;
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
