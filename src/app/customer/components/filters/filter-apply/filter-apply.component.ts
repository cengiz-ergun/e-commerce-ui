import { Component } from "@angular/core";
import { FilterApplyService } from "@app/_services/app/filter.service";

@Component({
    selector: "app-filter-apply",
    standalone: true,
    imports: [],
    templateUrl: "./filter-apply.component.html",
    styleUrl: "./filter-apply.component.scss",
})
export class FilterApplyComponent {
    constructor(private filterApplyService: FilterApplyService) {}

    onClick() {
        this.filterApplyService.updateClickedState(true);
    }
}
