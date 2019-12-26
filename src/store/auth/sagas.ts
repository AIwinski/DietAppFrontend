import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Auth } from '../../api';
import { loginRequest, loginSuccess, loginError, registerRequest, registerError, registerSuccess, logout } from './actions';
import { AuthActionTypes } from './types';
import { push } from 'connected-react-router'

function* handleLogin(action: ReturnType<typeof loginRequest>) {
    try {
        const res = yield call(Auth.login, action.payload);
        
        if (res.error) {
            yield put(loginError(res.error))
        } else {
            yield put(loginSuccess(res.data))
            if(action.payload.from){
                yield put(push(action.payload.from));
            } else {
                yield put(push("/"));
            }
        }
    } catch (err) {
        console.log(err)
        yield put(loginError(err))
    }
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
    try {
        const res = yield call(Auth.register, action.payload);

        if (res.error) {
            yield put(registerError(res.error))
        } else {
            yield put(registerSuccess(res.data))
        }
    } catch (err) {
        yield put(registerError(err))
    }
}

function* handleLogout(action: ReturnType<typeof logout>) {
    yield put(push("/"));
}

function* watchLoginRequest() {
    yield takeEvery(AuthActionTypes.LOGIN_REQUEST, handleLogin);
}

function* watchRegisterRequest() {
    yield takeEvery(AuthActionTypes.REGISTER_REQUEST, handleRegister);
}

function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT, handleLogout);
}

function* authSaga() {
    yield all([fork(watchLoginRequest), fork(watchRegisterRequest), fork(watchLogout)]);
}

export default authSaga;