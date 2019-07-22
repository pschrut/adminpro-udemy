import { NgModule } from '@angular/core';
import { SharedService, SettingsService, SidebarService } from './service.index';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        SettingsService,
        SharedService,
        SidebarService
    ],
    declarations: []
})
export class ServiceModule { }