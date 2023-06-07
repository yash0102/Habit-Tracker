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
            
            let newHabit = await Habit.create({
            name: req.body.name,

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

