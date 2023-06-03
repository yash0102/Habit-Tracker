const mongoose = require('mongoose');

// creating schema(blueprint) for habit

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    records : [
        {
            data: {
                type: Date,
                required: true,
            },

            status: {
                type: String,
                default: "none"
            }
        }
    ]
});

const Habit = mongoose.model(Habit, habitSchema);

module.exports = Habit;