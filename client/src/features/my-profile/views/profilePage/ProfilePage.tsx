import { Link, useLocation } from "react-router-dom";
import {
  ProfileRespModel,
  ProfilesStateModel,
} from "../../../../store/profiles/profilesModels";
import React, { useEffect, useState } from "react";
import {
  getUserGithub,
  getUserProfile,
} from "../../../../store/profiles/profilesActions";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import Button from "react-bootstrap/esm/Button";
import { Container } from "react-bootstrap";
import { RootState } from "../../../../store/configureStore/store";
import { Routes } from "../../../../app/consts/RoutersConsts";
import UserEducation from "./UserEducation";
import UserExperience from "./UserExperience";
import UserGithub from "./UserGithub";
import UserMainInfo from "./UserMainInfo";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { state: specificProfile } = useLocation<ProfileRespModel>();
  const { profile, repos } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );
  const [data, setData] = useState(profile);

  useEffect(() => {
    if (specificProfile) {
      setData(specificProfile);
      specificProfile.githubUserName &&
        dispatch(getUserGithub(specificProfile.githubUserName));
    } else {
      dispatch(getUserProfile());
      setData(profile);
      profile?.githubUserName &&
        dispatch(getUserGithub(profile.githubUserName));
    }
  }, [dispatch, profile?.githubUserName, specificProfile]);
  return (
    <AsyncWrapper>
      <Container>
        {data ? (
          <>
            <h2 className="text-light text-center mb-4">My profile</h2>
            <UserMainInfo info={data} />
            <UserExperience experience={data.experience} />
            <UserEducation education={data.education} />
            <UserGithub repos={repos} />
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
