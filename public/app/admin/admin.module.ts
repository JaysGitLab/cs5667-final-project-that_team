/* Core Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';

/* Primary app component imports */
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routes';
import { AdminService } from './admin.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        RouterModule.forChild(AdminRoutes)
    ],
    declarations: [
        AdminComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }
