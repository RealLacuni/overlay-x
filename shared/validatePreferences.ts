/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleFields, EllipseFields, Preferences, Profile, Shortcuts, RectangleFields } from "./types";

function validatePreferences(obj: any): obj is Preferences {
  try {
    if (
      obj &&
      typeof obj === 'object' &&
      typeof obj.version === 'string' &&
      typeof obj.activeProfile === 'string' &&
      isShortcuts(obj.shortcuts) &&
      isProfiles(obj.profiles)
    ) {
      return true;
    }
  } catch {
    console.log("error validating preferences");
    return false;
  }
  return false;
}

function isShortcuts(obj: any): obj is Shortcuts {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.toggleOverlay === 'string' &&
    typeof obj.openMenu === 'string'
  );
}

function isProfiles(obj: any): boolean {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (!isProfile(obj[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isProfile(obj: any): obj is Profile {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.currentShape === 'string' &&
    isShapes(obj.shapes)
  );
}

function isShapes(obj: any): boolean {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (!isShapeFields(obj[key], key)) {
        console.log("invalid shape fields for", key);  
        return false;
      }
    }
    return true;
  }
  return false;
}

function isShapeFields(obj: any, shape: string): obj is CircleFields | RectangleFields | EllipseFields {
  if (obj && typeof obj === 'object') {
    switch (shape) {
      case 'circle':
        return isCircleFields(obj);
      case 'rectangle':
        return isRectangleFields(obj);
      case 'ellipse':
        return isEllipseFields(obj);
      default:
        return false;
    }
  }
  return false;
}

function isCircleFields(obj: any): obj is CircleFields {
  const keys: Array<keyof CircleFields> = ['color', 'size', 'offset', 'opacity', 'inverse'];
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.color === 'string' &&
    typeof obj.size === 'number' &&
    typeof obj.offset === 'number' &&
    typeof obj.opacity === 'number' &&
    typeof obj.inverse === 'boolean' &&
    keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key))

  );
}

function isRectangleFields(obj: any): obj is RectangleFields {
  const keys: Array<keyof RectangleFields> = ['color', 'width', 'height', 'offset', 'opacity', 'inverse'];
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.color === 'string' &&
    typeof obj.width === 'number' &&
    typeof obj.height === 'number' &&
    typeof obj.opacity === 'number' &&
    typeof obj.offset === 'number' &&
    typeof obj.inverse === 'boolean' &&
    keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key))
  );
}

function isEllipseFields(obj: any): obj is EllipseFields {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.color === 'string' &&
    typeof obj.width === 'number' &&
    typeof obj.height === 'number' &&
    typeof obj.opacity === 'number'
  );
}

export { validatePreferences };