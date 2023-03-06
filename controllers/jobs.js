const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");

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

const getJob = async (req, res) => {
    const {
        user: { userID },
        params: { id: jobID },
    } = req;

    const job = await Job.findOne({
        createdBy: userID,
        _id: jobID,
    });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobID}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userID },
        params: { id: jobID },
    } = req;

    if (company === "" || position === "") {
        throw new BadRequestError("Please provide both company and position");
    }

    const job = await Job.findByIdAndUpdate(
        {
            createdBy: userID,
            _id: jobID,
        },
        req.body,
        { new: true, runValidators: true }
    );
    
    if (!job) {
        throw new NotFoundError(`No job with id ${jobID}`);
    }

    res.status(StatusCodes.OK).json({ job });
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
