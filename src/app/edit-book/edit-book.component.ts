import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  @Input() book? : Book;
  @Output() bookEdited = new EventEmitter<Book>();

  editBook(title : string, author : string, price : number){
    const editedBook = new Book(
      this.book!.id,
      title,
      author,
      price);
    this.bookEdited.emit(editedBook);
  }
}
