import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

type CurrentUser = {
  name: string;
  email: string;
  picture: string;
};

function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    name: '',
    email: '',
    picture: '',
  });
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    const user = await ipcRenderer.invoke('get-profile');
    setLoading(false);
    setCurrentUser(user);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { currentUser, loading };
}

export default useCurrentUser;
