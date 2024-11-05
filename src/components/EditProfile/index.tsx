import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SolanaSVG } from "../Profile/icons";
import GreenButton from "../Buttons/GreenButton";
import WhiteButton from "../Buttons/WhiteButton";
import { CancelSVG, SaveSVG } from "./icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import DegenLogo from "../../assets/degen-logo.svg";
import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

const EditProfile = () => {
  const { walletAddress } = useParams();
  const [newUsername, setNewUsername] = useState<string>("");
  const [newProfilePic, setNewProfilePic] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [, setImageSizeError] = useState(false);
  const [, setSuccessMessage] = useState("");

 

  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username) {
      setNewUsername(user.username);
    }
  }, [user.username]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setImageSizeError(true);
      return;
    }

    // if (!file.type.startsWith("image/")) {
    //   setError("Please select an image file");
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = () => {
      setNewProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {     
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // setError("");
    setSuccessMessage("");

    try {
      if (newUsername && newUsername !== user.username) {
        console.log("here");
        const usernameResponse = await axios.post(
          "https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/",
          {
            method: "update_username",
            username: newUsername.trim(),
            walletAddress,
          }
        );
        console.log(usernameResponse);

        if (usernameResponse.data.error) {
          throw new Error(usernameResponse.data.message);
        }
      }

      if (newProfilePic) {
        const base64String = newProfilePic.split(",")[1];
        const profilePicResponse = await axios.post(
          "https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/",
          {
            method: "update_profile_pic",
            walletAddress,
            pfpBase64: base64String,
          }
        );

        if (profilePicResponse.data.error) {
          throw new Error(profilePicResponse.data.message);
        }
      }

      setUser((prev) => ({
        ...prev,
        username: newUsername,
        profilePic: newProfilePic || prev.profilePic,
      }));

      setSuccessMessage("Profile updated successfully!");

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      // setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-[20px] sm:mt-[40px]">
      <div className="">
        <div className="relative w-[90vw] sm:w-[50vw] max-w-md mx-auto">
          <div
            className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full bg-black"
            style={{ zIndex: -1 }}
          ></div>
          <div className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px]">
            {/* Wallet Address Section */}
            <div className="rounded-[16px] border-[4px] border-[#4EAB5E] flex items-center gap-[10px] w-[95%] mx-auto p-[10px]">
              <SolanaSVG color="#3d3d3d" />
              <p className="uppercase font-sofia-bold text-[16px] text-[#3d3d3d] flex items-center gap-[10px]">
                {walletAddress?.slice(0, 4)}....{walletAddress?.slice(-4)}{" "}
                <span className="text-[12px] font-sofia-regular font-black lowercase">
                  (connected)
                </span>
              </p>
            </div>

            {/* Profile Picture Section */}
            <div className="mt-[20px] flex items-center gap-[20px]">
              <div className="h-[70px] w-[70px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={
                    newProfilePic
                      ? newProfilePic
                      : user.profilePic
                      ? user.profilePic
                      : DegenLogo
                  }
                  className="w-full h-full object-cover object-center cursor-pointer"
                  onClick={handleClick}
                  alt="Profile"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <p className="uppercase font-sofia-bold text-[20px] text-[#3d3d3d]">
                  {user.username}
                </p>
                <p className="font-sofia-regular text-[16px] font-black text-[#8F95B2]">
                  Image/gif less than 10 MB
                </p>
              </div>
            </div>

            {/* Username Input Section */}
            <div className="mt-[20px]">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full text-[20px] text-[#3d3d3d] placeholder-[#8F95B2] uppercase font-sofia-bold focus:outline-none py-1"
              />
              <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[px] mb-[15px]" />
            </div>

            {/* Error and Success Messages */}
            {/* {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}
            {/* {successMessage && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )} */}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <WhiteButton onclick={() => navigate(-1)}>
                <CancelSVG />
                Cancel
              </WhiteButton>
              <GreenButton
                onclick={handleSave}
                disabled={
                  (!newProfilePic && newUsername === user.username) || isLoading
                }
              >
                {isLoading ? (
                  // <Loader2 className="h-4 w-4 animate-spin" />
                  <p>loading</p>
                ) : (
                  <>
                    <SaveSVG />
                    Save
                  </>
                )}
              </GreenButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;