'use client';

import { useTranslation } from 'react-i18next';

export default function ExampleClientComponent() {
  const { t } = useTranslation();

  return <div dangerouslySetInnerHTML={{ __html: t('home-info-text-html') }} />
}