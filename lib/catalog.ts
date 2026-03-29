export type FabricColor = {
  id: string;
  name: string;
  hex: string;
};

export type PaintColor = {
  id: string;
  name: string;
  hex: string;
};

export type Mandala = {
  id: string;
  name: string;
};

export const fabricColors: FabricColor[] = [
  { id: 'arena',     name: 'Arena',     hex: '#C8AD8A' },
  { id: 'terracota', name: 'Terracota', hex: '#B85C3F' },
  { id: 'mostaza',   name: 'Mostaza',   hex: '#C9920E' },
  { id: 'salvia',    name: 'Salvia',    hex: '#6B9B72' },
  { id: 'petroleo',  name: 'Petróleo',  hex: '#2B5F6A' },
  { id: 'ciruela',   name: 'Ciruela',   hex: '#7B3F6E' },
  { id: 'rosa',      name: 'Rosa palo', hex: '#D4A5A5' },
];

export const paintColors: PaintColor[] = [
  { id: 'crudo',     name: 'Crudo',     hex: '#EFE9DC' },
  { id: 'mostaza',      name: 'Mostaza',      hex: '#B8850A' },
  { id: 'terracota', name: 'Terracota', hex: '#B85C3F' },
  { id: 'indigo',    name: 'Índigo',    hex: '#3D3B8E' },
  { id: 'carbon',    name: 'Carbón',    hex: '#3D3838' },
];

export const mandalas: Mandala[] = [
  { id: 'sol',        name: 'Flor'    },
  { id: 'loto',       name: 'Mandala' },
  { id: 'geometrico', name: 'Celta'   },
];
