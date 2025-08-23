import { useState } from "react"

const Home = () => {

    const [blogs, setBlogs] = useState([
        {title: "Dulce et Decorum Est", author:"Wilfred Owen", commentary:"Will come", id:1},
        {title: "Alone", author: "Edgar Allan Poe", commentary:"Will come", id:2},
        {title: "Going Blind", author: "Rainer Maria Rilke", commentary:"Will come", id:3}
    ]);

    return (
        <div className="home">
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2> {blog.title} </h2>
                    <p>Written by {blog.author}</p>
                </div>
            )
            )}
        </div>
    );
}

export default Home;