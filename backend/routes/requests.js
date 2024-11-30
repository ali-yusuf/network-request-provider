const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// Get all requests
router.get("/", async(req, res, next) => {
    try {
        const requests = await Request.find();
        if (requests) {
            res.status(200).json({ type: "ok", "requests": requests });
        } else {
            res.status(400).json({ type: "forbidden", "requests": requests });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    next();
});

// Add a new request
router.post("/", async(req, res) => {
    try {
        const { email } = req.body; // Assuming email is part of the request body
        console.log("post called", email);
        const existingMail = await Request.findOne({ email });
        console.log("post called", existingMail);
        if (existingMail.email) {
            console.log("post if called", existingMail.email);
            if ("resolved" === existingMail.status) {
                const newRequest = new Request(req.body);
                const savedRequest = await newRequest.save();
                res.status(201).json({ type: "Created", message: `Request created successfully ${savedRequest._id}` });
            } else {
                res.status(403).json({ type: "Forbidden", message: 'you can not raise multile requests at a time. ' });
            }
        } else {
            console.log("else post called", email);
            const newRequest = new Request(req.body);
            const savedRequest = await newRequest.save();
            res.status(201).json({ type: "Created", message: `Request created successfully ${savedRequest._id}` });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update request status and comments
router.patch("/:id", async(req, res) => {
    try {
        const { status, comments } = req.body;
        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id, { status, comments }, { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;