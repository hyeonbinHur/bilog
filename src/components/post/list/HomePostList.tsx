import { IPost } from "@/type";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { Separator } from "../../ui/separator";

import { getAllPosts } from "@/src/app/action/postAction";
import PostCard from "./PostCard";

const HomePostList = async () => {
  const locale = await getLocale();
  const posts = await getAllPosts(locale);

  return (
    <div>
      {posts.map((e: IPost, i: number) => (
        <div key={e.post_id}>
          <Link href={`/${e.type.toLocaleLowerCase()}/${e.post_id}`}>
            <PostCard {...e} />
            {i !== posts.length - 1 && <Separator className="mb-5" />}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePostList;
