import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  @Input() lastId? : number;
  @Output() bookToAdd = new EventEmitter<Book>();

  addBook(title : string, author : string, price : number){
    const book = new Book(this.lastId!+1, title, author, price);
    this.bookToAdd.emit(book);
  }

}
