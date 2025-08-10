const express = require('express');
const router = express.Router();
const db = require('../db');

// for testing
// retrieves first ten passwords and display at route guests
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM passwords LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

const pwQuery = 
`SELECT g.id, first_name, last_name, rsvp_status, plus_one
FROM guests g 
INNER JOIN passwords p ON g.password_id = p.id 
WHERE p.group_password = $1`

// get all guests with this specific password
router.get('/:pw', async (req, res) => {
    const curPw = req.params.pw; // get password from the request URL
    
    try {
      const result = await db.query(pwQuery, [curPw]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Password not found' });
      }
      res.json(result.rows); // return specific guest data
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });

module.exports = router;