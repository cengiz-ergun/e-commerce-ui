import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AlertComponent } from "./_components/alert/alert.component";
import { PageLayoutService } from "./_services/page-layout.service";
import { PageLayout } from "./_models/enums/page-layout";
import { LayoutUserComponent } from "./_components/layouts/layout-user/layout-user.component";
import { LayoutAdminComponent } from "./_components/layouts/layout-admin/layout-admin.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AlertComponent,
        RouterLink,
        RouterLinkActive,
        LayoutUserComponent,
        LayoutAdminComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    readonly PageLayout = PageLayout;

    constructor(public pageLayoutService: PageLayoutService) {}
}
