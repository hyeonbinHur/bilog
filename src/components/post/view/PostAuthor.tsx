// PostAuthor.tsx - 포스트 하단의 작성자 정보를 표시하는 컴포넌트

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function PostAuthor() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex  justify-between w-full text-md">
        <span className="flex items-center gap-3">
          <Avatar className="flex items-center">
            <AvatarImage
              src="https://lh3.googleusercontent.com/a/ACg8ocKXrhh7dYMkeFCgm13lH1W5YmZJ1GaPFMFMTKROb_gdHP_PWsE0=s96-c"
              alt="user_username avatar"
              className="rounded-full w-14"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-stone-500">Hur HyeonBin (Max)</span>
        </span>
      </div>
    </section>
  );
}