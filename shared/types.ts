type Preferences = {
  version: string;
  activeProfile: string;
  profiles: Record<string, Profile>;
  shortcuts: Shortcuts;
}

type Shortcuts = {
  toggleOverlay: string;
  openMenu: string;
}

type Profile = {
  shape: ShapeType;
  shapeInputs: ShapeFields;
}

type ShapeType = 'circle' | 'square' | 'ellipse'; // Define shape types
type ShapeFields = CircleFields | SquareFields | EllipseFields; // Define shape fields

type CircleFields = {
  color: string;
  thickness: number;
  offset: number;
  opacity: number;
  inverse: boolean;
}

// example shapes to be implemented later
type SquareFields = {
  color: string;
  width: number;
  height: number;
  opacity: number;
}

type EllipseFields = {
  color: string;
  width: number;
  height: number;
  opacity: number;                                                                                                                                                                                                 
}


export type { Preferences, Profile, ShapeType, ShapeFields, CircleFields, SquareFields, EllipseFields, Shortcuts };