import { create } from 'zustand';

export const useDateStore = create((set) => {
  // Rehydrate from localStorage and convert ISO strings to Date objects
  const raw = localStorage.getItem('selectedDate');
  let initialSelectedDate = null;
  try {
    if (raw) {
      const parsed = JSON.parse(raw);
      initialSelectedDate = {
        from: parsed?.from ? new Date(parsed.from) : undefined,
        to: parsed?.to ? new Date(parsed.to) : undefined,
      };
    }
  } catch {
    initialSelectedDate = null;
  }

  return {
    selectedDate: initialSelectedDate,

    setSelectedDate: (range) => {
      if (range && (range.from || range.to)) {
        const toStore = {
          from: range.from ? range.from.toISOString() : null,
          to: range.to ? range.to.toISOString() : null,
        };
        localStorage.setItem('selectedDate', JSON.stringify(toStore));
      } else {
        localStorage.removeItem('selectedDate');
      }
      set({ selectedDate: range || null });
    },

    reset: () => {
      localStorage.removeItem('selectedDate');
      set({ selectedDate: null });
    },
  };
});