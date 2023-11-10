//Code để đọc data gửi từ client
const url = require('url');
function urlencoded (req, res, next) {
    if(req.method == "POST"){
        const chunks = [];
            req.on("data", (chunk) => {
            chunks.push(chunk);
        });
        req.on("end", () => {   
            const data = Buffer.concat(chunks);
            const stringData = data.toString();
            const parsedData = new url.URLSearchParams(stringData);
            const dataObj = {};
            for(var pair of parsedData.entries()) {
                dataObj[pair[0]] = pair[1];
            }
            req.body = dataObj
            next();
        });
    }
    else{
        next();
    }
}

module.exports = { urlencoded };