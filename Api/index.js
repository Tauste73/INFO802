const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



app.post('/convertmtoh', (req, res) => {
    
    let minute = req.body.minute
    let hours = minute / 60
    console.log(hours)
    res.send({hours: hours})
})




app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

module.exports = app;