import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
    methods: ["POST", "GET", "HEAD"],
    origin: "*",
});

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse, next: (result?: unknown) => void) => void
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result?: unknown) => {
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}

export default runMiddleware;
export { cors };
