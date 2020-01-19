import React, { useState, useEffect, useRef } from "react";
import {
    ChatStyled,
    ConversationWrapper,
    ChatWindow,
    ChatFormWrapper,
    ChatInfoWrapper,
    NewMessageBadge,
    NoMessagesBadge
} from "./Chat.styled";
import List from "../../components/Chat/List/List";
import Info from "../../components/Chat/Info/Info";
import Form from "../../components/Chat/Form/Form";
import Message from "../../components/Chat/Message/Message";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import Loader from "../../components/Loader/Loader";
import { RouteComponentProps } from "react-router";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Chat as ChatApi, GetMessagesProps } from "../../api";
import { MESSAGES_PAGE_SIZE } from "../../constants/config";
import { push } from "connected-react-router";
import { socket } from "../../api";

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const Chat = (props: Props) => {
    useDocumentTitle("Chat");
    const [activeConversationId, setActiveConversationId] = useState(props.match.params.id);
    const [conversations, setConversations] = useState([] as any[]);
    const [activeConversationMessages, setActiveConversationMessages] = useState([] as any[]);
    const [activeConversationInfo, setActiveConversationInfo] = useState();
    const [newConversationUserId, setNewConversationUserId] = useState(
        props.location && props.location.state ? props.location.state.newConversationUserId : undefined
    );
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);

    const chatWindowRef = useRef(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        socket.on("MESSAGE", (data: any) => {
            updateMessages(data);
        });
        setConversationInfo(activeConversationId);
    }, [activeConversationMessages, activeConversationId]);

    useEffect(() => {
        if (activeConversationId) {
            fetchMessages();
        }
    }, [activeConversationId]);

    useEffect(() => {
        if (newConversationUserId) {
            let index = getConversationIndexByUserId(conversations, newConversationUserId);
            console.log(index);
            if (index !== -1) {
                changeActiveConversation(conversations[index].id);
            }
        } else {
            if (activeConversationId) {
                let index = conversations.findIndex((c: any) => c.id === activeConversationId);
                console.log(index);
                if (index !== -1) {
                    changeActiveConversation(conversations[index].id);
                } else {
                    if (conversations.length) {
                        changeActiveConversation(conversations[0].id);
                    } else {
                        changeActiveConversation("");
                    }
                }
            } else {
                if (conversations.length) {
                    changeActiveConversation(conversations[0].id);
                } else {
                    changeActiveConversation("");
                }
            }
        }
    }, [conversations, isLoadingConversations]);

    const updateMessages = (data: any) => {
        if (data.createdNewConversation) {
            console.log(conversations);
            setConversations([...conversations, data.newConversation]);
        }
        if (activeConversationId == String(data.message.conversationId)) {
            setActiveConversationMessages([...activeConversationMessages, data.message]);
            scrollToBottomOfChatWindow();
        }
    };

    const getConversationIndexByUserId = (conversations: any[], userId: string) => {
        let result = -1;

        conversations.forEach((c: any, index: number) => {
            if (c.users.length > 1) {
                c.users.forEach((u: any) => {
                    if (String(u.id) === String(userId) && String(u.id) !== String(props.currentUser.id)) {
                        result = index;
                    }
                });
            } else if (
                c.users.length === 1 &&
                String(c.users[0].id) === String(props.currentUser.id) &&
                String(c.users[0].id) === String(userId)
            ) {
                result = index;
            }
        });
        console.log(conversations);
        console.log(result);
        return result;
    };

    const fetchConversations = () => {
        ChatApi.getConversations()
            .then((res: any) => {
                setConversations(res.data.conversations);
                setIsLoadingConversations(false);
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    const onMessageSent = (data: any) => {
        if (data.createdNewConversation) {
            const newConversation = data.newConversation;
            setConversations([...conversations, newConversation]);
            changeActiveConversation(newConversation.id);
        }
    };

    const changeActiveConversation = (id: string) => {
        setActiveConversationId(id);
        setConversationInfo(id);
        setNewConversationUserId(undefined);
        if (id) {
            props.push("/chat/" + id);
        } else {
            props.push("/chat");
        }
    };

    const fetchMessages = () => {
        let loadedMessages = activeConversationMessages.filter(m => String(m.conversationId) === activeConversationId) || [];
        const getMessagesProps: GetMessagesProps = {
            conversationId: activeConversationId,
            qty: MESSAGES_PAGE_SIZE,
            offset: loadedMessages.length
        };
        ChatApi.getMessages(getMessagesProps)
            .then((res: any) => {
                setActiveConversationMessages([...loadedMessages, ...res.data.messages]);
                scrollToBottomOfChatWindow();
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    const onConversationClick = (id: string) => {
        changeActiveConversation(String(id));
    };

    const parseConversationResponse = (conversations: any) => {
        return conversations.map((c: any) => {
            let conversationName = "";
            c.users.forEach((u: any) => {
                if (u.displayName !== props.currentUser.displayName) {
                    conversationName += u.displayName + ", ";
                }
            });
            if (conversationName.length === 0) {
                conversationName = props.currentUser.displayName + ", ";
            }
            return { value: conversationName.slice(0, -2), id: c.id };
        });
    };

    const setConversationInfo = (id: string) => {
        console.log(conversations);
        let data = undefined;
        let c = conversations.find((c: any) => String(c.id) === String(id));
        if (c) {
            if (c.users.length === 1) {
                data = {
                    displayName: c.users[0].displayName,
                    accountType: c.users[0].accountType,
                    email: c.users[0].email,
                    avatar: c.users[0].avatar,
                    userId: c.users[0].id
                };
            } else if (c.users.length > 1) {
                let u = c.users.find((u: any) => String(u.id) !== String(props.currentUser.id));
                if (u) {
                    data = {
                        displayName: u.displayName,
                        accountType: u.accountType,
                        email: u.email,
                        avatar: u.avatar,
                        userId: u.id
                    };
                } else {
                    data = undefined;
                }
            }
        }

        setActiveConversationInfo(data);
    };

    const scrollToBottomOfChatWindow = () => {
        if (chatWindowRef && chatWindowRef.current) {
            // @ts-ignore
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    return (
        <ChatStyled>
            <List
                elements={!isLoadingConversations && conversations ? parseConversationResponse(conversations) : undefined}
                onElementClick={onConversationClick}
                active={
                    !isLoadingConversations && conversations
                        ? conversations.findIndex(c => String(c.id) === String(activeConversationId))
                        : -1
                }
            />
            <ConversationWrapper>
                <ChatWindow ref={chatWindowRef}>
                    {newConversationUserId ? (
                        <NewMessageBadge>new conversation: {newConversationUserId}</NewMessageBadge>
                    ) : activeConversationMessages !== undefined ? (
                        activeConversationMessages.length !== 0 ? (
                            activeConversationMessages.map((m: any) => (
                                <Message
                                    text={m.text}
                                    key={m.id}
                                    id={m.id}
                                    date={m.createdAt}
                                    type={m.messageType}
                                    srcPath={m.srcPath}
                                    initialFileName={m.initialFileName}
                                    isReceived={String(props.currentUser.id) === String(m.senderId)}
                                ></Message>
                            ))
                        ) : (
                            <NoMessagesBadge>brak wiadomosci</NoMessagesBadge>
                        )
                    ) : (
                        <Loader />
                    )}
                </ChatWindow>
                <ChatFormWrapper>
                    <Form
                        newConversationUserId={newConversationUserId}
                        coversationId={activeConversationId}
                        newConversation={!!newConversationUserId}
                        onMessageSent={onMessageSent}
                    />
                </ChatFormWrapper>
            </ConversationWrapper>
            <ChatInfoWrapper>{conversations ? <Info info={activeConversationInfo} /> : <Loader />}</ChatInfoWrapper>
        </ChatStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { currentUser: state.auth.currentUser };
};

const mapDispatchToProps = {
    push
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
