
const getToken = async(req,res,next)=>{
    
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./localStorage');
    }

    const token = localStorage.getItem('token');
    req.headers('Authorization') = "Bearer " + token;
    next();
}

module.exports = getToken;
