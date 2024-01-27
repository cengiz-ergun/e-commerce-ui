import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { FilterByColourService } from "@app/_services/app/filter.service";
import { CheckboxModule } from "primeng/checkbox";

@Component({
    selector: "app-filter-by-colour",
    standalone: true,
    imports: [NgFor, FormsModule, CheckboxModule],
    templateUrl: "./filter-by-colour.component.html",
    styleUrl: "./filter-by-colour.component.scss",
})
export class FilterByColourComponent {
    coloursAsArrayOfStrings: string[] = [];
    selectedColours: string[] = [];

    constructor(private filterService: FilterByColourService) {
        this.coloursAsArrayOfStrings = Object.keys(SuitColour).filter((key) => isNaN(Number(key)));
    }

    onColourSelectionChange() {
        this.filterService.updateValues(
            this.selectedColours.map((strColour) => SuitColour[strColour as keyof typeof SuitColour])
        );
    }
}
