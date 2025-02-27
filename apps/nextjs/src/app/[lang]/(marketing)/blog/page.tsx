import { compareDesc } from "date-fns";
import Script from "next/script";

import { BlogPosts } from "~/components/blog/blog-posts";
import { allPosts } from ".contentlayer/generated";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <>
      <Script
        defer
        src="https://assets.onedollarstats.com/stonks.js"
        id="stonks"
      />
      <main>
        <BlogPosts posts={posts} />
      </main>
    </>
  );
}
