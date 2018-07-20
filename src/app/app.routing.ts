/*
 * Routing Configuration for the App Module
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration/registration.component';


export const APPROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'patient',loadChildren: './components/patient/patient.module#PatientModule'},
    {path: 'registration', component: RegistrationComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APPROUTES);
