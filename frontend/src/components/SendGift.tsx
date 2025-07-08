import Gift from "./SendGift-img/gift.svg"
import GiftBox from "./SendGift-img/gift-box.svg"

export default function SendGift() {
  return (
    <div className="relative py-2 px-4 rounded-xl bg-soft-green-gradient overflow-hidden">
      {/* Text */}
      <h1 className="relative z-10 w-[22ch] text-base font-semibold leading-[20px] text-[#36334B] mx-auto">
        Got someone in mind — or want to surprise a stranger?
      </h1>

      {/* Button */}
      <button
        className="relative z-10 mt-8 flex items-center justify-center gap-2 px-14 mx-auto py-2.5 bg-[#19BD42] text-[#E8FBED] font-medium text-sm rounded-lg"
      >
        <img src={Gift} alt="Gift Icon" className="w-4 h-4" />
        <span>Send a Gift</span>
      </button>

      {/* Gift Image */}
      <img
        src={GiftBox}
        alt="gift box"
        className="absolute right-3 bottom-3 w-18 z-0"
      />
    </div>
  )
}