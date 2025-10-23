import invoiceImg from '../../../assets/invoice.svg';
import editTableImg from '../../../assets/edit-table.svg';
import sentImg from '../../../assets/sent.svg';
import briefcaseImg from '../../../assets/briefcase.svg';
import { ServiceCard } from '../ServiceCard/ServiceCard';

export const ServicesSection = () => {
  const services = [
    {
      icon: <img src={invoiceImg} />,
      title: 'Easy Invoice Creation',
    },
    {
      icon: <img src={editTableImg} />,
      title: 'Centralized Invoice Management',
    },
    {
      icon: <img src={sentImg} />,
      title: 'Instant Export & Sharing',
    },
    {
      icon: <img src={briefcaseImg} />,
      title: 'Multiple Business Profile',
    },
  ];

  return (
    <section className="relative py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold text-white mb-6">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
