// BlogCard.js (or BlogCard.tsx if using TypeScript)
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconArrowUpRight } from "@tabler/icons-react"
import { trimContent } from "../utils/truncateText" 
export function BlogCard({ title, club, author, content }) {
  // Trim the content to 10 characters
  const trimmedContent = trimContent(content, 50);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{trimmedContent}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button className="bg-primary">
          Read <IconArrowUpRight size={20} className="hover:rotate-45 ml-2 transition-all" />
        </Button>
      </CardFooter>
    </Card>
  )
}
