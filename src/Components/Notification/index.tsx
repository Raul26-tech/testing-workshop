import { useEffect, useState } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { api } from "../../Services/api";
import { Badge } from "../Badge";

interface IMessageNotification {
  id: string;
  url?: string;
  message: string;
}

interface INotificationProps {
  numberNotification: number;
  notifications?: IMessageNotification[];
}

export default function Notification({
  numberNotification = 1,
  notifications,
}: INotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [data, setData] = useState<INotificationProps | undefined>(undefined);

  const handleGetNotifications = async () => {
    try {
      const response = await api.get<INotificationProps>("/notifications");

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetNotifications();
  }, []);

  return (
    <>
      <div className="relative">
        <div>
          <button
            onClick={() => setShowNotification((prevState) => !prevState)}
          >
            <MdOutlineNotifications
              size={30}
              className="text-gmov-purple-100"
            />
          </button>
        </div>
        <div className="absolute -top-2 -right-2 p-3 rounded-full w-5 h-5 flex justify-center items-center">
          <Badge color="bg-red-500">
            <span>{numberNotification}</span>
          </Badge>
        </div>
      </div>
    </>
  );
}
