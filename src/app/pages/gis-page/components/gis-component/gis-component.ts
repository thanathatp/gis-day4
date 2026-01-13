import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
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
  demoVectorTileLayer = new VectorTileLayer({
    url: "https://tiles.arcgis.com/tiles/jSaRWj2TDlcN1zOC/arcgis/rest/services/Thailand_Transportation/VectorTileServer"
  });

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
        type: 'simple-marker',
        size: 10,
        color: [59, 130, 246], // Blue color (#3B82F6)
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      } as any
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
      zoom: 20,
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