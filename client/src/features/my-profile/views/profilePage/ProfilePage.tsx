import React, { useEffect } from "react";
import {
  getUserGithub,
  getUserProfile,
} from "../../../../store/profiles/profilesActions";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import Button from "react-bootstrap/esm/Button";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProfilesStateModel } from "../../../../store/profiles/profilesModels";
import { RootState } from "../../../../store/configureStore/store";
import { Routes } from "../../../../app/consts/RoutersConsts";
import UserEducation from "./UserEducation";
import UserExperience from "./UserExperience";
import UserGithub from "./UserGithub";
import UserMainInfo from "./UserMainInfo";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profile, repos } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );

  useEffect(() => {
    dispatch(getUserProfile());
    profile?.githubUserName && dispatch(getUserGithub(profile.githubUserName));
  }, [dispatch, profile?.githubUserName]);
  return (
    <AsyncWrapper>
      <Container>
        {profile ? (
          <>
            <h2 className="text-light text-center mb-4">My profile</h2>
            <UserMainInfo info={profile} />
            <UserExperience experience={profile.experience} />
            <UserEducation education={profile.education} />
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
