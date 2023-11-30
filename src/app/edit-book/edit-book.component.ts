import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Book } from '../model/book';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit  {
  book! : Book;
   editForm = new FormGroup({
    title : new FormControl('',Validators.required),
    author : new FormControl('', Validators.required),
    price : new FormControl('')
  })

  constructor(
    private activatedRoute : ActivatedRoute,
    private bookService : BookService,
    private router : Router){}

  editBook(){
    const editedBook = new Book(
      this.book!.id,
      this.editForm.value.title || '',
      this.editForm.value.author || '',
      this.editForm.value.price?+this.editForm.value.price:0);
    this.bookService.editBook(editedBook);
    this.router.navigate(['/books']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        this.book = this.bookService.getBookById(+params['id']);
        console.log(this.book);
        this.editForm.setValue({
          title : this.book.title,
          author : this.book.author,
          price : this.book.price+''
        })
      }
    )
  }
}
