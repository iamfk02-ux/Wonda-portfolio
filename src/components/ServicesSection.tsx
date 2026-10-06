import React from 'react';
import { WhatIDoSection } from './WhatIDoSection';

interface ServicesSectionProps {
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className = '' }) => {
  return <WhatIDoSection className={className} />;
};

export { WhatIDoSection };
