import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { authReducer } from "./auth/reducer";
import authSaga from "./auth/sagas";
import { AuthState } from "./auth/types";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ChatState } from "./chat/types";
import { FiltersState } from "./filters/types";
import { SortingState } from "./sorting/types";
import { chatReducer } from "./chat/reducer";
import { filtersReducer } from "./filters/reducer";
import { sortingReducer } from "./sorting/reducer";

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
})

export interface ApplicationState {
    auth: AuthState,
    chat: ChatState,
    filters: FiltersState,
    sorting: SortingState
}

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    chat: chatReducer,
    filters: filtersReducer,
    sorting: sortingReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth', 'filters', 'sorting']
};

const loggerMiddleware = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(routerMiddleware(history), loggerMiddleware, sagaMiddleware)
    )
);

export const persistor = persistStore(store);

function* rootSaga() {
    yield all([fork(authSaga)])
}

sagaMiddleware.run(rootSaga);
