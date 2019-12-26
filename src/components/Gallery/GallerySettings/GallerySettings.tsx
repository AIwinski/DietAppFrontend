import React from "react";
import { GallerySettingsStyled } from "./GallerySettings.styled";
import Gallery from "../Gallery/Gallery";
import { STATIC_FILES_ROOT } from "../../../constants/config";
import AddImageForm from "../AddImageForm/AddImageForm";

type Props = {
    images: any[];
    profileId: string;
    onImageAdd: (data: any) => any;
    onImageDelete: (data: any) => any;
};

const GallerySettings = (props: Props) => {
    return (
        <GallerySettingsStyled>
            <Gallery isEditable={true} onImageDelete={props.onImageDelete} images={props.images.map(i => STATIC_FILES_ROOT + i.srcPath)}></Gallery>
            <AddImageForm type="image" profileId={props.profileId} onImageAdd={props.onImageAdd}></AddImageForm>
        </GallerySettingsStyled>
    );
};

export default GallerySettings;
