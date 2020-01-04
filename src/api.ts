import axios from "axios";
import { API_ROOT, PROFILES_PAGE_SIZE } from "./constants/config";
import { store, history } from "./store/index";
import { AuthActionTypes } from "./store/auth/types";
import io from "socket.io-client";

let socket = io.connect(API_ROOT);

socket.on("SET_ID", (id: string) => {
    localStorage.setItem("SOCKET_ID", id);
    requests.get("/")
});

axios.interceptors.request.use(
    config => {
        let socketid: string = localStorage.getItem("SOCKET_ID") || '';
        config.headers.socketid = socketid;

        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            if (history.location.pathname !== "/login") {
                store.dispatch({ type: AuthActionTypes.LOGOUT });
                history.push({
                    pathname: "/login",
                    state: {
                        from: history.location.pathname,
                        showLoginFirstMessage: true
                    }
                });
            }
        }
        return Promise.reject(error.response);
    }
);

const requests = {
    get: (url: string, config?: any) => axios.get(`${API_ROOT}${url}`, config),
    post: (url: string, body: any, config?: any) => axios.post(`${API_ROOT}${url}`, body, config),
    put: (url: string, body: any, config?: any) => axios.put(`${API_ROOT}${url}`, body, config),
    patch: (url: string, body: any, config?: any) => axios.patch(`${API_ROOT}${url}`, body, config),
    delete: (url: string, config?: any) => axios.delete(`${API_ROOT}${url}`, config)
};

const Auth = {
    register: (data: RegisterProps) => requests.post("/auth/register", data),
    login: (props: LoginProps) => {
        if (props.loginType === LoginTypes.local) {
            return requests.post("/auth/login", props.data);
        } else if (props.loginType === LoginTypes.facebook) {
            console.log(props.data)
            return requests.post("/auth/facebookToken", props.data);
        }
    }
};

export enum LoginTypes {
    local = "LOCAL",
    facebook = "FACEBOOK"
}

export enum MessageTypes {
    text = "text",
    file = "file"
}

export interface LoginProps {
    data: {
        email: string,
        password: string
    } | {
        access_token: string
    },
    loginType: LoginTypes,
    from?: string
}

export interface RegisterProps {
    email: string,
    password: string,
    displayName: string,
    accountType: string
}


const Chat = {
    sendMessage: (data: SendMessageProps) => {
        if (data.messageType === MessageTypes.file) {
            let fd = new FormData();
            fd.append('file', data.file);
            fd.set('conversationId', data.conversationId);
            fd.set('text', data.text);
            fd.set('messageType', data.messageType);
            // fd.set('newConversation', data.newConversation || false);
            return requests.post("/upload/file", fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        } else {
            return requests.post("/chat/send", data)
        }
    },
    getConversations: () => requests.get("/chat/conversations"),
    getMessages: (data: GetMessagesProps) => requests.get("/chat/conversations/" + encodeURIComponent(data.conversationId) + "?qty=" + encodeURIComponent(data.qty) + "&offset=" + encodeURIComponent(data.offset)),
    getFile: (id: string, fileName: string) => requests.get("/upload/file/" + id, { responseType: 'blob', headers: { "Content-Disposition": `attachment; filename="${fileName}"` } }),
}

export interface SendMessageProps {
    conversationId: string,
    text: string,
    file: any,
    messageType: MessageTypes,
    newConversation?: boolean,
    newConversationUserId?: string
}

export interface GetMessagesProps {
    conversationId: string,
    qty: number,
    offset: number
}

export interface AddPriceListElementProps {
    profileId: string,
    price: string,
    elementName: string
}

export interface AddImageProps {
    profileId: string,
    file: any,
}

export interface UploadAvatarProps {
    file: any
}

export interface UpdateProfileDataProps {
    descr?: string,
    city?: string,
}

const Profile = {
    getProfiles: (alreadyFetched: number = 0, filters: any = {}) => {
        let filterQuery = encodeURIComponent(JSON.stringify(filters))
        return requests.get(
            `/profile?already_fetched=${alreadyFetched}&filters=${filterQuery}&batch_size=${PROFILES_PAGE_SIZE}`
        );
    },
    getProfile: (id: string) => requests.get(`/profile/${id}`),
    addPriceListElement: (data: AddPriceListElementProps) => requests.post('/profile/price-list-element', data),
    deletePriceListElement: (id: string) => requests.delete(`/profile/price-list-element/${id}`),
    addImage: (data: AddImageProps) => {
        let fd = new FormData();
        fd.append('file', data.file);
        fd.set('profileId', data.profileId);
        return requests.post("/upload/image", fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    deleteImage: (imageId: string) => requests.delete('/profile/image/' + imageId),
    uploadAvatar: (data: UploadAvatarProps) => {
        let fd = new FormData();
        fd.append('file', data.file);
        return requests.post("/upload/avatar", fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    resetAvatar: () => requests.get('/profile/avatar-reset'),
    updateProfileData: (data: UpdateProfileDataProps, id: string) => requests.put('/profile/' + id, data),
    updateUserData: (data: any) => requests.put("/profile/user", data),
    addReview: (data: any) => requests.post("/profile/review", data),
    search: (phrase: string) => requests.get('/profile/search/' + phrase)
};

export { socket, Auth, Chat, Profile };