
const path = require("path")

exports.GetRamdomImageName = (Name) => {
    return new Date().getTime() + " _ " + Math.floor(Math.random() * 1000) + Name
}

exports.ImageDesination = (module, ImageName) => {

    return __dirname + `/public/uploads/${module}/${ImageName}`
}


