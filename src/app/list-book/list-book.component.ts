import { Component } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  books = [
    new Book(1, "Atomic habits", "James clear", 20),
    new Book(2, "The slight edge", "Jeff Olsen", 30),
    new Book(3, "Power of habits", "Charles Duhigg", 25)
  ]
  action = ''
  bookToEdit? : Book;

  changeAction(newAction : string) : void{
    this.action = newAction
  }

  showEdit(book : Book){
    this.bookToEdit = book;
    this.changeAction('edit');
  }

  editBook(book : Book){
    this.books = this.books.map(
      b=>b.id===book.id?book:b
    )
    this.changeAction('');
  }

  deleteBook(id : number){
    if (confirm('Êtes-vous sûre de vouloir supprimer le livre?'))
      this.books = this.books.filter(
        b=>b.id!==id
      )
    }

  addBookToList(book : Book){
    this.books.push(book);
    this.changeAction('');
  }

}
