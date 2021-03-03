import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Button from "react-bootstrap/esm/Button";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ProfilesStateModel} from "../../../../store/profiles/profilesModels";
import {RootState} from "../../../../store/configureStore/store";
import {Routes} from "../../../../app/consts/RoutersConsts";
import {getUserProfile} from "../../../../store/profiles/profilesActions";
import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import {getMe} from "../../../../store/auth/authActions";
import {log} from "util";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const {profile} = useSelector<RootState, ProfilesStateModel>(
        (state) => state.profiles
    );

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);
    return (
        <AsyncWrapper>
            <Container>
                {profile ? (
                    <>
                        <p className={"mt-5"}>{profile?.user?.name}</p>

                    </>
                ) : (
                    <div className="centralized text-center">
                        <p className="text-light">
                            You have not yet setup your profile, please add some info
                        </p>
                        <Button
                            as={Link}
                            to={Routes.EditMyProfile}
                            variant="outline-warning "
                            size="lg"
                            className=" font-weight-bold"
                        >
                            Fill in your profile details
                        </Button>
                    </div>
                )}
            </Container>
        </AsyncWrapper>
    );
}
