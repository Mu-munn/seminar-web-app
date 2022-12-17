import SignUp from "./signUp"
// import { useSession } from "../src/hooks/useSession"
import { Center, Container } from "@chakra-ui/react"
import { Session, useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import Account from "../components/Account"
import useAuthUser from "../src/hooks/useAuthUser"
import router from "next/router"
import { useEffect } from "react"
import SignIn from "./signIn"

export default function Home() {
  // const { user } = useUser()
  // const session = useSession()
  // console.log(session)

  const supabase = useSupabaseClient()

  // const session = useSession()
  const { user, isLoading, token } = useAuthUser()
  // console.log(user)

  // useEffect(() => {
  //   if (!user && !isLoading) {
  //     router.push("/signIn")
  //   }
  // }, [user, isLoading, router])

  // if (isLoading) {
  //   return <div>Loading</div>
  // } else {
  //   return <Container>{!session}</Container>
  // }

  return (
    <>
      {!user ? (
        // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme='dark' />
        <SignIn />
      ) : (
        <Account session={user} />
      )}
    </>
  )
}

// return (
//   <>
//     {!session ? (
//       // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme='dark' />
//       <SignUp />
//     ) : (
//       <Account session={session} />
//     )}
//   </>
// )
