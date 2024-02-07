import React from 'react';

type ProfileSelectionProps = {
  currentProfile: string;
  setCurrentProfile: (profile : string) => void;
};

const profiles = ['default', 'profile 1', 'profile 2', 'profile 3'];
const ProfileSelection = ({ currentProfile, setCurrentProfile }: ProfileSelectionProps) => {
  return profiles.map((profile) => {

    return (
      <div
        className={
          `relative cursor-pointer flex flex-row align-middle gap-1 w-40 justify-center` 
        }
        onClick={() => {
          setCurrentProfile(profile);}}
      >
        <span className={`select-none hover:text-indigo-50 ` + (currentProfile === profile ? 'text-white font-semibold' : 'text-indigo-300')}>{profile.charAt(0).toUpperCase() + profile.slice(1)}</span>
      </div>
    );
  });
};

export default ProfileSelection;
