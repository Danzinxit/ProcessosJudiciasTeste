export interface Case {
  id: string;
  case_number: string;
  opened_at: string;
  description: string;
  client: string;
  lawyer: string;
  state: string;
  created_at: string;
}

export interface CaseUpdate {
  id: string;
  case_id: string;
  date: string;
  description: string;
  created_at: string;
}