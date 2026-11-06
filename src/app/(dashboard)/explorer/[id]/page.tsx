import React from 'react';
import { INVESTIGATIONS } from '@/data/investigations';
import { StudyDetailClient } from './StudyDetailClient';

export function generateStaticParams() {
  return INVESTIGATIONS.map((inv) => ({
    id: inv.id,
  }));
}

export interface PageProps {
  params?: Promise<{ id: string }>;
}

export default function StudyDetailPage({ params }: PageProps) {
  return <StudyDetailClient params={params} />;
}
