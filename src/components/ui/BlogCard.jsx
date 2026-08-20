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
    <Card className="w-[350px] bg-[#0d1117] border-zinc-800 hover:border-primary/50 text-white shadow-xl shadow-cyan-950/20 transition-all duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">{title}</CardTitle>
        <p className="break-words text-zinc-400 text-sm mt-2">{brief}</p>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={`/blogs/${id}`}>
          <Button className="bg-primary hover:bg-cyan-400 text-black font-semibold shadow-md shadow-cyan-900/30">
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
