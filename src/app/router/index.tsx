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
import { FavoritesPage } from "@/pages/favorites";
import { ComparePage } from "@/pages/compare";
import { AboutPage } from "@/pages/about";
import { ProjectsPage } from "@/pages/projects";

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
                path: APP_ROUTES.ABOUT_COMPANY,
                children: [
                    {
                        path: ":alias",
                        element: <AboutPage />,
                    },
                    {
                        path: APP_ROUTES.PROJECTS,
                        element: <ProjectsPage />,
                    },
                ],
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
                                path: APP_ROUTES.FAVORITES,
                                element: <FavoritesPage />,
                            },
                            {
                                path: APP_ROUTES.COMPARE,
                                element: <ComparePage />,
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
