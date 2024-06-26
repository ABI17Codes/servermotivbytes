
import Comment from '../model/comment.js'


// create a new comment
const createcomment = async (req, res) => {
    try {
const { comment, username, postId, userId } = req.body
      const newcomment = new Comment({
        comment, username, postId, userId
      });
      const savedcomment = await newcomment.save();
      res.sendStatus(200).json(savedcomment);
      console.log(savedcomment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error })
    }
  };

  
//GET POST COMMENTS
const comment = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



  export { createcomment, comment }