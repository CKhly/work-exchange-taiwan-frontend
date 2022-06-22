import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        // async jwt({ token, account }) {
        //     // Persist the OAuth access_token to the token right after signin
        //     if (account) {
        //         token.accessToken = account.access_token
        //     }
        //     console.log("token: ",token)
        //     return token
        // },
        // async session({ session, token, user }) {
        //     // Send properties to the client, like an access_token from a provider.
        //     session.accessToken = token.accessToken
        //     console.log("session: ",session)
        //     return session
        // },
        async getProfile(){
            console.log("getProfile")
            fetch('http://localhost:4000/api/1.0/user/profile',
            {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                }),
            })
        }
    },
    
})