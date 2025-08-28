import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { BlockMath, InlineMath } from "react-katex";

const renderContent = (content) => {
  // Simple parser: replace \( ... \) with <InlineMath>...</InlineMath>
  // and \\[ ... \\] with <BlockMath>...</BlockMath>
  const inlineRegex = /\$\$(.*?)\$\$|\\\((.*?)\\\)/g;  
  const blockRegex = /\\\[(.*?)\\\]/g; 

  // Split by inline matches
  const parts = [];
  let lastIndex = 0;

  content.replace(inlineRegex, (match, g1, g2, offset) => {
    if (lastIndex < offset) {
      parts.push(content.slice(lastIndex, offset));
    }
    parts.push(<InlineMath math={g1 || g2} />);
    lastIndex = offset + match.length;
  });

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  // Process block math inside those parts
  return parts.map((part, i) => {
    if (typeof part === "string") {
      return part.split(blockRegex).map((seg, j) =>
        j % 2 === 1 ? <BlockMath math={seg} key={`${i}-${j}`} /> : seg
      );
    }
    return <span key={i}>{part}</span>;
  });
};


const BlogDetails = () => {
    const { id } = useParams();
    const {data: blog, isLoading, error} = useFetch(process.env.PUBLIC_URL + '/db.json', (data)=>(data.blogs.find((blog) => blog.id === Number(id))));

    if(isLoading) return (<h2>Loading...</h2>);
    if(error) return (<h2>Error: {error}</h2>);
    if(!blog) return (<h2>Blog not found</h2>);

    return (
        <article className="blog-details">
            <h2>{blog.title} </h2>
            <p>
                Written by {blog.author}
            </p>
            <div style={{ whiteSpace: "pre-line" }}>
                {renderContent(blog.content)}
            </div>
        
        </article>
    );
}

export default BlogDetails;