import { ProfileActive, ProfileInactive } from "../../assets/icons";

const ProfileButton = ({ currentLocation }: { currentLocation: string }) => {
  return (
    <>
      {currentLocation === "/profile" ? <ProfileActive /> : <ProfileInactive />}
    </>
  );
};

export default ProfileButton;
