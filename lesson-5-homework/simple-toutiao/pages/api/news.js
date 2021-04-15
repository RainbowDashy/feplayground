import fs from 'fs'
import path from 'path'

export default (req, res) => {
    res.statusCode = 200;
    let rawdata = fs.readFileSync('./public/1.json')
    let json = JSON.parse(rawdata)
    res.json(json)
};
