export interface Active {
  corp_id: string
  active_number: number
  active_name: string
  active_at: Date
  active_place: string
  absence_submit_at?: Date
  absence_permission_at: Date
  report_receipt_at: Date
  selection_result: number
}
