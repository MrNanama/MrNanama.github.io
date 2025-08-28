import { useState } from "react";


const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("mario");

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, content, author};

        console.log(blog);
    }

    return (
        <div className="create">
            <h2>Create new blog!!!</h2>
            <form onSubmit={handleSubmit}>
            <label>Blog title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <label>Content:</label>
            <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            >
            </textarea>

            <label>Author:</label>
            <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            >
                <option value="mario">Mario</option>
                <option value="luigi">Luigi</option>
            </select>

            <button>Add Blog</button>

            </form>

        </div>
    );
}

export default Create;