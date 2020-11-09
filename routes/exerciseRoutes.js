const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/exercise", (req,res) => {
    res.sendFile("exercise.html", { root: "public" })
});

router.get("/stats", (req,res) => {
    res.sendFile("stats.html", { root: "public" })
});

router.get("/api/workouts/range", (req,res) => {
    Workout.find({
        day: {
            $lt: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
    })
    .sort({date: -1})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts", (req,res) => {
    Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body)
    Workout.findOneAndUpdate({_id: req.params.id}, { $push: { exercises: req.body } }, { new: true })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;