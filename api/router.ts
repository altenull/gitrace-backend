import { Router } from "https://deno.land/x/oak/mod.ts";
import * as githubCtrl from "./github/github.ctrl.ts";

const router = new Router();

router.get("/api/users/:userName", githubCtrl.getUser);
router.get("/api/users/:userName/repos", githubCtrl.getRepos);
router.get(
  "/api/users/:userName/repos/:repoName/punchCard",
  githubCtrl.getPunchCard
);
router.get(
  "/api/users/:userName/repos/:repoName/languages",
  githubCtrl.getLanguages
);

export default router;
