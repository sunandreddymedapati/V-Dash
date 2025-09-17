export function getPropertyIdByName(properties, name) {
  if (!Array.isArray(properties) || !name) return '';

  const normalize = (s) =>
    String(s).trim().toLowerCase().replace(/\s+/g, ' ');

  const target = normalize(name);

  const match = properties.find(
    (p) => normalize(p?.name || '') === target
  );

  return match?._id ?? match?.id ?? '';
}