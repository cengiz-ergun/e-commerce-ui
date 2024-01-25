import { NgClass, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertService } from "@app/_services/alert.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

@Component({
    selector: "app-alert",
    standalone: true,
    imports: [NgIf, NgClass],
    template: "",
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    alert: any;

    constructor(
        private alertService: AlertService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.subscription = this.alertService.onAlert().subscribe((alert) => {
            switch (alert?.type) {
                case "success":
                    this.toastr.success(alert.message);
                    break;
                case "error":
                    this.toastr.error(alert.message);
                    break;
            }

            this.alert = alert;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
