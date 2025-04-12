import React from "react";
import "./Post.css";

export default function Post() {
  return (
    <div className="post">
      <Post />
      <img className="postImg" src="https://images.unsplash.com/photo-1726930095303-4aac9ba8bb74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <div className="postInfo">
        <div className="postCats">
            <span className="postCat">Music</span>
            <span className="postCat">Life</span>

        </div>
        <span className="postTitle">
            Lorem ipsum dolor sit 
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
    </div>
    <div className="postDesc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsam vero adipisci exercitationem delectus laborum dolores eaque deserunt corporis dolor facere tenetur placeat, perspiciatis amet harum nemo! Recusandae, pariatur provident.
    </div>
    
    </div>
  );
}
