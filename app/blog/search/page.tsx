import React from "react";

const page = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const response = await fetch(
    `http://localhost:3000/api/blog/search?q=${searchParams.q}`
  );
  if (!response.ok) {
    return <>error..</>;
  }
  const blog = await response.json();
  console.log(blog);

  return <div>search page : {searchParams.q}</div>;
};

export default page;
