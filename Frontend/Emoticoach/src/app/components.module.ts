import { NgModule } from '@angular/core';
import { MuscleSvgComponent } from './pages/widgets/muscle-groups/muscle-svg/muscle-svg.component';
import { IonicModule } from '@ionic/angular';
import { MuscleGroupsComponent } from './pages/widgets/muscle-groups/muscle-groups/muscle-groups.component';


@NgModule({
 declarations:[MuscleSvgComponent,MuscleGroupsComponent],
 imports:[IonicModule],
 exports:[MuscleSvgComponent, MuscleGroupsComponent]
})
export class ComponentsModule{

}