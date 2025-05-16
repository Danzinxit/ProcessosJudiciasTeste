-- Remove políticas antigas de acesso autenticado na tabela cases
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON cases;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON cases;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON cases;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON cases;

-- Cria novas políticas específicas para cada operação na tabela cases
CREATE POLICY "Enable read access for authenticated users"
ON cases FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert access for authenticated users"
ON cases FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update access for authenticated users"
ON cases FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete access for authenticated users"
ON cases FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);