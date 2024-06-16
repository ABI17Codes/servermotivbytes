import Video from "../model/postvideo.js";



// create a new video
const uploadvideo = async (req, res) => {
  try {

    // 1
    // const newPost=new Post(req.body)
    //     const savedpost = await newPost.save()
    //     res.status(201).json(savedpost)

    // 2
    // const {title,videolink,description} = req.body
    const newVideo = new Video({
      userId: req.body.userId,
      username: req.body.username,
      title: req.body.title,
      videolink: req.body.videolink,
      description: req.body.description,
    });
    const savedvideo = await newVideo.save();
    res.send(200).json(savedvideo);
  } catch (error) {
    console.error(error);
  }
};


// all videos
const getvideo = async (req,res) =>{
    try {
        const data = await Video.find()
        if (!data) {
          throw new Error("An error occurred while fetching a video.");
        }
        res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching videos' });
    }
}

// video getting by Id
const getvideobyId = async (req,res) =>{
  try {
      const data = await Video.findOne({_id : req.params.id})
      res.status(200).json(data)
      // console.log(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching videos' });
  }
}


// update video by Id
const editvideo = async (req,res) =>{
  try {
    const updatedVideo ={
      title: req.body.title,
      videolink: req.body.videolink,
      description: req.body.description,
    };
      const data = await Video.findByIdAndUpdate(req.params.id,updatedVideo)
      res.status(201).json(data)
      // console.log(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating videos' });
  }
}

// delete video by Id
const deletevideo = async (req,res) =>{
  try {
      const data = await Video.findByIdAndDelete({_id : req.params.id})
      res.status(201).json(data)
      // console.log(data);
  } catch (error) {
      console.error(error);
  }
}



export { uploadvideo, getvideo,getvideobyId, editvideo, deletevideo };
