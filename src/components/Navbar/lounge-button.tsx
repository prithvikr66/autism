import { LoungeActiveSVG, LoungeInactiveSVG } from "../../assets/icons";

const LoungeButton = ({ currentLocation }: { currentLocation: string }) => {
  return (
    <>
      {currentLocation === "/lounge" ? (
        <LoungeActiveSVG />
      ) : (
        <LoungeInactiveSVG />
      )}
    </>
  );
};

export default LoungeButton;
