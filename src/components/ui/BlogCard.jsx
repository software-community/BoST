// BlogCard.js (or BlogCard.tsx if using TypeScript)
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { trimContent } from "../utils/truncateText";
export function BlogCard({ title, club, author, brief, id }) {
  // Trim the content to 10 characters
  

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className=" break-words " >{brief}</p>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={`/blogs/${id}`}>
          <Button className="bg-primary">
            Read{" "}
            <IconArrowUpRight
              size={20}
              className="hover:rotate-45 ml-2 transition-all"
            />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
