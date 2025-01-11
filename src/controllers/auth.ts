import { Request, Response } from "express";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const auth = passport.authenticate("github", {
  scope: ["read:user", "user:email"],
});

export const githubCallback = async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user.profile as any;
  //@ts-ignore
  const accessToken = req.user.accessToken as string;

  console.log(user);

  const data = {
    githubId: user.id,
    username: user.displayName,
    email: user.emails[0].value,
    avatarUrl: user.photos[0].value,
  };

  prisma.user
    .upsert({
      where: { githubId: user.id },
      update: {
        ...data,
        oauth: {
          update: {
            accessToken,
          },
        },
      },
      create: {
        ...data,
        oauth: {
          create: {
            accessToken,
          },
        },
      },
    })
    .then((user) => {
      const token = jwt.sign(
        { githubId: user.githubId },
        process.env.JWT_SECRET!,
      );
      res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
    })
    .catch((err) => {
      res.status(500).json({ error: "An error occurred" });
    });
};

export const me = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: { githubId: req.user.githubId },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
    },
  });
  res.status(200).json(user);
};

export const snippets = async (req: Request, res: Response) => {
  const snippets = await prisma.snippet.findMany({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });
  res.status(200).json(snippets);
};
