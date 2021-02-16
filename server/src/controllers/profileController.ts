import express from "express";
import request from "request";
import {Profile, ProfileDoc} from "../models/Profile";
import {validationResult} from "express-validator";
import {generateProfileFields} from "../handlers/helpers/profileGenerator";
import config from "config";

export const getUserProfile = async (req: express.Request, res: express.Response) => {
    try {
        const profile = await Profile.findOne({user: req.params.id}).populate('user', ['name', 'avatar'])
        if (!profile) return res.status(400).json({msg: "There is no profile for this user"});
        res.json(profile);
    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({msg: "There is no profile for this user"});
        }
        res.status(500).send(`Server error: ${err.message}`);
    }
}
export const createUserProfile = async (req: express.Request<ProfileDoc>, res: express.Response) => {
    const errors = validationResult(req);
    !errors.isEmpty() && res.status(400).json({errors: errors.array()});
    const profileFields = generateProfileFields(req);

    try {
        let profile = await Profile.findOne({user: req.params.id})

        if (profile) {
            profile = await Profile.findOneAndUpdate({user: req.params.id}, {$set: profileFields}, {new: true})
            return res.json(profile);
        }
        profile = new Profile(profileFields);

        await profile?.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

    res.send()
}

export const getAllProfiles = async (req: express.Request<ProfileDoc>, res: express.Response) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

export const deleteUserProfile = async (req: express.Request, res: express.Response) => {
    try {
        await Profile.findOneAndRemove({user: req.params.id});
        await Profile.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'User removed'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

export const addUserExperience = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    !errors.isEmpty() && res.status(400).json({errors: errors.array()});

    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {title, company, location, from, to, current, description};

    try {
        const profile = await Profile.findOne({user: req.params.id});
        if (!profile) return res.status(400).json({msg: "There is no profile for this user"});

        profile?.experience?.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }
}

export const deleteUserExperience = async (req: express.Request, res: express.Response) => {
    try {
        const profile = await Profile.findOne({user: req.params.id});
        if (!profile) return res.status(400).json({msg: "There is no profile for this user"});
        // @ts-ignore
        const removeIndex = profile?.experience?.map(item => item.id)?.indexOf(req.params.id)

        if (!removeIndex) return res.status(400).json({msg: "There is no experience for this user profile"});
        profile.experience?.splice(removeIndex, 1);

        await profile.save();
        res.json({msg: 'Experience removed'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

export const addUserEducation = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    !errors.isEmpty() && res.status(400).json({errors: errors.array()});

    const {school, degree, fieldOfStudy, from, to, current, description} = req.body;
    const newEdu = {school, degree, fieldOfStudy, from, to, current, description};

    try {
        const profile = await Profile.findOne({user: req.params.id});
        if (!profile) return res.status(400).json({msg: "There is no profile for this user"});

        profile?.education?.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }
}

export const deleteUserEducation = async (req: express.Request, res: express.Response) => {
    try {
        const profile = await Profile.findOne({user: req.params.id});
        if (!profile) return res.status(400).json({msg: "There is no profile for this user"});
        // @ts-ignore
        const removeIndex = profile?.education?.map(item => item.id)?.indexOf(req.params.id)

        if (!removeIndex) return res.status(400).json({msg: "There is no education for this user profile"});
        profile.education?.splice(removeIndex, 1);

        await profile.save();
        res.json({msg: 'Education removed'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

export const getUserGithub = async (req: express.Request, res: express.Response) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.name}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }

        request(options, (error, response, body) => {
            error && console.log(error);
            if (response.statusCode !== 200) return res.status(404).json({msg: "No Github profile found"});

            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }
}