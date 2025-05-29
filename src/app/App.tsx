import { App as AppWrapper, ConfigProvider } from "antd";
import { antdTheme as config } from "./config/index";
import locale from "antd/lib/locale/ru_RU";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
    return (
        <AppWrapper>
            <ConfigProvider theme={config} wave={{ disabled: true }} locale={locale}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </ConfigProvider>
        </AppWrapper>
    );
};

export default App;
