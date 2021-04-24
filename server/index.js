require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const passport = require('./passport.js')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const mediaRoutes = require('./routes/media');
const eventRoutes = require('./routes/eventRoutes');
const passportRoutes = require('./routes/passportRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cron = require('node-cron');
const Sender = require('./classes/sender');
const app = express();
const port = process.env.PORT || 3000
// app.get('/*',function(req,res,next){
//     res.header('Access-Control-Allow-Origin' , 'http://localhost:8080' );
//     console.log('hit')
//     next(); // http://expressjs.com/guide.html#passing-route control
// });
mongoose.connect('mongodb://localhost:27017/event', { useNewUrlParser: true }).
then(db => console.log('[OK] DB is connected')).
catch(err => console.error(err));
app.use(cors({credentials: true, origin: process.env.CLIENT}))
app.use(session({secret: 'SECRET'}))
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/user', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/passport', passportRoutes);
app.set('port', port);

// cron.schedule('*/10 * * * *', () => {
//    Sender.handleDelayedSend();
// });

app.listen(app.get('port'), () => {
   console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});
