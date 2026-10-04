const VictimAct = require('../models/VictimRequestModel');

exports.createVictimNeed = async (req, res) => {
  try {
    const { email, needType, description } = req.body;

    const newRequest = new VictimAct({ email, needType, description });
    await newRequest.save();

    res.status(201).json({ message: 'Victim need request submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
