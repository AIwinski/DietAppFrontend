import React, { useEffect } from "react";
import { connect } from "react-redux";
import FilterForm from "../../components/FilterForm/FilterForm";
import SortingForm from "../../components/SortingForm/SortingForm";
import Card from "../../components/Card/Card";
import BottomScrollListener from "react-bottom-scroll-listener";
import {
    ListData,
    ListFilters,
    ListSorting,
    ProfileListStyled,
    LoadMoreButton,
    ButtonWrapper,
    AllFetchedBadge
} from "./ProfileList.styled";

import { Profile as ProfileApi } from "../../api";
import Loader from "../../components/Loader/Loader";
import { ApplicationState } from "../../store";
import BarLoader from "../../components/BarLoader/BarLoader";
import useDocumentTitle from "../../hooks/useDocumentTitle";

type Props = ReturnType<typeof mapStateToProps>;

const ProfileList = (props: Props) => {
    const [profiles, setProfiles] = React.useState([] as any[]);
    const [isFetching, setIsFetching] = React.useState(false);
    const [allFetched, setAllFetched] = React.useState(false);

    useDocumentTitle("Mój Lekarz - Przeglądaj profile");

    useEffect(() => {
        setIsFetching(true);
        fetchProfiles().then(res => {
            console.log(res);

            const profiles = filterProfiles(res.data.profiles);
            setProfiles(profiles);
            setIsFetching(false);
        });
    }, []);

    useEffect(() => {
        if(profiles.length === 0) {
            fetchProfiles().then(res => {
                console.log(res);
    
                const profiles = filterProfiles(res.data.profiles);
                setProfiles(profiles);
                setIsFetching(false);
            });
        }
        sortProfiles();
    }, [profiles]);

    useEffect(() => {
        console.log(props.sorting);
        sortProfiles()
    }, [props.sorting]);

    useEffect(() => {
        setProfiles([]);
    }, [props.filters])

    const sortProfiles = () => {
        console.log(props.sorting)
        if(props.sorting === 'DATE_ASC') {
            setProfiles(profiles.sort((a, b) => {
                const d1 = new Date(a.createdAt);
                const d2 = new Date(b.createdAt);
                if(d1.getTime() > d2.getTime()) {
                    return 1;
                } else if (d1.getTime() < d2.getTime()) {
                    return -1;
                } else {
                    return 0;
                }
            }));
        } else if (props.sorting === 'DATE_DESC') {
            setProfiles(profiles.sort((a, b) => {
                const d1 = new Date(a.createdAt);
                const d2 = new Date(b.createdAt);
                if(d1.getTime() < d2.getTime()) {
                    return 1;
                } else if (d1.getTime() > d2.getTime()) {
                    return -1;
                } else {
                    return 0;
                }
            }));
        } else if(props.sorting === 'REVIEW_ASC') {
            setProfiles(profiles.sort((a, b) => {
                if(a.totalRating > b.totalRating) {
                    return 1;
                } else if (a.totalRating < b.totalRating) {
                    return -1;
                } else {
                    return 0;
                }
            }));
        } else if(props.sorting === 'REVIEW_DESC') {
            setProfiles(profiles.sort((a, b) => {
                if(a.totalRating > b.totalRating) {
                    return -1;
                } else if (a.totalRating < b.totalRating) {
                    return 1;
                } else {
                    return 0;
                }
            }));
        }
    }

    const fetchProfiles = (a?: number) => {
        return ProfileApi.getProfiles(a || profiles.length, props.filters);
    };

    const filterProfilesInState = () => {
        setProfiles(filterProfiles(profiles));
    };

    const filterProfiles = (profiles: any) => {
        return profiles.filter((value: any, index: any, self: any) => self.map((x: any) => x.id).indexOf(value.id) == index) 
    };

    const tryFetchMore = () => {
        if (!isFetching && !allFetched) {
            setIsFetching(true);
            fetchProfiles().then(res => {
                console.log(res);
                const fetchedProfiles = res.data.profiles;

                if (fetchedProfiles.length === 0) {
                    setAllFetched(true);
                    setIsFetching(false);
                } else {
                    const qty = fetchedProfiles.length;
                    const qty2 = filterProfiles([...profiles, ...fetchedProfiles]).length;
                    if(qty === qty2) {
                        setAllFetched(true);
                    }
                    setProfiles(filterProfiles([...profiles, ...fetchedProfiles]));
                    setIsFetching(false);
                }
            });
        }
    };

    return (
        <React.Fragment>
            <ProfileListStyled>
                <ListFilters>
                    <FilterForm />
                </ListFilters>
                <ListData>
                    {profiles.map((item: any) => (
                        <Card
                            key={item.id}
                            name={item.owner.displayName}
                            image={item.owner.avatar}
                            isPremium={false}
                            city={item.city}
                            description={item.descr}
                            numberOfRatings={item.ratings.length}
                            totalRating={item.totalRating}
                            id={item.id}
                        />
                    ))}
                    {isFetching && <BarLoader />}
                    <ButtonWrapper>
                        {!isFetching &&
                            (allFetched ? (
                                <AllFetchedBadge>Pobrano wszystkie profile</AllFetchedBadge>
                            ) : (
                                <LoadMoreButton onClick={tryFetchMore}>Załaduj więcej</LoadMoreButton>
                            ))}
                    </ButtonWrapper>
                </ListData>
                <ListSorting>
                    <SortingForm />
                </ListSorting>
            </ProfileListStyled>

            {/* <BottomScrollListener onBottom={tryFetchMore} offset={100} /> */}
        </React.Fragment>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { filters: state.filters, sorting: state.sorting.sorting };
};

export default connect(mapStateToProps, null)(ProfileList);
