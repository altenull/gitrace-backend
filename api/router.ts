import { Router } from "https://deno.land/x/oak/mod.ts";
import { getUser } from "./github/github.ctrl.ts";

const router = new Router();

router.get("/api/users/:userName", getUser);

export default router;
