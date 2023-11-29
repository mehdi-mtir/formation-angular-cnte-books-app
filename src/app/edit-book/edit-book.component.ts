import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Book } from '../model/book';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnChanges {
  @Input() book! : Book;
  @Output() bookEdited = new EventEmitter<Book>();
  editForm = new FormGroup({
    title : new FormControl('',Validators.required),
    author : new FormControl('', Validators.required),
    price : new FormControl('')
  })


  editBook(){
    const editedBook = new Book(
      this.book!.id,
      this.editForm.value.title || '',
      this.editForm.value.author || '',
      this.editForm.value.price?+this.editForm.value.price:0);
    this.bookEdited.emit(editedBook);
  }

  ngOnChanges(): void {
    this.editForm.setValue({
      title : this.book.title,
      author : this.book.author,
      price : this.book.price+''
    })
}

  ngOnInit(): void {
      this.editForm.setValue({
        title : this.book.title,
        author : this.book.author,
        price : this.book.price+''
      })
  }
}
