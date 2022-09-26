import express from "express";
import bcrypt from "bcrypt";
import { generateToken } from "./authenticateToken.mjs";
import db from "../../database/connection.mjs";
import cookieParser from "cookie-parser";
const router = express.Router()

router.use(cookieParser())

router.post('/', async (req, res) => {
    console.log("Ive been triggered")
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if(err) {
                res.send({returnMessage: err})
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(!response) {
                        res.send({returnMessage: "wrong username or password"})
                    } else {
                        const accessToken = generateToken(result[0])
                        res.cookie("user-token", accessToken, { maxAge: 60*60*24*30*1000, httpOnly: true})
                        console.log('I am here')

                        res.send({
                            user: result[0],
                            auth: true
                        })
                    }
                });
            } else {
                res.json({returnMessage: 'User does not exist.'})
            }
        }
    )
})
export default router;