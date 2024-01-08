import { notFound, redirect } from 'next/navigation';
import { fetchCrate, getOwners } from '@/util/crate';
import { Metadata } from 'next';

export interface Params {
  params: {
    slug: string;
  }
}

export default async function Page({
  params
}: Params) {
  const { slug } = params;

  const crate = await fetchCrate(slug);
  if (!crate) notFound();

  redirect(`https://crates.io/crates/${slug}`);
  return (<></>);
}

export async function generateMetadata({
  params
}: Params): Promise<Metadata> {
  const { slug } = params;

  const crate = await fetchCrate(slug);
  if (!crate) notFound();
  const owners = await getOwners(slug);

  return {
    title: crate.name,
    description: crate.description,
    
    openGraph: {
      title: crate.name,
      description: crate.description,
      url: `https://fxcrates.vercel.app/crates/${slug}`,
      siteName: 'fxcrates',
      locale: 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: crate.name,
      description: crate.description,
    }
  }
}