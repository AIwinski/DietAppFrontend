import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { DeleteButton } from "./Gallery.styled";

type Props = {
    images: string[];
    isEditable: boolean;
    onImageDelete: (data: any) => any;
};

const Gallery = (props: Props) => {
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [isImageModalOpened, setImageModalOpened] = useState(false);

    const onImageClick = (index: number) => {
        setImageModalOpened(true);
        setModalImageIndex(index);
    };

    const { images } = props;
    return (
        <div className="gallery">
            <div className="gallery__container">
                {images.map((src, index) => (
                    <div className="gallery__image--small" key={index}>
                        <img src={src} onClick={() => onImageClick(index)} />
                        {props.isEditable && <DeleteButton onClick={() => props.onImageDelete(index)}>X</DeleteButton>}
                    </div>
                ))}
            </div>
            {isImageModalOpened && (
                <Lightbox
                    mainSrc={images[modalImageIndex]}
                    nextSrc={images[(modalImageIndex + 1) % images.length]}
                    prevSrc={images[(modalImageIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setImageModalOpened(false)}
                    onMovePrevRequest={() => setModalImageIndex((modalImageIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setModalImageIndex((modalImageIndex + images.length + 1) % images.length)}
                    animationDuration={0}
                />
            )}
        </div>
    );
};

export default Gallery;
