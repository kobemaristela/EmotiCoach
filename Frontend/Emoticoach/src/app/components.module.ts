import { NgModule } from '@angular/core';
import { MuscleSvgComponent } from './pages/widgets/muscle-groups/muscle-svg/muscle-svg.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
 declarations:[MuscleSvgComponent],
 imports:[IonicModule,],
 exports:[MuscleSvgComponent]
})
export class ComponentsModule{

}