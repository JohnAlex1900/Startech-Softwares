
import React from 'react';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Tech {
  name: string;
  icon: React.ReactNode;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  bestFor: string;
  includes: string[];
  valueDelivered: string;
  expected30DayOutcome: string;
  positioningLine?: string;
  highlighted: boolean;
}

export interface OneTimeSetup {
  name: string;
  price: string;
  description: string;
}
