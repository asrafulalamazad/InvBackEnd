const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    let Token = req.headers['token'];
    jwt.verify(Token,"Inv2023", function (err,decoded){
        if(err){
            console.log(Token);
            res.status(401).json({status:"unauthorized"})
        }
        else
        {
            let email = decoded['data'];
            console.log(email);
            req.headers.email= email;
            next();
        }
    });
}