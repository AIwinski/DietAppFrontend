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
import { Chat as ChatApi, GetMessagesProps, SendMessageProps } from "../../api";
import { MESSAGES_PAGE_SIZE } from "../../constants/config";
import { push } from "connected-react-router";

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
        props.location && props.location.state ? props.location.state.newConversationUserId : ""
    );

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (activeConversationId && !newConversationUserId) {
            fetchMessages();
        }
    }, [activeConversationId]);

    const fetchConversations = () => {
        ChatApi.getConversations()
            .then((res: any) => {
                console.log(res);
                let conversations = res.data.conversations;
                setConversations(conversations);

                let conversationWithSuchUserIndex = -1;
                conversations.forEach((c: any, index: number) => {
                    if (c.users.length === 2) {
                        c.users.forEach((u: any) => {
                            if (u.id === newConversationUserId) {
                                console.log("CONVERSATION ALREADY EXISTS" + index);
                                conversationWithSuchUserIndex = index;
                            }
                        });
                    }
                });
                if (newConversationUserId) {
                    if (conversationWithSuchUserIndex !== -1) {
                        changeActiveConversation(conversations[conversationWithSuchUserIndex].id);
                        setNewConversationUserId("");
                    } else {
                        //todo add mock conversation that would create new conversation
                        //changeActiveConversation(newConversationUserId);
                    }
                } else {
                    if (conversations.length > 0) {
                        changeActiveConversation(conversations[0].id);
                    }
                }
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    const onMessageSent = (data: any) => {
        const createdNewConversation = data.createdNewConversation;
        if (createdNewConversation) {
            const newConversation = data.newConversation;
            setConversations([...conversations, newConversation]);
            changeActiveConversation(createdNewConversation.id);
        }
    };

    const changeActiveConversation = (id: string) => {
        setActiveConversationId(id);
        setConversationInfo(id);
        props.push("/chat/" + id);
    };

    const fetchMessages = () => {
        const getMessagesProps: GetMessagesProps = {
            conversationId: activeConversationId,
            qty: MESSAGES_PAGE_SIZE,
            offset: activeConversationMessages.length
        };
        ChatApi.getMessages(getMessagesProps)
            .then((res: any) => {
                console.log(res);

                setActiveConversationMessages([...activeConversationMessages, ...res.data.messages]);
                console.log([...activeConversationMessages, ...res.data.messages]);
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    const onConversationClick = (id: string) => {
        console.log(id);
        changeActiveConversation(id);
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
                    {activeConversationMessages != null ? (
                        activeConversationMessages.map(m => (
                            <Message
                                text={m.text}
                                key={m.id}
                                id={m.id}
                                date={m.createdAt}
                                type={m.messageType}
                                srcPath={m.srcPath}
                                initialFileName={m.initialFileName}
                                isReceived={props.currentUser.id !== m.senderId}
                            ></Message>
                        ))
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
