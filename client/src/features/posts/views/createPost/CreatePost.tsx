import { Button, Card, Form, Modal } from "react-bootstrap";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { PostSchema, postSchema } from "../../models/formSchema";
import React, { useState } from "react";

import { createPost } from "../../../../store/posts/postsActions";
import { postValues } from "../../models/formValues";
import { useDispatch } from "react-redux";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className="p-3">
        <h3>Add your new post</h3>
        <Form.Control type="text" placeholder="Write something..." />
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tour nw post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={postValues}
            validationSchema={postSchema}
            onSubmit={(values: PostSchema) => {
              dispatch(createPost(values));
              handleClose();
            }}
          >
            <Form as={FormikForm}>
              <Form.Group>
                <Form.Label>Post title</Form.Label>
                <Form.Control
                  as={Field}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter post title"
                />
                <ErrorMessage
                  name="name"
                  className="text-danger"
                  component="p"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Post body</Form.Label>
                <Form.Control
                  as={Field}
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Write something"
                />
                <ErrorMessage
                  name="text"
                  className="text-danger"
                  component="p"
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
