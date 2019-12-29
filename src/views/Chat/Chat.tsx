import React, { useState, useEffect } from "react";
import { ChatStyled, ConversationWrapper, ChatWindow, ChatFormWrapper, ChatInfoWrapper } from "./Chat.styled";
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
    const [conversations, setConversations] = useState();
    const [activeConversationMessages, setActiveConversationMessages] = useState([] as any[]);
    const [activeConversationInfo, setActiveConversationInfo] = useState();
    const [newConversationUserId, setNewConversationUserId] = useState(
        props.location && props.location.state ? props.location.state.newConversationUserId : undefined
    );

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        socket.on("MESSAGE", (data: any) => {
            updateMessages(data);
        });
    }, [activeConversationMessages, activeConversationId]);

    useEffect(() => {
        if (activeConversationId) {
            fetchMessages();
        }
    }, [activeConversationId]);

    useEffect(() => {
        if (conversations === undefined) {
            return;
        }
        if (newConversationUserId) {
            let index = getConversationIndexByUserId(conversations, newConversationUserId);
            if (index !== -1) {
                changeActiveConversation(conversations[index].id);
            }
        } else {
            if (activeConversationId) {
                let index = conversations.findIndex((c: any) => c.id === activeConversationId);
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
    }, [conversations]);

    const updateMessages = (data: any) => {
        if (data.createdNewConversation) {
            setConversations([...conversations, data.newConversation]);
        }
        if (activeConversationId == String(data.message.conversationId)) {
            setActiveConversationMessages([...activeConversationMessages, data.message]);
        }
    };

    const getConversationIndexByUserId = (conversations: any[], userId: string) => {
        let result = -1;
        conversations.forEach((c: any, index: number) => {
            if (c.users.length > 1) {
                c.users.forEach((u: any) => {
                    if (u.id === userId && u.id !== props.currentUser.id) {
                        result = index;
                    }
                });
            } else if (c.users.length === 1 && c.users[0].id == props.currentUser.id) {
                result = index;
            }
        });
        return result;
    };

    const fetchConversations = () => {
        ChatApi.getConversations()
            .then((res: any) => {
                setConversations(res.data.conversations);
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
        console.log(activeConversationId);
        const getMessagesProps: GetMessagesProps = {
            conversationId: activeConversationId,
            qty: MESSAGES_PAGE_SIZE,
            offset: loadedMessages.length
        };
        ChatApi.getMessages(getMessagesProps)
            .then((res: any) => {
                console.log(res.data.messages);
                setActiveConversationMessages([...loadedMessages, ...res.data.messages]);
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
        setActiveConversationInfo({
            name: id
        });
    };

    return (
        <ChatStyled>
            <List
                elements={conversations ? parseConversationResponse(conversations) : undefined}
                onElementClick={onConversationClick}
            />
            <ConversationWrapper>
                <ChatWindow>
                    {newConversationUserId ? (
                        <div>new conversation: {newConversationUserId}</div>
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
                            <div>brak wiadomosci</div>
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
