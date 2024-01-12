import { Routes } from "@angular/router";

const userRoutes = () => import("./user/user.routes").then((x) => x.USER_ROUTES);

const adminRoutes = () => import("./admin/admin.routes").then((x) => x.ADMIN_ROUTES);

export const routes: Routes = [
    { path: "", loadChildren: userRoutes },
    { path: "admin", loadChildren: adminRoutes },
];
