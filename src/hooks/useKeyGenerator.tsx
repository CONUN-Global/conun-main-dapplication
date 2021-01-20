import { ipcRenderer } from 'electron';
import { useState } from 'react';

import { PRIVATE_KEY_TOKEN, PUBLIC_KEY_TOKEN } from '../const';

function setKeys(privateKey: string, publicKey: string) {
  localStorage.setItem(PUBLIC_KEY_TOKEN, publicKey);
  localStorage.setItem(PRIVATE_KEY_TOKEN, privateKey);
}

function useKeyGenerator() {
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    try {
      setIsLoading(true);
      const keys = await ipcRenderer.invoke('generate-api-private-key');
      setIsLoading(false);
      setKeys(keys?.privateKey, keys?.publicKey);
      return keys;
    } catch (error) {
      // todo: handle error
      return error;
    }
  };

  return { generate, isLoading };
}

export default useKeyGenerator;
