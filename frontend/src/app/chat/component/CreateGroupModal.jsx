"use client";

import { memo, useState, useCallback, useMemo } from 'react';
import { 
  X, 
  ArrowLeft, 
  Users, 
  Check, 
  Search,
  UserPlus
} from 'lucide-react';

// Constants
const MODAL_STATES = {
  CREATE_GROUP: 'create_group',
  SELECT_PARTICIPANTS: 'select_participants'
};

const VALIDATION_RULES = {
  MIN_PARTICIPANTS: 2,
  MAX_GROUP_NAME: 50,
  MIN_GROUP_NAME: 1
};

// Utility functions
const validateGroupName = (name) => {
  const trimmedName = name.trim();
  return {
    isValid: trimmedName.length >= VALIDATION_RULES.MIN_GROUP_NAME && 
             trimmedName.length <= VALIDATION_RULES.MAX_GROUP_NAME,
    message: trimmedName.length === 0 
      ? 'Group name is required'
      : trimmedName.length > VALIDATION_RULES.MAX_GROUP_NAME
      ? `Group name must be ${VALIDATION_RULES.MAX_GROUP_NAME} characters or less`
      : ''
  };
};

const validateParticipants = (participants) => {
  const isValid = participants.length >= VALIDATION_RULES.MIN_PARTICIPANTS;
  const remaining = VALIDATION_RULES.MIN_PARTICIPANTS - participants.length;
  
  return {
    isValid,
    message: isValid 
      ? ''
      : `Add at least ${remaining} more participant${remaining > 1 ? 's' : ''}`
  };
};

// Sub-components
const ModalHeader = memo(({ title, subtitle, onClose, onBack, showBack = false }) => (
  <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
    <div className="flex items-center space-x-3">
      {showBack ? (
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
      ) : (
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      )}
      
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </header>
));

ModalHeader.displayName = 'ModalHeader';

const GroupInfoSection = memo(({ 
  groupName, 
  onGroupNameChange, 
  error,
  characterCount,
  maxLength 
}) => (
  <section className="p-6 bg-gray-50 border-b border-gray-200">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
        <Users className="w-8 h-8 text-white" />
      </div>
      
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Group subject"
            value={groupName}
            onChange={(e) => onGroupNameChange(e.target.value)}
            maxLength={maxLength}
            className={`
              w-full text-lg font-medium bg-transparent border-none outline-none 
              placeholder-gray-400 pb-1
              ${error ? 'text-red-600' : 'text-gray-900'}
            `}
            autoFocus
          />
          <div className="border-b-2 border-emerald-500 transform scale-x-0 transition-transform duration-200 focus-within:scale-x-100" />
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || 'Provide a group subject'}
          </div>
          <div className="text-xs text-gray-400">
            {characterCount}/{maxLength}
          </div>
        </div>
      </div>
    </div>
  </section>
));

GroupInfoSection.displayName = 'GroupInfoSection';

const SelectedParticipants = memo(({ participants, onRemoveParticipant }) => {
  if (participants.length === 0) return null;

  return (
    <section className="p-4 bg-emerald-50 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-emerald-700">
          Participants: {participants.length}
        </h3>
        <div className="text-xs text-emerald-600">
          {participants.length >= VALIDATION_RULES.MIN_PARTICIPANTS ? (
            <span className="flex items-center">
              <Check className="w-3 h-3 mr-1" />
              Ready to create
            </span>
          ) : (
            `Need ${VALIDATION_RULES.MIN_PARTICIPANTS - participants.length} more`
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
        {participants.map((participant) => (
          <ParticipantChip
            key={participant}
            name={participant}
            onRemove={() => onRemoveParticipant(participant)}
          />
        ))}
      </div>
    </section>
  );
});

SelectedParticipants.displayName = 'SelectedParticipants';

const ParticipantChip = memo(({ name, onRemove }) => (
  <div className="flex items-center bg-white rounded-full px-3 py-1.5 text-sm border border-gray-200 shadow-sm">
    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
      {name.charAt(0).toUpperCase()}
    </div>
    <span className="text-gray-700 font-medium">{name}</span>
    <button
      onClick={onRemove}
      className="ml-2 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Remove ${name}`}
    >
      <X className="w-3 h-3" />
    </button>
  </div>
));

ParticipantChip.displayName = 'ParticipantChip';

const SearchBar = memo(({ searchTerm, onSearchChange }) => (
  <div className="p-4 bg-white border-b border-gray-200">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      />
    </div>
  </div>
));

SearchBar.displayName = 'SearchBar';

const ContactsList = memo(({ 
  contacts, 
  selectedParticipants, 
  onToggleParticipant,
  searchTerm,
  emptyMessage = "No contacts available"
}) => {
  const filteredContacts = useMemo(() => {
    if (!searchTerm.trim()) return contacts;
    
    return contacts.filter(contact =>
      contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  if (filteredContacts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchTerm.trim() ? 'No contacts found' : emptyMessage}
          </p>
          {searchTerm.trim() && (
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2">
        <h3 className="text-sm font-medium text-gray-600 px-2 py-1 sticky top-0 bg-white">
          Contacts {searchTerm && `• ${filteredContacts.length} found`}
        </h3>
      </div>
      
      {filteredContacts.map((contact) => (
        <ContactItem
          key={contact}
          name={contact}
          isSelected={selectedParticipants.includes(contact)}
          onToggle={() => onToggleParticipant(contact)}
        />
      ))}
    </div>
  );
});

ContactsList.displayName = 'ContactsList';

const ContactItem = memo(({ name, isSelected, onToggle }) => (
  <div
    onClick={onToggle}
    className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors mx-2 rounded-lg"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-sm">
      {name.charAt(0).toUpperCase()}
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="font-medium text-gray-900 truncate">{name}</div>
      <div className="text-sm text-gray-500">Available</div>
    </div>
    
    <div className={`
      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
      ${isSelected 
        ? 'bg-emerald-500 border-emerald-500 scale-110' 
        : 'border-gray-300 hover:border-emerald-300'
      }
    `}>
      {isSelected && (
        <Check className="w-4 h-4 text-white" />
      )}
    </div>
  </div>
));

ContactItem.displayName = 'ContactItem';

const ActionButtons = memo(({ 
  onCancel, 
  onConfirm, 
  confirmText = "Create",
  cancelText = "Cancel",
  isConfirmDisabled = false,
  confirmVariant = "primary",
  validationMessage
}) => {
  const confirmClasses = useMemo(() => {
    const baseClasses = "flex-1 py-3 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    if (isConfirmDisabled) {
      return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed`;
    }
    
    switch (confirmVariant) {
      case 'primary':
        return `${baseClasses} bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`;
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500`;
      default:
        return `${baseClasses} bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500`;
    }
  }, [isConfirmDisabled, confirmVariant]);

  return (
    <footer className="p-4 bg-white border-t border-gray-200">
      {validationMessage && (
        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-700 text-center">{validationMessage}</p>
        </div>
      )}
      
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 px-4 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {cancelText}
        </button>
        
        <button
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          className={confirmClasses}
        >
          {confirmText}
        </button>
      </div>
    </footer>
  );
});

ActionButtons.displayName = 'ActionButtons';

// Main Component
const CreateGroupModal = memo(({
  showCreateGroup,
  setShowCreateGroup,
  groupName,
  setGroupName,
  groupMembers,
  setGroupMembers,
  allUsers = [],
  createGroup,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleClose = useCallback(() => {
    setShowCreateGroup(false);
    setSearchTerm('');
  }, [setShowCreateGroup]);

  const handleGroupNameChange = useCallback((newName) => {
    setGroupName(newName);
  }, [setGroupName]);

  const handleParticipantToggle = useCallback((user) => {
    setGroupMembers(prev =>
      prev.includes(user)
        ? prev.filter(u => u !== user)
        : [...prev, user]
    );
  }, [setGroupMembers]);

  const handleRemoveParticipant = useCallback((user) => {
    setGroupMembers(prev => prev.filter(u => u !== user));
  }, [setGroupMembers]);

  const handleCreateGroup = useCallback(() => {
    const nameValidation = validateGroupName(groupName);
    const participantsValidation = validateParticipants(groupMembers);
    
    if (nameValidation.isValid && participantsValidation.isValid) {
      createGroup();
      handleClose();
    }
  }, [groupName, groupMembers, createGroup, handleClose]);

  // Validation
  const nameValidation = useMemo(() => validateGroupName(groupName), [groupName]);
  const participantsValidation = useMemo(() => validateParticipants(groupMembers), [groupMembers]);
  const isCreateDisabled = !nameValidation.isValid || !participantsValidation.isValid;

  if (!showCreateGroup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-xl shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        
        <ModalHeader
          title="New Group"
          subtitle="Add participants"
          onClose={handleClose}
        />

        <GroupInfoSection
          groupName={groupName}
          onGroupNameChange={handleGroupNameChange}
          error={!nameValidation.isValid && groupName.length > 0 ? nameValidation.message : ''}
          characterCount={groupName.length}
          maxLength={VALIDATION_RULES.MAX_GROUP_NAME}
        />

        <SelectedParticipants
          participants={groupMembers}
          onRemoveParticipant={handleRemoveParticipant}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ContactsList
          contacts={allUsers}
          selectedParticipants={groupMembers}
          onToggleParticipant={handleParticipantToggle}
          searchTerm={searchTerm}
        />

        <ActionButtons
          onCancel={handleClose}
          onConfirm={handleCreateGroup}
          confirmText="Create Group"
          isConfirmDisabled={isCreateDisabled}
          validationMessage={!participantsValidation.isValid ? participantsValidation.message : ''}
        />
      </div>
    </div>
  );
});

CreateGroupModal.displayName = 'CreateGroupModal';

export default CreateGroupModal;
