const express = require('express');
const router = express.Router();
const db = require('../db');

// for testing
// retrieves first ten guests and display at route guests
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM guests LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
    const guestId = req.params.id; // get ID from the request URL
    
    try {
      const result = await db.query('SELECT * FROM guests WHERE id = $1', [guestId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Guest not found' });
      }
      res.json(result.rows[0]); // return specific guest data
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });

module.exports = router;