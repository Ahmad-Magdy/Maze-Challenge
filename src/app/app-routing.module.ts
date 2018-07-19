import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StartPlayingComponent } from './start-playing/start-playing.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'get-started', component: StartPlayingComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
