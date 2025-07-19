
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
