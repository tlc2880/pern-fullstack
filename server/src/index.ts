import express, { Request, Response } from 'express';
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport')

require('./middlewares/passport-middleware'); // import passport middleware
  
// middleware
app.use(express.json());
app.use(cookieParser())
app.use(passport.initialize())
 
const todosRoutes = require("./routes/todos.routes");
const authRoutes = require('./routes/auth.routes')
 
app.use(function (req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
 
app.use("/", todosRoutes);
app.use('/', authRoutes);
 
app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})