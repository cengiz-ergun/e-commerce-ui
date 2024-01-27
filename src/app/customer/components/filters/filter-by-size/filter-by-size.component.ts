import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Size } from "@app/_models/enums/size";
import { FilterBySizeService } from "@app/_services/app/filter.service";
import { CheckboxModule } from "primeng/checkbox";

@Component({
    selector: "app-filter-by-size",
    standalone: true,
    imports: [NgFor, FormsModule, CheckboxModule],
    templateUrl: "./filter-by-size.component.html",
    styleUrl: "./filter-by-size.component.scss",
})
export class FilterBySizeComponent {
    sizesAsArrayOfStrings: string[] = [];
    selectedSizes: string[] = [];

    constructor(private filterBySizeService: FilterBySizeService) {
        this.sizesAsArrayOfStrings = Object.keys(Size).filter((key) => isNaN(Number(key)));
    }

    onSizeSelectionChange() {
        this.filterBySizeService.updateValues(this.selectedSizes.map((strSize) => Size[strSize as keyof typeof Size]));
    }
}
