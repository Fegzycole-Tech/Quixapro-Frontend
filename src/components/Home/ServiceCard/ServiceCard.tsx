import type { ReactNode } from 'react';

interface IServiceCard {
  icon: ReactNode;
  title: string;
}

export const ServiceCard = ({ icon, title }: IServiceCard) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start gap-3">
      <div className="text-indigo-600">{icon}</div>
      <h3 className="text-xl font-medium text-gray-900 leading-tight">{title}</h3>
    </div>
  );
};
