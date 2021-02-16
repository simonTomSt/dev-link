import express from "express";
import {ProfileDoc} from "../../models/Profile";

export const generateProfileFields = (req: express.Request<ProfileDoc>) => {
    const {company, website, location, bio, status, githubUserName, skills, youtube, facebook, twitter, instagram, linkedin} = req.body;
    const profileFields = {} as ProfileDoc;

    profileFields.user = req.params.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUserName) profileFields.githubUserName = githubUserName;
    if (skills) {
        profileFields.skills = skills.split(',').map((skill: string) => skill.trim())
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    return profileFields;
}

