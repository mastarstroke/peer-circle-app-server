const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("./prisma");

console.log("Available models:", Object.keys(prisma));  // quick check

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.id || !profile.emails?.[0]?.value) {
          return done(new Error("Incomplete profile data from Google"), null);
        }

        let user = await prisma.user.findUnique({
          where: { providerId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              fullName: profile.displayName || "Anonymous",
              avatar: profile.photos?.[0]?.value || null,
              provider: "google",
              providerId: profile.id,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});