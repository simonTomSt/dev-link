import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import { Container } from "react-bootstrap";
import EducFrom from "./EducFrom";
import { EducSchemaModel } from "../../models/formSchema";
import { ProfilesStateModel } from "../../../../store/profiles/profilesModels";
import { RootState } from "../../../../store/configureStore/store";
import { getUserProfile } from "../../../../store/profiles/profilesActions";

export default function EditEducation() {
  const { profile } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );
  const dispatch = useDispatch();

  useEffect(() => {
    !profile && dispatch(getUserProfile());
  }, [profile, dispatch]);

  return (
    <Container>
      <h2 className="text-center text-light mb-3">Your education details</h2>
      <AsyncWrapper>
        {profile?.education && profile?.education?.length > 0 ? (
          profile?.education.map((education: EducSchemaModel) => (
            <div key={education._id}>
              <EducFrom />
              <EducFrom education={education} />
            </div>
          ))
        ) : (
          <EducFrom />
        )}
      </AsyncWrapper>
    </Container>
  );
}
