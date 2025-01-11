import { Router } from "express";
import passport from "passport";
import { auth, githubCallback, me, snippets } from "../controllers/auth";
import { verifyToken } from "../middleware/jwt";

const router = Router();

router.get("/github", auth);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  githubCallback,
);
router.get("/@me", verifyToken, me);
router.get("/@me/snippets", verifyToken, snippets);

export default router;
