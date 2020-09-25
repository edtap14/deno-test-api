import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const userRouter = new Router();

userRouter.get("/users", (ctx: RouterContext) => {
  ctx.response.body = "[GET] /users has been call";
});

userRouter.post("/users", async (ctx: RouterContext) => {
  const { request, response } = ctx;
  const reqBody = request.body({ type: "json" });
  response.body = {
    succes: true,
    msg: "[POST] /users",
    request: {
      type: reqBody.type,
      value: await reqBody.value
    }
  };
});
userRouter.put("/users", (ctx: RouterContext) => {
  ctx.response.body = "[PUT] /users has been added";
});
userRouter.delete("/users", (ctx: RouterContext) => {
  ctx.response.body = "[DELETE] /users has been deleted";
});

// app.use((ctx) => {
//   ctx.response.body = "Hello World deno with denon!";
// });

app.use(userRouter.routes());

await app.listen({ port: 8000 });
