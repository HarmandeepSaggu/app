export default function CreateGroupModal({
  groupName,
  setGroupName,
  groupMembers,
  setGroupMembers,
  allUsers,
  createGroup,
  setShowCreateGroup,
}) {
  const handleUserToggle = (user) => {
    setGroupMembers((prev) =>
      prev.includes(user) 
        ? prev.filter((u) => u !== user) 
        : [...prev, user]
    );
  };

  const isCreateDisabled = !groupName.trim() || groupMembers.length < 2;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-md sm:rounded-t-xl rounded-t-3xl sm:rounded-b-xl shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateGroup(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-medium text-gray-900">New group</h2>
              <p className="text-sm text-gray-500">Add participants</p>
            </div>
          </div>
        </div>

        {/* Group Info Section */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Group subject"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full text-lg font-medium bg-transparent border-none outline-none placeholder-gray-400"
                maxLength={25}
              />
              <div className="text-xs text-gray-500 mt-1">
                Provide a group subject
              </div>
            </div>
          </div>
        </div>

        {/* Selected Members */}
        {groupMembers.length > 0 && (
          <div className="p-4 bg-blue-50 border-b border-gray-100">
            <div className="text-sm text-blue-600 font-medium mb-2">
              Participants: {groupMembers.length}
            </div>
            <div className="flex flex-wrap gap-2">
              {groupMembers.map((member) => (
                <div
                  key={member}
                  className="flex items-center bg-white rounded-full px-3 py-1 text-sm border"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
                    {member.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700">{member}</span>
                  <button
                    onClick={() => handleUserToggle(member)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-700">Contacts</div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[300px]"> {/* Added max-height for scrolling */}
            {allUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-sm">No contacts available</div>
              </div>
            ) : (
              <div>
                {allUsers.map((user) => {
                  const isSelected = groupMembers.includes(user);
                  return (
                    <div
                      key={user}
                      onClick={() => handleUserToggle(user)}
                      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium mr-4">
                        {user.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{user}</div>
                        <div className="text-sm text-gray-500">Available</div>
                      </div>
                      
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100">
          <button
            onClick={createGroup}
            disabled={isCreateDisabled}
            className={`w-full py-3 rounded-full font-medium text-center transition-all ${
              isCreateDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
            }`}
          >
            {isCreateDisabled 
              ? `Add at least ${2 - groupMembers.length} more participant${2 - groupMembers.length > 1 ? 's' : ''}`
              : 'Create'
            }
          </button>
        </div>
      </div>
    </div>
  );
}
