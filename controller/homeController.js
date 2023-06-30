const Habit = require('../modal/Habit');

module.exports.home = async (req, res) => {
    // fetching mongoose
    try {
            let habit = await Habit.find({});
            return res.render("home", {
            habits: habit,
            });

    } catch (err) {
        console.log("Error ",err );
        return;
    }
};

// function for creating Habit

module.exports.addHabit = async (req, res) => {
    try {
        // Create new Habit and Store in DB
        const habit = await Habit.findOne({name: req.body.name});
        if(!habit){
            const name = req.body.name;
            let date = new Date().toDateString(); // "Sat Jun 03 2023".
            // console.log('date: ',date);
            let newHabit = await Habit.create({
            name,

            records: [
              {
                date: date,
                status: "none",
              },
            ],
          });
        }
        return res.redirect('/');
    } catch (error) {
        console.log("Error in adding habit", error);
        return;
    }
};


module.exports.deleteHabit = async (req, res) => {
  try {
      // console.log("params :",req.params.id);
      await Habit.findByIdAndDelete(req.params.id);

    return res.redirect('/');
  } catch (err) {
    console.log("Error in removing Habit :", err);
    return;
  }
};

module.exports.details = async (req, res) => {
  try {

    const habitId = req.params.id;
    const habit = await Habit.findById({_id:habitId});

    return res.render('habitInfo', {
      all_habits: habit
    });

  } catch (error) {
    console.log('Error while fetching details', error);
  }
}


// status update
module.exports.updateStatus = async (req, res) => {
  try {
    const { habitId, id } = req.params;
    const { status } = req.body;

    // Find the habit by its id and update the specific day's status
    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habitId, "records._id": id },
      { $set: { "records.$.status": status } },
      { new: true }
    );
    return res.redirect("back");
  } catch (err) {
    res.status(500).json({
      message: "Error updating habit status",
      error: err.message,
    });
  }
};