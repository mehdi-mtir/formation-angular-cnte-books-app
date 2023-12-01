import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      {
        next : books =>{
                this.books = books;
                this.booksChanged.next(this.books)
              },
        error : err => console.log(err),
        complete : ()=>console.log('Completed!')
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

  addBook(book : Object){
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    this.http.post<Book>(this.baseUrl, book, options ).subscribe(
      {
        next : book=>{
          this.books = [...this.books, book];
          this.booksChanged.next(this.books);
          },
        error : error => console.log(error),
        complete : ()=>console.log('requête terminée! ')
      }

    )


  }

  editBook(book : Book){
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    this.http.put<Book>(
      `${this.baseUrl}/${book.id}`,
      {title : book.title, author : book.author, price : book.price},
      options
    ).subscribe(
      book => {
              this.books = this.books.map(
                b=>b.id===book.id?book:b
              );
              this.booksChanged.next(this.books);
      }
    )
  }

  deleteBook(id : number){
    if (confirm('Êtes-vous sûre de vouloir supprimer le livre?'))
     this.http.delete(`${this.baseUrl}/${id}`).subscribe(
      ()=>{
        this.books = this.books.filter(
          b=>b.id!==id
        )
        this.booksChanged.next([...this.books]);
      }
    )


    //console.log(this.books);
  }
}
