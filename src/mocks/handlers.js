import { rest } from "msw";

export const handlers = [
  rest.post(process.env.REACT_APP_API_URL + "/password", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        valid: true
      })
    )
  })
];