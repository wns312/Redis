if(process.env.NODE_ENV === "production") {
    module.exports = require("./prod")
}else { // 아니면 dev이므로
    module.exports = require("./dev")
}