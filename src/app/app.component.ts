import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AlertComponent } from "./_components/alert/alert.component";
import { User } from "./_models/user";
import { AccountService } from "./_services/account.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, AlertComponent, RouterLink, RouterLinkActive],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    user?: User | null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe((x) => (this.user = x));
    }

    logout() {
        this.accountService.logout();
    }
}
