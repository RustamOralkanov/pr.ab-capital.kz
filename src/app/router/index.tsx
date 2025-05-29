import { createBrowserRouter } from "react-router";
import { EntryPage } from "@/pages/entry";
import { ProtectedPage } from "@/pages/protected";
import { APP_ROUTES } from "@/shared/routes";
import { HomePage } from "@/pages/home";
import { ProjectAboutPage } from "@/pages/project-about";
import { MapPage } from "@/pages/map";
import { LocationsPage } from "@/pages/locations";
import { GenplansPage } from "@/pages/genplans";
import { CarouselsPage } from "@/pages/carousels";
import { PropertiesByIdPage, PropertiesPage } from "@/pages/properties";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <EntryPage />,
    },
    {
        element: <ProtectedPage />,
        children: [
            {
                path: APP_ROUTES.HOME,
                element: <HomePage />,
            },
            {
                path: APP_ROUTES.MAP,
                element: <MapPage />,
            },
            {
                path: ":publication_type",
                children: [
                    {
                        path: ":project",
                        children: [
                            {
                                path: APP_ROUTES.ABOUT,
                                element: <ProjectAboutPage />,
                            },
                            {
                                path: APP_ROUTES.LOCATIONS,
                                element: <LocationsPage />,
                            },
                            {
                                path: APP_ROUTES.GENPLANS,
                                element: <GenplansPage />,
                            },
                            {
                                path: APP_ROUTES.PROPERTIES,
                                children: [
                                    {
                                        index: true,
                                        element: <PropertiesPage />,
                                    },
                                    {
                                        path: ":id",
                                        element: <PropertiesByIdPage />,
                                    },
                                ],
                            },
                            {
                                path: ":menu_alias",
                                element: <CarouselsPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
