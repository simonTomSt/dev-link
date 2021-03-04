import * as Yup from "yup";

import {
  EducSchemaModel,
  ExpModel,
  ExperienceSchema,
  ProfileModel,
} from "./formSchema";
import {
  ProfileRespModel,
  ProfilesStateModel,
} from "../../../store/profiles/profilesModels";

import Moment from "react-moment";

export const profileValues = (profile?: ProfileRespModel): ProfileModel => {
  return {
    company: profile?.company ? profile.company : "",
    website: profile?.website ? profile.website : "",
    location: profile?.location ? profile.location : "",
    status: profile?.status ? profile.status : "",
    skills: profile?.skills ? profile.skills.join(", ") : "",
    bio: profile?.bio ? profile.bio : "",
    githubUserName: profile?.githubUserName ? profile.githubUserName : "",
    twitter: profile?.social?.twitter ? profile.social.twitter : "",
    facebook: profile?.social?.facebook ? profile.social.facebook : "",
  } as ProfileModel;
};

export const educationValues = (
  education?: EducSchemaModel
): EducSchemaModel => {
  return {
    _id: education?._id && education._id,
    school: education?.school ? education.school : "",
    degree: education?.degree ? education.degree : "",
    fieldOfStudy: education?.fieldOfStudy ? education.fieldOfStudy : "",
    from: education?.from ? education.from : new Date(),
    to: education?.to ? education.to : new Date(),
    current: education?.current ? education.current : true,
  };
};
export const experienceValues = (
  experience?: ExperienceSchema
): ExperienceSchema => {
  return {
    _id: experience?._id && experience._id,
    title: experience?.title ? experience.title : "",
    company: experience?.company ? experience.company : "",
    location: experience?.location ? experience.location : "",
    from: experience?.from ? experience.from : new Date(),
    to: experience?.to ? experience.to : new Date(),
    current: experience?.current ? experience.current : true,
    description: experience?.description ? experience.description : "",
  };
};
