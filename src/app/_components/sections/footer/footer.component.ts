import { Component } from "@angular/core";
import { FooterInfo } from "@app/_models/static/footer-info";

@Component({
    selector: "app-footer",
    standalone: true,
    imports: [],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
})
export class FooterComponent {
    footerInfo = new FooterInfo("Cengiz Ergün");
}
