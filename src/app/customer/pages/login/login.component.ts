import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { HttpService } from "@app/_services/api/http.service";
import { AlertService } from "@app/_services/app/alert.service";
import { first } from "rxjs";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private httpService: HttpService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.httpService.userValue) {
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
        this.httpService
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
