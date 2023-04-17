import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public renderer: Renderer2;
  // public currentTheme: string = "red";
  public currentTheme: string = "blue";


  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.renderer.addClass(this.document.body, this.currentTheme);
  }

  activeTheme() {

    this.renderer.removeClass(this.document.body, this.currentTheme);
    if (this.currentTheme == "red"){
      this.currentTheme = "blue";
    } else {
      this.currentTheme = "red"
    }

    this.renderer.addClass(this.document.body, this.currentTheme);
    console.log(this.currentTheme)
  }
  getMuscleColor(){
    if( this.currentTheme == "blue"){
      return '#4e73df'
    } else {
      return '#833535'
    }

  }
}
