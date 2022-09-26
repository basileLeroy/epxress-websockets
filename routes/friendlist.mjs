import express from "express";
const router = express.Router()
import {getFriendIds, getFriends, getUser} from "../database/queries.mjs";
import db from "../database/connection.mjs";
import {authenticateToken, getUserFromToken} from "./auth/authenticateToken.mjs";

router.get("/",authenticateToken, (req, res) => {
    (async () => {
        const token = req.cookies["user-token"]
        let userFromToken = await getUserFromToken(token)
        const user = await getUser(db, userFromToken.user)

        const friendIdList = await getFriendIds(db, user[0].id)
        console.log(friendIdList)
        // reformatting friendIdList to new array with only integers
        let reformattedList = [];
        friendIdList.forEach((object, index) => {
            reformattedList = [...reformattedList, object.friend_id]
        })
        if(reformattedList.length !== 0) {
            const friendList = await getFriends(db, reformattedList)
            console.log(friendList)
            res.send({list: friendList, user: user})
        } else {
            res.send({list: false, user:user})
        }
    })()
})

export default router;