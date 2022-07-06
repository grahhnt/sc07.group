import { getVideo } from "../../lib/videos";

export default async function handler(req, res) {
  res.status(200).json(await getVideo("296xEIW7wuE"));
}
