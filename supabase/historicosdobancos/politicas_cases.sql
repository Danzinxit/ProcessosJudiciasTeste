-- Remove política antiga de acesso total para usuários autenticados na tabela cases
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON cases;

-- Adiciona políticas específicas para cada operação na tabela cases
CREATE POLICY "Permitir leitura para usuários autenticados"
ON cases FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Permitir inserção para usuários autenticados"
ON cases FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Permitir atualização para usuários autenticados"
ON cases FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir exclusão para usuários autenticados"
ON cases FOR DELETE
TO authenticated
USING (true);