'use client'
import Image from 'next/image'
// Import the SDK into your React component
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

// Configure the Contentful client with your space credentials
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({ content_type: 'blogPost' });
        console.log(response)
        // @ts-ignore
        setPosts(response.items);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          <p>{post.fields.content.content[0].content[0].value}</p>
        </div>
      ))}
    </div>
  );
};