import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import CSVLayer from "@arcgis/core/layers/CSVLayer.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import '@arcgis/map-components/components/arcgis-zoom';

@Component({
  selector: 'app-gis-component',
  imports: [],
  templateUrl: './gis-component.html',
  styleUrl: './gis-component.css',
})
export class GisComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapViewNode', { static: false }) private mapViewEl!: ElementRef;
  map: Map | null = null;
  mapView: MapView | null = null;
  
  demoGraphicsLayer = new GraphicsLayer();
  healthFacilitiesLayer = new CSVLayer({
    url: 'https://raw.githubusercontent.com/Pantipkub/thai-hospital/refs/heads/main/health_facilities_bangkok_th.csv',
    latitudeField: 'Lat',
    longitudeField: 'Long',
    popupTemplate: {
      title: '{Agency}',
      content: `
        <b>กระทรวง:</b> {Ministry}<br/>
        <b>กรม:</b> {Department}<br/>
        <b>ที่อยู่:</b> {Address}
      `
    },
    renderer: new SimpleRenderer({
      symbol: {
      type: "picture-marker",
      url: "https://png.pngtree.com/png-clipart/20221229/original/pngtree-hospital-location-pin-icon-in-red-color-png-image_8824531.png",
      width: "20px",
      height: "20px"
      }
    })
  });

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  async initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
    this.map = new Map({
      basemap: 'streets-vector',
    });
    this.mapView = new MapView({
      container,
      map: this.map,
      center: [100.5433989, 13.7029924], // longitude, latitude
      zoom: 12,
    });
    this.map.add(this.demoGraphicsLayer);
    this.map.add(this.healthFacilitiesLayer);
       this.mapView.when(() => { });
    return this.mapView.when();
  }

  ngOnDestroy(): void {
    if (this.mapView) {
      this.mapView.destroy();
    }
  }
}