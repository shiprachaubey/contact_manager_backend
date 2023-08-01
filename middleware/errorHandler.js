const { constants } = require("../constants");

const errorHandler = (err,req,res,next) =>  {
    const statusCode = res.statusCode ? res.statusCode :500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({tite: "Vaidation Failed" ,message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({tite: "Not found" ,message: err.message, stackTrace: err.stack});

            case constants.UNAUTORIZED:
            res.json({tite: "unauthorised" ,message: err.message, stackTrace: err.stack});


            case constants.FORBIDDEN:
            res.json({tite: "forbidden" ,message: err.message, stackTrace: err.stack});

            case constants.SERVER_ERROR:
                res.json({tite: "server-error" ,message: err.message, stackTrace: err.stack});
        default:
            console.log("No Error, all Good")
            break;
    }
};

module.exports= errorHandler;