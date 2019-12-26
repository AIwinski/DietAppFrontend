import React, { useEffect } from "react";
import { connect } from "react-redux";
import FilterForm from "../../components/FilterForm/FilterForm";
import SortingForm from "../../components/SortingForm/SortingForm";
import Card from "../../components/Card/Card";
import BottomScrollListener from "react-bottom-scroll-listener";
import { ListData, ListFilters, ListSorting, ProfileListStyled } from "./ProfileList.styled";

import { Profile as ProfileApi } from "../../api";
import Loader from "../../components/Loader/Loader";
import { ApplicationState } from "../../store";

type Props = ReturnType<typeof mapStateToProps>;

const ProfileList = (props: Props) => {
    const [profiles, setProfiles] = React.useState([]);
    const [isFetching, setIsFetching] = React.useState(false);
    const [allFetched, setAllFetched] = React.useState(false);

    useEffect(() => {
        setIsFetching(true);
        fetchProfiles().then(res => {
            console.log(res);

            const profiles = filterProfiles(res.data.profiles);
            setProfiles(profiles);
            setIsFetching(false);
        });
    }, []);

    // useEffect(() => {
    //     const filters = props.filters;
    //     const prevFilters = usePrevious({ filters });
    //     if (prevFilters !== filters) {
    //         console.log("update");
    //         setAllFetched(true);
    //         filterProfilesInState();
    //     }
    // }, [props.filters]);

    const fetchProfiles = () => {
        return ProfileApi.getProfiles(profiles.length, props.filters);
    };

    const filterProfilesInState = () => {
        setProfiles(filterProfiles(profiles));
    };

    const filterProfiles = (profiles: any) => {
        //to do add more filters
        let filteredProfiles = profiles
            .map((profile: any) => profile.id)
            .filter((value: any, index: any, self: any) => self.indexOf(value) === index); //only unique in case there are two equal profiles

        filteredProfiles = filteredProfiles.filter((profile: any) => {
            return profile.city === props.filters.city; //city
        });

        return profiles;
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
                    const mergedProfiles = filterProfiles(fetchedProfiles.concat(profiles));
                    setProfiles(mergedProfiles);
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
                    {isFetching && <Loader />}
                    {allFetched && <h3>Sciagnieto wszystkie posty</h3>}
                </ListData>
                <ListSorting>
                    <SortingForm />
                </ListSorting>
            </ProfileListStyled>
            <BottomScrollListener onBottom={tryFetchMore} offset={100} />
        </React.Fragment>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { filters: state.filters };
};

export default connect(mapStateToProps, null)(ProfileList);
