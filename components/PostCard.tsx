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
import SampleImage from "@/public/smaple.png";

const PostCard = () => {
  return (
    <div className="pb-10 border-b-2">
      <Card className="border-0 shadow-none hover:shadow-md ">
        <CardHeader>
          <Image src={SampleImage} alt="sample image" className="w-full" />
          <CardTitle>Card Title</CardTitle>
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
