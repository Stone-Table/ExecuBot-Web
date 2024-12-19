import IndexPage from './[lang]/(marketing)/page';

export default function RootPage() {
  // Pass 'en' as the lang param to reuse the English version
  return <IndexPage params={{ lang: 'en' }} />;
} 