type Preferences = {
    version: string;
    profiles: Profile[];
  }

type Profile = {
    shape: string;
    color: string;
    thickness: number | null;
    offset: number | null;
    opacity: number | null;
}



export type { Preferences };