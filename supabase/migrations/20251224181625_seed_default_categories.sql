-- Seed default categories
INSERT INTO public.categories (id, name, multiplier, input_type, is_auto_calculated, commission_percent, color, emoji)
VALUES
  ('cash', 'Cash Invested', 4, 'currency', false, NULL, 'blue', '💙'),
  ('time', 'Time Contributed', 2, 'hours', false, NULL, 'orange', '🧡'),
  ('revenue', 'Revenue Brought In', 8, 'currency', false, 10, 'red', '❤️'),
  ('expenses', 'Expenses Paid', 4, 'currency', false, NULL, 'pink', '💗')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  multiplier = EXCLUDED.multiplier,
  input_type = EXCLUDED.input_type,
  is_auto_calculated = EXCLUDED.is_auto_calculated,
  commission_percent = EXCLUDED.commission_percent,
  color = EXCLUDED.color,
  emoji = EXCLUDED.emoji;
