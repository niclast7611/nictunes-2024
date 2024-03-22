import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    console.log("Refreshed token", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshedToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callback: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: any;
      account: any;
      user: any;
    }) {
      // https://next-auth.js.org/v3/tutorials/refresh-token-rotation
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          username: account.providerAccoundId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      //   return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("Existing token is still valid, returning it");
        return token;
      }

      //   access token has expired, try to refresh it
      console.log("Refreshing token");
      return await refreshAccessToken(token);
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
};

export default NextAuth(authOptions);
