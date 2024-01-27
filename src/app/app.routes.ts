import { Routes } from "@angular/router";
import { setLayout } from "./_services/app/page-layout.resolver";
import { PageLayout } from "./_models/enums/page-layout";
import { adminGuard } from "./_models/guards/AuthGuard";

const customerRoutes = () => import("./customer/customer.routes").then((x) => x.CUSTOMER_ROUTES);

const adminRoutes = () => import("./admin/admin.routes").then((x) => x.ADMIN_ROUTES);

export const routes: Routes = [
    {
        path: "",
        resolve: {
            layout: setLayout(PageLayout.Customer),
        },
        loadChildren: customerRoutes,
    },
    {
        path: "admin",
        resolve: {
            layout: setLayout(PageLayout.Admin),
        },
        loadChildren: adminRoutes,
        canActivate: [adminGuard],
    },

    // otherwise redirect to home
    { path: "**", redirectTo: "" },
];
