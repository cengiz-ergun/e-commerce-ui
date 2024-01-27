import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
} from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { HttpService } from "@app/_services/api/http.service";
import { AlertService } from "@app/_services/app/alert.service";
import { first } from "rxjs";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
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
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            password: ["", Validators.required],
            confirmPassword: ["", [Validators.required, this.confirmPasswordValidator()]],
            email: ["", [Validators.required, Validators.email]],
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

        delete this.form.value.confirmPassword;

        this.loading = true;
        this.httpService
            .register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Registration successful", true);
                    this.router.navigate(["/login"]);
                    // { queryParams: { registered: true } }
                },
                error: (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                },
            });
    }

    confirmPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const passwordValue = control.parent?.get("password")?.value;

            return value !== passwordValue ? { passwordsDoesntMatch: true } : null;
        };
    }
}
