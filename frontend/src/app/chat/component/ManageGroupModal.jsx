export default function ManageGroupModal({
  receiver,
  allUsers,
  activeGroupMembers,
  activeGroupAdmins,
  username,
  addMember,
  removeMember,
  assignAdmin,
  removeAdmin,
  setShowManageGroup,
}) {
  const availableUsers = allUsers.filter((user) => !activeGroupMembers.includes(user));
  const isCurrentUserAdmin = activeGroupAdmins.includes(username);

  const getUserRole = (member) => {
    if (activeGroupAdmins.includes(member)) {
      return member === username ? "You (Admin)" : "Admin";
    }
    return member === username ? "You" : "";
  };

  const canManageMember = (member) => {
    return member !== username && isCurrentUserAdmin;
  };

  const MemberItem = ({ member, isInAddSection = false }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {member.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-gray-900">{member}</div>
          {!isInAddSection && (
            <div className="text-xs text-gray-500">{getUserRole(member)}</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isInAddSection ? (
          <button
            onClick={() => addMember(member)}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center space-x-1">
            {/* Admin Management */}
            {canManageMember(member) && (
              <>
                {activeGroupAdmins.includes(member) ? (
                  <button
                    onClick={() => removeAdmin(member)}
                    className="px-2 py-1 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded border border-orange-200 transition-colors"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => assignAdmin(member)}
                    className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                  >
                    Make Admin
                  </button>
                )}
                
                {/* Remove Member */}
                <button
                  onClick={() => removeMember(member)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Remove member"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
 <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Group Settings</h2>
              <p className="text-sm text-gray-600 mt-1">{receiver}</p>
            </div>
            <button
              onClick={() => setShowManageGroup(false)}
              className="p-2 hover:bg-white/60 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Add Members Section */}
          {availableUsers.length > 0 && isCurrentUserAdmin && (
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Add Members</h3>
                <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {availableUsers.length} available
                </div>
              </div>
              
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {availableUsers.map((user) => (
                  <MemberItem key={user} member={user} isInAddSection={true} />
                ))}
              </div>
            </div>
          )}

          {/* Current Members Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Members</h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {activeGroupMembers.length} member{activeGroupMembers.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {activeGroupMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">No members in this group</p>
                </div>
              ) : (
                activeGroupMembers.map((member) => (
                  <MemberItem key={member} member={member} />
                ))
              )}
            </div>
          </div>

          {/* Admin Info */}
          {!isCurrentUserAdmin && (
            <div className="px-6 pb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center text-amber-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">
                    Only group admins can manage members
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => setShowManageGroup(false)}
            className="w-full py-2.5 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}