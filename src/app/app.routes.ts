import { Routes } from "@angular/router";
import { setLayout } from "./_services/page-layout.resolver";
import { PageLayout } from "./_models/page-layout";

const userRoutes = () => import("./user/user.routes").then((x) => x.USER_ROUTES);

const adminRoutes = () => import("./admin/admin.routes").then((x) => x.ADMIN_ROUTES);

export const routes: Routes = [
    {
        path: "",
        resolve: {
            layout: setLayout(PageLayout.User),
        },
        loadChildren: userRoutes,
    },
    {
        path: "admin",
        resolve: {
            layout: setLayout(PageLayout.Admin),
        },
        loadChildren: adminRoutes,
    },
];
