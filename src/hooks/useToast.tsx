import Notification from "rc-notification";

interface UseToastProps {
  style: string;
  maxCount: number;
}

function useToast({ style, maxCount }: UseToastProps) {
  let toast;

  Notification.newInstance({}, (notification) => {
    toast = notification;
  });

  return { toast };
}

export default useToast;
