import { useState, useEffect, useTransition } from "react"
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

    //const {data: blogs, isLoading, error} = useFetch("http://localhost:8000/blogs");
    const {data: blogs, isLoading, error} = useFetch(process.env.PUBLIC_URL + '/db.json');

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs = {blogs} title="My Blogs"/>}
        </div>
    );
}

export default Home;