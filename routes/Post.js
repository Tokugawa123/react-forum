import express from "express";

const Router = express();
const threadlist = [];
Router.post('/thread', async(req, res)=>{
    const { thread, userID} = req.body;
    const threadID = generateID();

    threadlist.unshift({
        id: threadID,
        title: thread,
        userID: userID,
        replies: [],
        likes: [],

    })
    res.json({
        message: "Created successfully!",
        threads: threadlist,
    })
    console.log("thread generated!")
})
export default Router;
