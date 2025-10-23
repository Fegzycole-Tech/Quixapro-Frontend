import bgImage from '../../../assets/QuickBillBg.jpg';

export const Background = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0f]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'auto 120%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 10, 15, 0.8), rgba(10, 10, 15, 0.8)),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.015) 2px,
              rgba(255, 255, 255, 0.015) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.015) 2px,
              rgba(255, 255, 255, 0.015) 4px
            )
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, transparent 50%, rgba(219, 39, 119, 0.1) 100%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
};
