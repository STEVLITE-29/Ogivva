import { useState } from "react";
import SideNavbar from "../components/SideNavbar";
import TopNavbar from "../components/TopNavbar";
import WalletCard from "../components/WalletCard";
import GiftHistoryTable from "../components/GiftHistoryTable";
import GiftsContent from "../components/GiftContent";
import MomentsContent from "../components/MomentsContent";
import SendGift from "../components/SendGift";


export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <SideNavbar onSelect={setSelectedSection} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="py-5 px-4 space-y-6">
          {selectedSection === "Dashboard" && (
            <div>
              <div className="flex justify-between mb-10 mx-auto w-full max-h-[150px]">
                <WalletCard />
                <SendGift />
              </div>

              <GiftHistoryTable />
            </div>
          )}
          {selectedSection === "Gifts" && <GiftsContent />}
          {selectedSection === "Moments" && <MomentsContent />}
          {/* Add more sections here */}
        </main>
      </div>
    </div>
  );
}