import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { CommentSchema, commentSchema } from "../../models/formSchema";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React, { useEffect } from "react";
import {
  commentPost,
  deleteComment,
} from "../../../../store/posts/postsActions";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import Moment from "react-moment";
import { PostDoc } from "../../../../../../server/src/models/Posts";
import { ProfilesStateModel } from "../../../../store/profiles/profilesModels";
import { RootState } from "../../../../store/configureStore/store";
import { commentValues } from "../../models/formValues";
import { getUserProfile } from "../../../../store/profiles/profilesActions";

interface CommentsProps {
  post?: PostDoc;
}
export default function Comments({ post }: CommentsProps) {
  const dispatch = useDispatch();

  const { profile } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );

  function refreshPage() {
    window.location.reload(false);
  }

  const handleDelete = (id: string | undefined) => {
    id && post?._id && dispatch(deleteComment({ id, postId: post._id }));
    refreshPage();
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <AsyncWrapper>
      <Card className="p-3 mb-3">
        <Formik
          initialValues={commentValues}
          validationSchema={commentSchema}
          onSubmit={(values: CommentSchema) => {
            dispatch(commentPost({ id: post?._id, body: values }));
            refreshPage();
          }}
        >
          <Form as={FormikForm}>
            <Form.Group>
              <Form.Label>Comment this post</Form.Label>
              <Form.Control
                as={Field}
                type="text"
                name="text"
                id="text"
                placeholder="Enter your comment"
              />
              <ErrorMessage name="text" className="text-danger" component="p" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Comment
            </Button>
          </Form>
        </Formik>

        <ListGroup className="mt-4">
          <Card.Header as="h3"> Comments:</Card.Header>
          {post?.comments?.map((comment) => (
            <ListGroup.Item className="py-2">
              <Row>
                <Col sm={1} className="mr-4">
                  <img
                    src={comment.avatar}
                    alt="Commenter portrait"
                    className="img-fluid img-thumbnail"
                    style={{ borderRadius: "50%", maxWidth: "80px" }}
                  />
                </Col>
                <Col sm="10">
                  <h5> {comment?.name ? comment.name : "Unknown"}</h5>
                  <p>{comment?.text}</p>
                  <p className="post-date">
                    <span className="font-weight-bold">Date: </span>
                    <Moment date={comment?.date} format="DD/MM/YYYY" />
                  </p>
                  {profile?.user._id === comment.user && (
                    <Button
                      variant="danger"
                      size="sm"
                      //@ts-ignore
                      onClick={() => handleDelete(comment?._id)}
                    >
                      Delete
                    </Button>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </AsyncWrapper>
  );
}
