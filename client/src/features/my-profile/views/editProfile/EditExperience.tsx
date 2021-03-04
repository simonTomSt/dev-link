import {
  EducSchemaModel,
  ExpModel,
  ExperienceSchema,
} from "../../models/formSchema";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import { Container } from "react-bootstrap";
import EditExpForm from "./EditExpForm";
import { ProfilesStateModel } from "../../../../store/profiles/profilesModels";
import { RootState } from "../../../../store/configureStore/store";
import { getUserProfile } from "../../../../store/profiles/profilesActions";

export default function EditExperience() {
  const { profile } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="text-center text-light mb-3">Your experience details</h2>
      <AsyncWrapper>
        {profile?.experience && profile?.experience?.length > 0 && (
          <EditExpForm />
        )}
        {profile?.experience && profile?.experience?.length > 0 ? (
          profile?.experience.map((exp: ExperienceSchema) => (
            <div key={exp._id}>
              <EditExpForm experience={exp} />
            </div>
          ))
        ) : (
          <EditExpForm />
        )}
      </AsyncWrapper>
    </Container>
  );
}
