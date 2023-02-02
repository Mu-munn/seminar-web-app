import { Profile } from 'src/types/profile'

export const isTrue = (a: string, b: string) => {
  if (a === b) return true
  else return false
}

export const isAdminOfProfile = (profile: Profile): boolean => {
  if (profile.is_admin === 0) return false
  return true
}
