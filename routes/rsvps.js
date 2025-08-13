const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM rsvps LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const rsvps = req.body; // array of RSVP objects
    console.log("payload:", rsvps)

    // db insert
    for (const rsvp of rsvps) {
      await db.query(
        `INSERT INTO rsvps (guest_id, invited_id, food_choice, attending, plus_one_name)
         VALUES ($1, $2, $3, $4, $5)`,
        [rsvp.guest_id, rsvp.invited_id, rsvp.food_choice, rsvp.attending, rsvp.plus_one_name]
      );
    }

    res.status(201).json({ message: 'RSVPs saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save RSVPs' });
  }
});

module.exports = router;