import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../model/book';
import { NgForm } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private service : BookService,
    private router : Router){}

  addBook(f : NgForm){
    console.log(f)
    const book = {
      title : f.value.title,
      author : f.value.author,
      price : f.value.price
    };
    this.service.addBook(book);
    this.router.navigate(['/books']);
  }

}
