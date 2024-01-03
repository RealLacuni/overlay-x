import React from 'react';

type ProfileSelectionProps = {
  currentProfile: string;
  setCurrentProfile: React.Dispatch<React.SetStateAction<string>>;
};

const profiles = ['default', 'profile 1', 'profile 2', 'profile 3'];
const ProfileSelection = ({ currentProfile, setCurrentProfile }: ProfileSelectionProps) => {
  return profiles.map((profile) => {
    console.log('current profile is ' + currentProfile);
    console.log(profile === currentProfile);
    
    return (
      <div
        className={
          `relative cursor-pointer flex flex-row align-middle gap-1` 
        }
        onClick={() => {
          setCurrentProfile(profile);}}
      >
        <span className={`select-none font-light ` + (currentProfile === profile ? 'text-white' : 'text-indigo-300')}>{profile.charAt(0).toUpperCase() + profile.slice(1)}</span>
        {currentProfile === profile ? (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 8"
          >
            <circle cx="4" cy="4" r="3" fill={'#ffffff'} strokeWidth={'0.5'} stroke="green" />
          </svg>
        ) : null}
      </div>
    );
  });
};

export default ProfileSelection;
