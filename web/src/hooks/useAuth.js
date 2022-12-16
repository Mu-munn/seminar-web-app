// import { useRouter } from 'next/router'

import { supabase } from '../supabaseClient'

const useAuth = () => {
  //   const router = useRouter()

  const onSignUp = async (email, password, name, employeePosition) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp(
        { email, password },
        {
          data: {
            user_name: name,
            employee_position: employeePosition,
          },
        }
      )
      if (signUpError) {
        throw signUpError
      }
      console.log('success')
      //   await router.push('/login')
    } catch (error) {
      alert('エラーが発生しました')
    }
  }

  return {
    onSignUp,
  }
}

export default useAuth
