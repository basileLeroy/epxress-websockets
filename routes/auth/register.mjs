import express from "express";
import bcrypt from "bcrypt";
import db from "../../database/connection.mjs";
import {generateToken} from "./authenticateToken.mjs";
const router = express.Router()

const hashSalt = 10;

router.post('/', (req, res) => {
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
                res.send({returnMessage: "User already exists!"})
            } else {
                registerNewUser();
            }
        }
    )

    const registerNewUser = () => {
        bcrypt.hash(password, hashSalt, (err, hash) => {
            db.query(
                "INSERT INTO users (email, password) VALUES (?,?)",
                [email, hash],
                (err, result) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.sendStatus(200)
                    }
                }
            )
        })
    }
})
export default router;