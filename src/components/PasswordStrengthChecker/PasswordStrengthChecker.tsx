import { CheckCircle2, XCircle } from 'lucide-react';

interface PasswordStrengthCheckerProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    label: 'At least 1 uppercase',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'At least 1 number',
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
];

export const PasswordStrengthChecker = ({ password }: PasswordStrengthCheckerProps) => {
  const passedRequirements = requirements.filter((req) => req.test(password)).length;

  const getPasswordStrength = () => {
    if (passedRequirements <= 1) return { label: 'Weak password', color: 'bg-destructive' };
    if (passedRequirements === 2) return { label: 'Medium password', color: 'bg-yellow-500' };
    return { label: 'Strong password', color: 'bg-green-600' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="space-y-2">
      <div className="flex gap-2 w-full">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              index < passedRequirements ? strength.color : 'bg-progress-empty'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-text-secondary">
        {strength.label}; Must contain at least:
      </p>
      <div className="space-y-1.5">
        {requirements.map((requirement, index) => {
          const passed = requirement.test(password);
          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              {passed ? (
                <CheckCircle2 size={14} className="text-[#38C793] shrink-0" />
              ) : (
                <XCircle size={14} className="text-text-secondary shrink-0" />
              )}
              <span className="text-text-secondary">
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
