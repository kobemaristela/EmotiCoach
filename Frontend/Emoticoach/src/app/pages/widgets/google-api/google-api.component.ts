import { Component, OnInit, NgZone } from '@angular/core';
import { GOOGLE_MAPS_KEY } from 'src/environments/tokens';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-google-api',
  templateUrl: './google-api.component.html',
  styleUrls: ['./google-api.component.scss'],
})
export class GoogleApiComponent implements OnInit {
  autocomplete: { input: string; };
  autocompleteItems: any[];
  GoogleAutocomplete: any;
  placeid: any;

  constructor( public zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

  ngOnInit() {}

  UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions:any, status:any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction:any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  SelectSearchResult(item:any) {
    alert(JSON.stringify(item))      
    this.placeid = item.place_id
  }

  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }
}
