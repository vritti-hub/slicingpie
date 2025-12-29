-- Add expense_received category (reimbursements that reduce founder's pie slices)
INSERT INTO public.categories (id, name, multiplier, input_type, is_auto_calculated, commission_percent, color, emoji)
VALUES ('expense_received', 'Expense Received', 4, 'currency', false, NULL, 'purple', '💜')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  multiplier = EXCLUDED.multiplier,
  input_type = EXCLUDED.input_type,
  is_auto_calculated = EXCLUDED.is_auto_calculated,
  commission_percent = EXCLUDED.commission_percent,
  color = EXCLUDED.color,
  emoji = EXCLUDED.emoji;
