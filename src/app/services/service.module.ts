import { NgModule } from '@angular/core';
import { SharedService, SettingsService, SidebarService } from './service.index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SettingsService,
        SharedService,
        SidebarService
    ],
    declarations: []
})
export class ServiceModule { }