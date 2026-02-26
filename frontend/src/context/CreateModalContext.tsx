import { createContext, useContext, useState, ReactNode } from 'react';

interface CreateModalContextType {
  showCreateMenuModal: boolean;
  setShowCreateMenuModal: (show: boolean) => void;
  showCreateItemModal: boolean;
  setShowCreateItemModal: (show: boolean) => void;
}

const CreateModalContext = createContext<CreateModalContextType | undefined>(undefined);

export const CreateModalProvider = ({ children }: { children: ReactNode }) => {
  const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);

  return (
    <CreateModalContext.Provider
      value={{
        showCreateMenuModal,
        setShowCreateMenuModal,
        showCreateItemModal,
        setShowCreateItemModal,
      }}
    >
      {children}
    </CreateModalContext.Provider>
  );
};

export const useCreateModal = () => {
  const context = useContext(CreateModalContext);
  if (!context) {
    throw new Error('useCreateModal must be used within CreateModalProvider');
  }
  return context;
};
