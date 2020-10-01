import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

enum Gender {
  Male,
  Female,
}

interface IUser {
  username: string;
  email: string;
  age: number;
  gender: Gender;
  password: string
}

let Users: Array<IUser> = [
  {
    username: "edgar",
    email: "edgar.tapia@outlook.es",
    age: 33,
    gender: Gender.Male,
    password: "qwerty"
  },
  {
    username: "ethien",
    email: "ethien.salinas@gmail.com",
    age: 35,
    gender: Gender.Male,
    password: "qwerty"
  },
  {
    username: "alex",
    email: "alex.gallegos@gmail.com",
    age: 25,
    gender: Gender.Male,
    password: "qwerty"
  },

]

const app = new Application();
const userRouter = new Router();

userRouter.get("/users", (ctx: RouterContext) => {
  ctx.response.body = "[GET] /users has been call";
});

const findUser = async(username:string | undefined) => Users.find(x => x.username == username);

userRouter.get("/users/:username", async(ctx: RouterContext) => {
  const { params } = ctx;
  ctx.response.body = `[GET] ${JSON.stringify(await findUser(params.username))}`;
});

userRouter.post("/users", async (ctx: RouterContext) => {
  const { request, response } = ctx;
  const reqBody = request.body({ type: "json" });
  response.body = {
    succes: true,
    msg: "[POST] /users",
    request: {
      type: reqBody.type,
      value: await reqBody.value,
    },
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
