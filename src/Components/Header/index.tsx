import Notification from "../Notification";

export default function Header() {
  return (
    <>
      <div className="w-full h-[5rem] flex justify-center items-center shadow-md">
        <div className="w-[70rem] p-3 flex justify-end">
          <Notification numberNotification={3} />
        </div>
      </div>
    </>
  );
}
