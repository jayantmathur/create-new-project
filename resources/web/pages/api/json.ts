// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import data from "../../../../data/data.json";
import { readFile } from "fs";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Find the absolute path of the json directory
  // const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json data file data.json
  // await readFile(jsonDirectory + "/data.json", "utf8", function (err, data) {
  //   res.status(200).json(typeof data === "string" ? JSON.parse(data) : data);
  // });
  // await readFile(require("data/data.json"), "utf8", function (err, data) {
  //   if (err) res.status(400);
  //   res.status(200).json(typeof data === "string" ? JSON.parse(data) : data);
  // });
  res.status(200).json(typeof data === "string" ? JSON.parse(data) : data);
}
