import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./api/router.ts";

const HOST: string = "127.0.0.1";
const PORT: number = 8080;

const url: string = `${HOST}:${PORT}`;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`${yellow("Listening on ")}${green(url)}`);

await app.listen(url);
