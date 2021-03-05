import { Button, Card, Container, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  deleteProfile,
  getUserProfile,
} from "../../../../store/profiles/profilesActions";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import ProfileForm from "./ProfileForm";
import { ProfilesStateModel } from "../../../../store/profiles/profilesModels";
import { RootState } from "../../../../store/configureStore/store";

export default function EditProfile() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    dispatch(deleteProfile());
    setShow(false);
  };

  const { profile } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );

  useEffect(() => {
    !profile && dispatch(getUserProfile());
  }, [profile, dispatch]);

  return (
    <AsyncWrapper>
      <Container>
        <Card
          className="p-3 mt-5 mx-auto shadow-lg p-3 mb-5 bg-white rounded"
          style={{ maxWidth: "700px" }}
        >
          <ProfileForm profile={profile} />
        </Card>
        <Button
          onClick={handleShow}
          variant="danger"
          className="mb-4"
          style={{ marginLeft: "auto" }}
        >
          Delete my profile
        </Button>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete your profile?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </AsyncWrapper>
  );
}
