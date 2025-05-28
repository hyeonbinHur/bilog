import { Link } from "@/src/i18n/routing";
import { IPost } from "@/type";
import PaginationComp from "../pagination/PaginationComp";
import { Separator } from "../ui/separator";
import PostCard from "./PostCard";

/**
 * Todo
 *
 * update getServerSesssion, temporarly use it instead of jwt
 */

export default async function PostList({
  posts,
  totalCount,
  path,
}: {
  posts: IPost[];
  totalCount: number;
  path: string;
}) {

  return (
    <div>
      {posts.length > 0 ? (
        <div>
          {posts.map((e: IPost, i: number) => (
            <div key={e.post_id}>
              <Link href={`/${path}/${e.post_id}`} prefetch={true}>
                <PostCard {...e} />
              </Link>
              {i !== posts.length - 1 && <Separator className="mb-5" />}
            </div>
          ))}
          <PaginationComp totalCount={totalCount} />
        </div>
      ) : (
        // 포스트가 없을 경우
        <div className="flex flex-col items-center justify-center border rounded-md shadow-md p-6 h-48 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Posts Found
          </h2>
          <p className="text-gray-600 mb-4">
            It looks like there are no posts available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
