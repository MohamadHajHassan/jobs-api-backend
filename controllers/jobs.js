const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userID }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};
const getJob = (req, res) => {
    res.send("get single job!");
};
const updateJob = (req, res) => {
    res.send("update job!");
};
const deleteJob = (req, res) => {
    res.send("delete job!");
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
