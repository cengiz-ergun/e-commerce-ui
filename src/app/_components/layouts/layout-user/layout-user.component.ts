import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AlertComponent } from "@app/_components/alert/alert.component";
import { User } from "@app/_models/user";
import { AccountService } from "@app/_services/account.service";

@Component({
    selector: "app-layout-user",
    standalone: true,
    imports: [CommonModule, RouterOutlet, AlertComponent, RouterLink, RouterLinkActive],
    templateUrl: "./layout-user.component.html",
    styleUrl: "./layout-user.component.scss",
})
export class LayoutUserComponent {
    user?: User | null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe((x) => (this.user = x));
    }

    logout() {
        this.accountService.logout();
    }
}
