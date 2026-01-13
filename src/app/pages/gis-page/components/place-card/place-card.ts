import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [],
  templateUrl: './place-card.html',
  styleUrl: './place-card.css',
})
export class PlaceCard {
  @Input() data: any;
}
