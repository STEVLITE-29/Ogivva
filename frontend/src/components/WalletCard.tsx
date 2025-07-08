import DollarFrame from "./WallectCard-img/Dollar-frame.svg";
import BackgroundLines from "./WallectCard-img/Group-line.svg";
import ButtonAddicon from "./WallectCard-img/add.svg";

export default function WalletCard() {
  return (
    <div className="relative flex items-center justify-between bg-[#062B0F] rounded-lg p-6 overflow-hidden w-[74%]">
      {/* Background Lines */}
      <img
        src={BackgroundLines}
        alt="Background decoration"
        className="absolute right-0 bottom-0 w-auto h-auto z-0"
      />

      {/* Left: Icon */}
        <img src={DollarFrame} alt="Dollar Icon" className="w-20 h-20" />

      {/* Middle: Balance */}
      <div className="ml-4 flex-1 z-10">
        <div className="text-white text-lg font-medium mt-2">Wallet Balance</div>
        <div className="text-3xl font-bold text-white mt-4">₦12,500.00</div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-xs mt-1">
            Every naira here can brighten someone’s day.
          </div>

          <button className="flex items-center gap-2 bg-[#19BD42] hover:bg-[#17a63b] text-white font-medium text-sm px-6 py-3 rounded-md z-10 text-start">
            <img src={ButtonAddicon} alt="Add" className="w-4 h-4" />
            Top Up
          </button>
        </div>  
      </div>
    </div>
  );
}
