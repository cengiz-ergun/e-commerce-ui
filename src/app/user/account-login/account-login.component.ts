import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AccountService } from "@app/_services/account.service";
import { AlertService } from "@app/_services/alert.service";
import { first } from "rxjs";

@Component({
    selector: "app-account-login",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
    templateUrl: "./account-login.component.html",
    styleUrl: "./account-login.component.scss",
})
export class AccountLoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(["/"]);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    get formControls() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        // reset alert on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService
            .login(this.formControls.email.value, this.formControls.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
                    this.router.navigateByUrl(returnUrl);
                },
                error: (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                },
            });
    }
}
