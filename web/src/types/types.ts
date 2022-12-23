export interface Active {
  corpId: string
  userId: string
  corpName: string
}

export interface Corp {
  corp_id: string
  user_id: string
  corp_name: string
}

export interface Profile {
  id: string
  full_name: string
  course: string
  grade: string
  class: string
  class_number: string
  student_number?: string
  isAdmin: boolean
}
