// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readFile } from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

type Data = {
  frontmatter: {
    [key: string]: any;
  };
  mdxSource: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;

  if (slug == "undefined") {
    res.status(204);
    return;
  }
  //Find the absolute path of the json directory

  const blogsDirectory = path.join(process.cwd(), "pages/projects");
  //Read the json data file data.json
  readFile(`${blogsDirectory}/${slug}.mdx`, "utf8", async (err, data) => {
    if (err) throw err;

    const { data: frontmatter, content } = matter(data);

    const mdxSource = await serialize(content);

    res.status(200).json({ frontmatter, mdxSource });
  });
}
