import { Routes } from '@angular/router';
import { FileEditorComponent } from './file-editor/file-editor.component';
export const routes: Routes = [
    {path:'editor',component:FileEditorComponent},
     { path: '', redirectTo: '/editor', pathMatch: 'full' }
];
