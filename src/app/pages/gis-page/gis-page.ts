import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceCard } from './components/place-card/place-card';
import { GisComponent } from './components/gis-component/gis-component';

@Component({
  selector: 'app-gis-page',
  standalone: true,
  imports: [CommonModule, PlaceCard, GisComponent],
  templateUrl: './gis-page.html',
  styleUrl: './gis-page.css',
})
export class GisPage implements OnInit {
  places = signal<any[]>([]);

  parseCsv(csv: string): any[] {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',');
        const obj: any = {};

        headers.forEach((h, i) => {
          obj[h] = values[i]?.trim();
        });

        return obj;
      });
  }


  ngOnInit() {
    fetch('https://raw.githubusercontent.com/Pantipkub/thai-hospital/refs/heads/main/health_facilities_bangkok_th.csv')
    .then(res => res.text())
    .then(csv => {
      this.places.set(this.parseCsv(csv));
      console.log(this.places)
    });
  }
}
