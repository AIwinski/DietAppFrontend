import React from "react";
import { AvatarWrapper, AvatarImage } from "./Avatar.styled";
import { FALLBACK_AVATAR_URL, STATIC_FILES_ROOT } from "../../constants/config";

type Props = {
    url?: string;
    isFull?: boolean;
};

const Avatar = (props: Props) => {
    let url: any = props.url || "";
    if (!url) {
        url = FALLBACK_AVATAR_URL;
    } else if (url.includes("http")) {
        url = props.url;
    } else {
        url = STATIC_FILES_ROOT + props.url;
    }

    return (
        <AvatarWrapper isFull={props.isFull}>
            <AvatarImage src={url}></AvatarImage>
        </AvatarWrapper>
    );
};

export default Avatar;
