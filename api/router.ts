import { Router } from "https://deno.land/x/oak/mod.ts";
import { getGithubCore, getGithubUser } from "./github/github.ctrl.ts";

const router = new Router();

router.get("/api/user/:user", getGithubUser);
router.get("/api/core/:owner", getGithubCore);

export default router;
