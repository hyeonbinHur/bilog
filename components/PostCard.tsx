import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IPost } from "@/type";

const PostCard = (prop: IPost) => {
  return (
    <div className="pb-10 border-b-2">
      <Card className="border-0 shadow-none hover:shadow-lg ">
        <CardHeader>
          <div className="relative w-full h-64">
            <Image
              src={prop.thumbnail}
              alt={prop.thumbnail_alt}
              layout="fill"
              objectFit="top"
              className="rounded-lg"
            />
          </div>
          <CardTitle>{prop.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Card Description</CardDescription>
        </CardContent>
        <CardFooter>
          <p>Date</p> | <p>Comments</p> | <p>Like</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
