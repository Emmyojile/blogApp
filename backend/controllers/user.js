const User = require("../models/User");
const Post = require("../models/Post");

const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.dashboard = (req, res) => {
  const {token} = req.cookies;
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if(err) throw err;
      res.json(user);
    })
  }else {
    res.json(null);
  }
}

exports.createPost = async (req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if(err) throw err;

      const {title, summary, content} = req.body;
      const newPost = await Post.create({
        ...req.body,
        cover:newPath,
        author: user.id,
      })
      res.json(newPost);
  })

}

exports.getPosts = async (req, res) => {
  const allPosts = await Post.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(20)
  res.json(allPosts);
}

exports.getSinglePost = async (req, res) => {
  const {id} = req.params;
  const singlePost = await Post.findById(id).populate('author', ['username']);
  res.json(singlePost);
}


exports.updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summary, content } = req.body;
    const updatePost = await Post.findById(id);
    const isAuthor = updatePost.author.equals(info.id);

    if (!isAuthor) {
      return res.json('you are not the author');
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : updatePost.cover
      },
      { new: true }
    );

    res.json(updatedPost);
  });
}



exports.logout = (req, res) => {
  res.clearCookie('token').json('ok');
  // res.cookie("token", '').json('ok')
}

exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.json({ error: 'Abeg provide the required parameters' });
      }
  
      const user = await User.findOne({ email });
  
      if (user) {
        console.log('User already exists');
        return res.json({ error: `Abeg email already exists` });
        // return res.status(400).json({ error: `Abeg email already exists` });
      }
  
      const newUser = await User.create({ ...req.body });
  
      return res.json(newUser);
    //   return res.status(201).json({success: "success", message: "Successful registration!", data: newUser});
    } catch (error) {
      console.log(error);
      return res.json({ error: 'internal server error' });
    }
  };
 
 exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Checking for an already existing email
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User does not exist');
        return res.json({ error: `A user with ${req.body.email} does not exist` });
      }
  
      // Checking for incorrect password
      const isPasswordCorrect = await user.comparePasswords(password);
      if (!isPasswordCorrect) {
        console.log('Incorrect Password');
        return res.json({ error: 'Abeg na Incorrect Password' });
      }
  
      const token = user.createJWT();
      res.cookie('token', token);
      // res.cookie('token', token, { httpOnly: true, secure: false });
      
      return res.json({
        id: user._id,
        username: user.username,
      })
      // return res.json({message: "Logged in Successfully", data:user, success: "Success" });
    } catch (error) {
      console.log(error);
      return res.json({ message: 'internal server error' });
    }
  };
