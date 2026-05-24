const prisma = require("./prisma");

const passport = require("passport");

const GoogleStrategy =
  require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("No email found from Google"),
            null
          );
        }

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              fullName:
                profile.displayName || "Anonymous",
              avatar:
                profile.photos?.[0]?.value || null,

              provider: "google",
              providerId: profile.id,
            },
          });
        }

        else if (!user.providerId) {
          user = await prisma.user.update({
            where: {
              email,
            },

            data: {
              provider: "google",
              providerId: profile.id,
              avatar:
                profile.photos?.[0]?.value ||
                user.avatar,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        console.error(
          "Google Strategy Error:",
          err
        );

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
      where: {
        id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;