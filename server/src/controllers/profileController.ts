import { Profile, ProfileDoc } from "../models/Profile";

import config from "config";
import express from "express";
import { generateProfileFields } from "../handlers/helpers/profileGenerator";
import request from "request";
import { validationResult } from "express-validator";

export const getUserProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const profile = await Profile.findOne({
      user: req.body.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    res.json(profile);
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    console.log(err);
    res.status(500).send("Server error");
  }
};
export const createUserProfile = async (
  req: express.Request<ProfileDoc>,
  res: express.Response
) => {
  const errors = validationResult(req);
  !errors.isEmpty() && res.status(400).json({ errors: errors.array() });
  const profileFields = generateProfileFields(req);

  try {
    let profile = await Profile.findOne({ user: req.body.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.body.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);

    await profile?.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }

  res.send();
};

export const getAllProfiles = async (
  req: express.Request<ProfileDoc>,
  res: express.Response
) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteUserProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Profile.findOneAndRemove({ user: req.body.user.id });
    await Profile.findOneAndRemove({ _id: req.body.user.id });
    res.json({ msg: "User removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

export const addUserExperience = async (
  req: express.Request,
  res: express.Response
) => {
  const errors = validationResult(req);
  !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

  const {
    _id,
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = req.body;
  const newExp = { title, company, location, from, to, current, description };

  try {
    const profile = await Profile.findOne({ user: req.body.user.id });
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    //@ts-ignore
    let educToUpdate = profile?.experience?.find((exp) => exp.id === _id);
    if (educToUpdate) {
      educToUpdate = newExp;
      await profile.save();
      return res.json(profile);
    }

    profile?.experience?.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const deleteUserExperience = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const profile = await Profile.findOne({ user: req.body.user.id });
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    const removeIndex = profile?.experience?.findIndex(
      // @ts-ignore
      (item) => item._id === req.params.id
    );

    if (!removeIndex)
      return res
        .status(400)
        .json({ msg: "There is no experience for this user profile" });

    profile.experience?.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

export const addUserEducation = async (
  req: express.Request,
  res: express.Response
) => {
  const errors = validationResult(req);
  !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

  const {
    _id,
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.body.user.id });
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    console.log(_id);
    //@ts-ignore
    let educToUpdate = profile?.education?.find((educ) => educ.id === _id);

    if (educToUpdate) {
      educToUpdate = newEdu;
      await profile.save();
      return res.json(profile);
    }

    profile?.education?.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const deleteUserEducation = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const profile = await Profile.findOne({ user: req.body.user.id });
    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    const removeIndex = profile?.education?.findIndex(
      // @ts-ignore
      (item) => item._id === req.params.id
    );

    if (!removeIndex)
      return res
        .status(400)
        .json({ msg: "There is no education for this user profile" });

    profile.education?.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

export const getUserGithub = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.name
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      error && console.log(error);
      if (response.statusCode !== 200)
        return res.status(404).json({ msg: "No Github profile found" });

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
