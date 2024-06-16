import express from "express"
import {login, logout, refetch, register} from "../Controller/auth.js"
import {  deletevideo, editvideo, getvideo, getvideobyId, uploadvideo } from "../Controller/post.js"
import { createcomment, comment } from "../Controller/postcomment.js"
// import verifyToken from "../verifytoken.js"
// import User from "../model/User.js"
import { fetchProfile, fetchuserpost } from "../Controller/profile.js"


const router = express.Router()

// login route
router.post('/register', register)
router.post('/login', login)
router.get("/logout", logout)

// video (data) route
router.post("/yourstory",uploadvideo)
router.get("/stories",getvideo)
router.get("/stories/:id",getvideobyId)
router.put("/:id",editvideo)
router.delete("/:id",deletevideo)


// comments
router.post("/comment/create",createcomment)
router.get("/comments/stories/:id",comment)



router.get("/refetch", refetch);

router.get('/profile/:id', fetchProfile)
router.get('profile/:id/posts',fetchuserpost)


export default router