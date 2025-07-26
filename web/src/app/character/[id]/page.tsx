import { Metadata } from 'next';
import { disneyApi } from '@/lib/api-client';
import { CharacterDetailClient } from './character-detail-client';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const character = await disneyApi.getCharacterById(parseInt(params.id));
    
    if (!character || !character.name) {
      return {
        title: 'Disney Character - Disney API Explorer',
        description: 'Disney character not found',
      };
    }
    
    const title = `${character.name} - Disney API Explorer`;
    const description = `Explore ${character.name}, a Disney character. View films, TV shows, games, and more information about this beloved character.`;
    const imageUrl = character.imageUrl;
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://disney-api-explorer.vercel.app'}/character/${character._id}`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'Disney API Explorer',
        images: [
          {
            url: imageUrl,
            width: 600,
            height: 800,
            alt: character.name,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    return {
      title: 'Disney Character - Disney API Explorer',
      description: 'Explore Disney characters using the Disney API',
    };
  }
}

export default function CharacterDetailPage({ params }: PageProps) {
  return <CharacterDetailClient characterId={params.id} />;
}

