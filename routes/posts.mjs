import express from "express";
import {authenticateToken} from "./auth/authenticateToken.mjs";
const router = express.Router()

const posts = [
    {
        title: "title 01",
        content: "check ipsum mow words stuff like that not beeing able to pass",
        author: "Kevin"
    },
    {
        title: "title 02",
        content: "check ipsum mow words stuff like that not beeing able to pass som more content to make the difference",
        author: "Jon"
    },
]

router.get("/", authenticateToken, (req, res) => {
    res.send(posts)
})

export default router;