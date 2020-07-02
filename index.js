const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Database connected succsesfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/like', require('./routes/api/like'))
app.use('/api/video', require('./routes/api/video'))
app.use('/api/subscribers', require('./routes/api/subscribers'))
app.use('/api/comment', require('./routes/api/comment'))

app.use('/uploads', express.static('uploads'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));