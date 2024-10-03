const User = require("../model/user.js")


module.exports.renderSingupForm = (req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.signup = async (req,res)=>{
    try{
        let {username , email , password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to StayNest");
        res.redirect("/listings");
    });
    } catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    };
};

module.exports.renderloginForm = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success", "welcome back to StayNest");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logout = (req,res,next)=>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};
