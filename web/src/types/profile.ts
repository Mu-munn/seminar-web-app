export interface Profile {
  id: string
  full_name: string
  course: string
  grade: string
  class: string
  class_number: number
  student_number: string
  /** 0:一般 1:管理者 */
  is_admin: number
}

export interface ProfileCreate {
  full_name: string
  course: string
  grade: string
  class: string
  class_number: number
  student_number: string
  /** 0:一般 1:管理者 */
  is_admin: number
}
