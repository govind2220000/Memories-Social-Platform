import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  //   https://www.restapitutorial.com/httpstatuscodes.html

  try {
    await newPost.save(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");
  //When you set {new: true}, it means that the method will return the new version of the document after the update is applied

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(_id);
    res.status(201).json(deletedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");
  //When you set {new: true}, it means that the method will return the new version of the document after the update is applied

  try {
    const post = await PostMessage.findById(_id);
    //console.log(post);
    const index = post.likes.filter((_id) => _id === String(req.userId));
    //console.log(index);
    if (index.length === 0) {
      // console.log("uuu");
      post.likes.push(req.userId);
    } else {
      // console.log("123");
      // console.log(post.likes);
      post.likes = post.likes.filter((_id) => _id !== String(req.userId)); //this line means we will keep all the userId except the current user id so that it will be disliked for this current user
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    //console.log(updatedPost);
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
