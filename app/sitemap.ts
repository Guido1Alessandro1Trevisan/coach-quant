import type { MetadataRoute } from 'next';
import firmDataImport from '@/data/firm-questions.json';

const firmData = firmDataImport as any;



export default function sitemap(): MetadataRoute.Sitemap {

    function EncodeName(sentence: string) {
        return sentence.toLowerCase().replace(/ /g, '-');
    }
      

    const dynamicUrls = firmData.reduce((acc: any[], firm: any) => {
        acc.push({
            url: `https://www.coachquant.com/${firm.firm_name}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        });

        firm.firm_questions.forEach((question: string) => {
            const questionUrl = `https://www.coachquant.com/${firm.firm_name}/${EncodeName(question)}`;

            acc.push({
                url: questionUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            });
        });

        return acc;
    }, []);

    return [
        {
            url: 'https://www.coachquant.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://www.coachquant.com/privacy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.coachquant.com/submit',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.coachquant.com/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...dynamicUrls
    ];
}