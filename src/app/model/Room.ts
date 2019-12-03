export class Room {
  id: number;
  name: string;
  location: string;
  capacities = new Array<LayoutCapacity>();
}

// Class : LayoutCapacity
export class LayoutCapacity {
  layout: Layout;
  capacity: number;
}

// Enum: Layout
export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}
