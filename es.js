const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "secretcode",
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(flash());

// MiddleWare -> Flash
app.use((req,res,next) => {
    res.locals.errorMsg = req.flash("Error");
    next();
})

// Storing & Using Info
// Flash

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("Error", "User Not Registered");
    } else {
        req.flash("Success", "User Registered Successfully !");
    }
    res.redirect("/hello");
})

app.get("/hello", (req,res) => {
    // res.send(`Hello ${req.session.name}`);
    res.render("page.ejs", {name : req.session.name, successMsg: req.flash("Success")});  //res.locals.msg = req.flash("Success") -> 2nd Way
})


// Counting no of Request

// app.get("/reqcount", (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`Yoou sent a request ${req.session.count} times`);
// })

// app.get("/es", (req,res) => {
//     res.send("Test Successful");
// })

app.listen(8080, (req, res) => {
    console.log("Listening on 8080");
});

