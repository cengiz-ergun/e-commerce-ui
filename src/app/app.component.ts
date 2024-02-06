import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { PageLayoutService } from "./_services/app/page-layout.service";
import { PageLayout } from "./_models/enums/page-layout";
import { LayoutCustomerComponent } from "./_components/layouts/layout-customer/layout-customer.component";
import { LayoutAdminComponent } from "./_components/layouts/layout-admin/layout-admin.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LayoutCustomerComponent, LayoutAdminComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    readonly PageLayout = PageLayout;

    constructor(public pageLayoutService: PageLayoutService) {}
}
