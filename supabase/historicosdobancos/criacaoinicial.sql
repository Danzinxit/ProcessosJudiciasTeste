CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number text UNIQUE NOT NULL,
  opened_at date NOT NULL,
  description text NOT NULL,
  client text NOT NULL,
  lawyer text NOT NULL,
  state text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Cria a tabela de andamentos dos processos com exclusão em cascata
CREATE TABLE IF NOT EXISTS case_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  date date NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Habilita o RLS (Row Level Security)
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_updates ENABLE ROW LEVEL SECURITY;

-- Cria políticas de acesso total para usuários autenticados
CREATE POLICY "Permitir todo acesso para usuários autenticados" ON cases
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir todo acesso para usuários autenticados" ON case_updates
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);