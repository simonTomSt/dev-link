import {
  ProfileRespModel,
  ProfilesStateModel,
} from "../../../../store/profiles/profilesModels";
import React, { useEffect } from "react";
import {
  getAllProfiles,
  getUserProfile,
} from "../../../../store/profiles/profilesActions";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import { Container } from "react-bootstrap";
import { RootState } from "../../../../store/configureStore/store";
import { Routes } from "../../../../app/consts/RoutersConsts";
import UserMainInfo from "../../../my-profile/views/profilePage/UserMainInfo";
import { useHistory } from "react-router";

export default function DevelopersPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profiles, profile } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );

  const redirectToProfile = (profile: ProfileRespModel) => {
    history.push({
      pathname: Routes.MyProfile,
      state: profile,
    });
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <Container>
      <AsyncWrapper>
        {profiles?.map((data: ProfileRespModel) => (
          <div key={data._id}>
            {data._id !== profile?._id && (
              <div className="mb-3" onClick={() => redirectToProfile(data)}>
                <UserMainInfo info={data} />
              </div>
            )}
          </div>
        ))}
      </AsyncWrapper>
    </Container>
  );
}
