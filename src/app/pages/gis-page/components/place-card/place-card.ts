import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [],
  templateUrl: './place-card.html',
  styleUrl: './place-card.css',
})
export class PlaceCard {
  @Input() data: any;
  @Output() cardClick = new EventEmitter<any>();

  onClick() {
    this.cardClick.emit(this.data);
  }
}
