const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 5000;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(session({
    secret: 'QWERTYUKLPOASDFGHJKLZXCVBNM',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 }
}));

app.get('/', (req, res) => {
    res.render('home');
});

//GET '*' phải để ở cuối cùng, khi mà những điều trên không thỏa
app.get('*', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
    console.log('UI SERVER RUNNING...');
});
