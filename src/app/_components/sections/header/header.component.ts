import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { User } from "@app/_models/user";
import { AccountService } from "@app/_services/account.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    user?: User | null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe((x) => (this.user = x));
    }

    logout() {
        this.accountService.logout();
    }
}
