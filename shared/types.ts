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

type ShapeType = 'circle' | 'rectangle' | 'ellipse'; // Define shape types
type ShapeFields = CircleFields | RectangleFields | EllipseFields; // Define shape fields

type CircleFields = {
  color: string;
  size: number;
  offset: number;
  opacity: number;
  inverse: boolean;
}

// example shapes to be implemented later
type RectangleFields = {
  color: string;
  width: number;
  height: number;
  offset: number;
  opacity: number;
  inverse: boolean;
}

type EllipseFields = {
  color: string;
  width: number;
  height: number;
  opacity: number;                                                                                                                                                                                                 
}


export type { Preferences, Profile, ShapeType, ShapeFields, CircleFields, RectangleFields, EllipseFields, Shortcuts };