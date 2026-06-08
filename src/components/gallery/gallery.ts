import { Component, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Image } from '../../models/image';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {

  images: Image[] = [
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2y-2W1umLSHwBiZQfu0CFteXzOaLJgL5Og&s'),
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMT3qHX0UlPFRz68wWPcJj5HnDCb5oyLD2A&s'),
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfsuJ7Kc-e9oWBjlgWaNGgXjH4DpURzQWCiA&s'),
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1GyBuRw0rOOwTxe4x7fEHYaGnz-aruQ1Q&s')
  ];

  currentIndex = 0;
  intervalId: any;

  // Inject ChangeDetectorRef to trigger change detection manually
  constructor(private cdr: ChangeDetectorRef) {}

  display() {
    this.stop(); 
    
    this.intervalId = setInterval(() => {
      this.next();
      this.cdr.detectChanges(); 
    }, 1500);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}