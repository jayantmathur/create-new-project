// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';

type Data = {
	frontmatter: {
		[key: string]: any;
	};
	content: string;
}[];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	//Find the absolute path of the json directory
	const blogsDirectory = path.join(process.cwd(), 'blogs');
	//Read the json data file data.json

	const blogs = readdirSync(blogsDirectory).filter(extension =>
		extension.includes('.mdx')
	);

	// console.log(blogs);

	const data = blogs?.map((blog: string) => {
		const markdownData = readFileSync(blogsDirectory + '/' + blog, 'utf8');

		const { data: frontmatter, content } = matter(markdownData);

		return { frontmatter, content };
	});

	if (!data) return;

	res.status(200).json(data);
}
