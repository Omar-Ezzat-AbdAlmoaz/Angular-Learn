import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gallery {
  protected readonly images: Image[] = [
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2y-2W1umLSHwBiZQfu0CFteXzOaLJgL5Og&s'),
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMT3qHX0UlPFRz68wWPcJj5HnDCb5oyLD2A&s'),
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfsuJ7Kc-e9oWBjlgWaNGgXjH4DpURzQWCiA&s'),
    new Image('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1GyBuRw0rOOwTxe4x7fEHYaGnz-aruQ1Q&s'),
  ];

  // Signal-based index — OnPush will re-render only when this changes
  protected readonly currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  display(): void {
    this.stop();

    this.intervalId = setInterval(() => {
      this.next();
    }, 1500);
  }

  next(): void {
    this.currentIndex.update((i) => (i + 1) % this.images.length);
  }

  prev(): void {
    this.currentIndex.update(
      (i) => (i - 1 + this.images.length) % this.images.length,
    );
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
