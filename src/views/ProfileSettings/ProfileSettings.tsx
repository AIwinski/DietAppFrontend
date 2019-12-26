import React, { useState, useEffect } from "react";
import {
    ProfileSettingsStyled,
    SettingListElement,
    SettingWrapper,
    SettingList,
    ProfileSettingsStyledInner,
    SettingListTitle
} from "./ProfileSettings.styled";
import PriceListSettings from "../../components/PriceList/PriceListSettings/PriceListSettings";
import { Profile as ProfileApi } from "../../api";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { ContainerFluid } from "../../components/SharedStyledComponents/ContainerFluid.styled";
import GallerySettings from "../../components/Gallery/GallerySettings/GallerySettings";
import BarLoader from "../../components/BarLoader/BarLoader";
import PersonalSettings from "../../components/PersonalSettings/PersonalSettings";
import GeneralSettings from "../../components/GeneralSettings/GeneralSettings";
import { setCurrentUser } from "../../store/auth/actions";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const ProfileSettings = (props: Props) => {
    const id = props.currentUser.profileId;
    const [profile, setProfile] = useState();
    const [currentView, setCurrentView] = useState("GENERAL");

    useEffect(() => {
        ProfileApi.getProfile(id)
            .then(res => {
                console.log(res.data.profile);
                setProfile(res.data.profile);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onPriceListUpdate = (data: any) => {
        setProfile({ ...profile, priceListElements: data });
        //profile.priceListElements = data;
    };

    const onImageAdd = (data: any) => {
        setProfile({ ...profile, images: [...profile.images, data.image] });
        // profile.images.push(data.image);
    };

    const onImageDelete = (data: any) => {
        console.log(data);
        console.log(profile);
        const imageId = profile.images[data].id;
        profile.images.splice(data, 1);
        ProfileApi.deleteImage(imageId)
            .then(res => {
                setProfile({ ...profile, images: [...profile.images] });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onAvatarAdd = (data: any) => {
        console.log(data);
        props.setCurrentUser({ avatar: data.user.avatar });
    };

    const onAvatarReset = (data: any) => {
        console.log(data);
        ProfileApi.resetAvatar()
            .then(res => {
                props.setCurrentUser({ avatar: "" });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onUserDataUpdate = (data: any) => {
        console.log(data.data);
        props.setCurrentUser({ displayName: data.data.user.displayName });
    };

    const onProfileUpdate = (data: any) => {
        console.log(data)
        setProfile({...profile, ...data.profile})
    };

    return (
        <ProfileSettingsStyled>
            <ContainerFluid>
                <ProfileSettingsStyledInner>
                    {profile ? (
                        <React.Fragment>
                            <SettingList>
                                <SettingListTitle>Profile settings</SettingListTitle>
                                <SettingListElement
                                    onClick={() => setCurrentView("GENERAL")}
                                    isActive={currentView === "GENERAL"}
                                >
                                    General settings
                                </SettingListElement>
                                <SettingListElement
                                    onClick={() => setCurrentView("PERSONAL")}
                                    isActive={currentView === "PERSONAL"}
                                >
                                    Personal settings
                                </SettingListElement>
                                <SettingListElement
                                    onClick={() => setCurrentView("PRICE_LIST")}
                                    isActive={currentView === "PRICE_LIST"}
                                >
                                    Price list settings
                                </SettingListElement>
                                <SettingListElement
                                    onClick={() => setCurrentView("GALLERY")}
                                    isActive={currentView === "GALLERY"}
                                >
                                    Gallery settings
                                </SettingListElement>
                            </SettingList>
                            <SettingWrapper>
                                {(function() {
                                    switch (currentView) {
                                        case "PRICE_LIST":
                                            return (
                                                <PriceListSettings
                                                    profileId={id}
                                                    priceList={profile.priceListElements}
                                                    onPriceListUpdate={onPriceListUpdate}
                                                ></PriceListSettings>
                                            );
                                        case "GALLERY":
                                            return (
                                                <GallerySettings
                                                    images={profile.images}
                                                    profileId={profile.id}
                                                    onImageAdd={onImageAdd}
                                                    onImageDelete={onImageDelete}
                                                ></GallerySettings>
                                            );
                                        case "PERSONAL":
                                            return (
                                                <PersonalSettings
                                                    profile={profile}
                                                    profileId={profile.id}
                                                    onAvatarAdd={onAvatarAdd}
                                                    onAvatarReset={onAvatarReset}
                                                    onProfileUpdate={onUserDataUpdate}
                                                    currentAvatar={props.currentUser.avatar}
                                                    currentDisplayName={props.currentUser.displayName}
                                                ></PersonalSettings>
                                            );
                                        case "GENERAL":
                                            return (
                                                <GeneralSettings
                                                    onProfileUpdate={onProfileUpdate}
                                                    profile={profile}
                                                    profileId={profile.id}
                                                ></GeneralSettings>
                                            );
                                    }
                                })()}
                            </SettingWrapper>
                        </React.Fragment>
                    ) : (
                        <BarLoader></BarLoader>
                    )}
                </ProfileSettingsStyledInner>
            </ContainerFluid>
        </ProfileSettingsStyled>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        currentUser: state.auth.currentUser
    };
};

const mapDispatchToProps = {
    setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
