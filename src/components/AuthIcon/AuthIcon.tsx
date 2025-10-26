interface AuthIconProps {
  icon: React.ReactNode;
}

export const AuthIcon = ({ icon }: AuthIconProps) => {
  return (
    <div className="mx-auto mb-3 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-[#F3F4F6] flex items-center justify-center shadow-md">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};
