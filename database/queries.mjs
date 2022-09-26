const getUser = (db, email) => {
    return new Promise((resolve, reject)=> {
        db.query(
            "SELECT * FROM users WHERE email = (?)",
            [email],
            (err, result) => {
                return err ? reject(err) : resolve(result)
            }
        )
    })
}

const getFriendIds = (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT friend_id FROM friends WHERE user_id = ?",
            id,
            (err, result) => {
                return err ? reject(err) : resolve(result)
            }
        )
    })
}

const getFriends = (db, list) => {
    console.log(list)
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT id, name, email FROM users WHERE id IN (?)`,
            [list],
            (err, result) => {
                return err ? reject(err) : resolve(result)
            }
        )
    })
}

export {
    getUser,
    getFriendIds,
    getFriends,
}