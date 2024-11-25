import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Sidebar from "../AdminSidebar/Sidebar";

const UserTeam = () => {
  const [levelMembers, setLevelMembers] = useState([]);
  const [activeMember, setActiveMember] = useState(true); // Status filter
  const [inputLevel, setInputLevel] = useState(1); // Selected level
  const [loading, setLoading] = useState(false); // Loading state
  const [userId, setUserId] = useState(""); // User ID input
  const [apiCalled, setApiCalled] = useState(false); // Tracks API call
  const navigate = useNavigate();

  const filterText = activeMember ? "Active Members" : "Unrecharged Members";

  // Fetch team members based on level and user ID
  const getLevelMembers = async (level, userId) => {
    if (!userId) return;
    setLoading(true);
    setApiCalled(true); // Mark API as called
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/user-team-members/${userId}/${level}`
      );
      setLevelMembers(result.data);
    } catch (error) {
      console.error("Error while fetching team members for level", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call on search button click
  const handleSearchClick = () => {
    if (userId) {
      getLevelMembers(inputLevel, userId);
    }
  };

  // Filter team members based on active/inactive status
  const filteredTeamMembers = levelMembers.filter(
    (member) => member.isActive === activeMember
  );

  // Update level when dropdown changes
  const handleLevelChange = (e) => {
    const level = parseInt(e.target.value);
    setInputLevel(level);

    // Fetch new members when level changes
    if (apiCalled) {
      getLevelMembers(level, userId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <Sidebar className="fixed w-64 h-full bg-white shadow-lg" />

      <div className="py-10 pb-32 px-4 sm:w-2/5 bg-[#1d3347] min-h-screen text-white mx-auto">
        <button
          className="text-lg mb-4"
          onClick={() => {
            navigate(-1);
          }}
        >
          🔙
        </button>
        <h1 className="font-serif text-2xl mb-16 text-center">My All Team</h1>

        {/* User ID input field */}
        <div className="mb-8">
          <label
            htmlFor="userIdInput"
            className="block text-left text-white font-bold text-xl mb-2"
          >
            Enter User ID
          </label>
          <input
            id="userIdInput"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full p-3 text-xl border-2 border-[#0d355b] text-black rounded-xl"
          />
        </div>

        {/* Search Button */}
        <div className="mb-8">
          <button
            onClick={handleSearchClick}
            className="w-full p-3 text-xl bg-blue-600 text-white rounded-xl"
          >
            Search
          </button>
        </div>

        {/* Status Selector */}
        <div className="mb-8">
          <label
            htmlFor="statusInput"
            className="block text-left text-white font-bold text-xl mb-2"
          >
            Status
          </label>
          <select
            id="statusInput"
            value={activeMember ? "active" : "unrecharged"}
            onChange={(e) => setActiveMember(e.target.value === "active")}
            className="w-full p-3 text-xl border-2 border-[#0d355b] text-black rounded-xl"
          >
            <option value="active">Active Members</option>
            <option value="unrecharged">Unrecharged Members</option>
          </select>
        </div>

        {/* Level Selector */}
        <div className="mb-8">
          <label
            htmlFor="levelInput"
            className="block text-left text-white font-bold text-xl mb-2"
          >
            Select Level (1-50)
          </label>
          <select
            id="levelInput"
            value={inputLevel}
            onChange={handleLevelChange}
            className="w-full p-3 text-xl border-2 border-black text-black rounded-xl text-center"
          >
            {Array.from({ length: 50 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Level {index + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Display Results */}
        {apiCalled && (
          <>
            <div className="py-2 px-4 w-[80%] mx-auto rounded-lg flex flex-col justify-center items-center border border-[#0d355b] text-xl font-semibold text-gray-500">
              <h2>Total Members: {levelMembers.length}</h2>
              <h2 className="text-center">
                {filterText}: {filteredTeamMembers.length}
              </h2>
            </div>

            {loading && (
              <div className="flex justify-center items-center mt-8">
                <p className="text-xl font-semibold text-gray-500">Loading...</p>
              </div>
            )}

            {!loading && filteredTeamMembers.length === 0 && (
              <div className="text-center mt-8 text-xl font-semibold text-gray-500">
                No users in this level.
              </div>
            )}

            {!loading && filteredTeamMembers.length > 0 && (
              <div className="mt-8">
                <div className="overflow-x-auto bg-yellow-600 p-2 rounded-lg">
                  <table className="w-full table-fixed font-medium bg-yellow-600 text-white">
                    <thead>
                      <tr className="text-center font-medium text-sm text-white p-2">
                        <th className="w-20 whitespace-nowrap p-2">Sr No.</th>
                        <th className="w-32 whitespace-nowrap p-2">
                          Direct Sponsor
                        </th>
                        <th className="w-32 whitespace-nowrap p-2">Package</th>
                        <th className="w-32 whitespace-nowrap p-2">Team Size</th>
                        <th className="w-32 whitespace-nowrap p-2">
                          Team Business
                        </th>
                        <th className="w-32 whitespace-nowrap p-2">
                          Registered At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeamMembers.map((member, index) => (
                        <tr
                          className="border-b border-gray-400 text-white text-center"
                          key={member._id}
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{member?.referralCode}</td>
                          <td className="p-2">$ {member?.rechargeWallet}</td>
                          <td className="p-2">{member?.teamSize?.length || 0}</td>
                          <td className="p-2">$ {member?.teamBusiness || 0}</td>
                          <td className="p-2">
                            {moment(member.createdAt).format("YYYY-MM-DD")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserTeam;
