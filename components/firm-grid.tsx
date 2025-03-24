import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link';

const cards = [
  {
    firm: "Jane Street",
    logo: "/images/logos/janestreet.png",
    questions: 100,
    link: "/jane-street"
  },
  {
    firm: "Citadel",
    logo: "/images/logos/citadel.svg",
    questions: 116,
    link: "/citadel"
  },
  {
    firm: "Optiver",
    logo: "/images/logos/optiver.svg",
    questions: 88,
    link: "/optiver"
  },
  {
    firm: "SIG",
    logo: "/images/logos/sig.jpg",
    questions: 60,
    link: "/sig"
  },
  {
    firm: "Two Sigma",
    logo: "/images/logos/twosigma.svg",
    questions: 52,
    link: "/two-sigma"
  },
  {
    firm: "Goldman Sachs",
    logo: "/images/logos/goldman.jpg",
    questions: 52,
    link: "/goldman-sachs"
  },
  {
    firm: "Hudson River Trading",
    logo: "/images/logos/hudson.svg",
    questions: 27,
    link: "/hudson-river-trading"
  },
  {
    firm: "DRW",
    logo: "/images/logos/drw.svg",
    questions: 20,
    link: "/drw"
  },
  {
    firm: "Akuna Capital",
    logo: "/images/logos/akuna.png",
    questions: 39,
    link: "/akuna-capital"
  },
  {
    firm: "IMC",
    logo: "/images/logos/imc.jpeg",
    questions: 31,
    link: "/imc"
  },
  {
    firm: "Worldquant",
    logo: "/images/logos/worldquant.jpg",
    questions: 32,
    link: "/worldquant"
  },
  {
    firm: "Squarepoint Capital",
    logo: "/images/logos/squarepoint.svg",
    questions: 43,
    link: "/squarepoint-capital"
  },
  {
    firm: "Transmarket Group",
    logo: "/images/logos/trans.gif",
    questions: 34,
    link: "/transmarket-group"
  },
  {
    firm: "Belvedere Trading",
    logo: "/images/logos/belvedere.png",
    questions: 32,
    link: "/belvedere-trading"
  },
  {
    firm: "Five Rings",
    logo: "/images/logos/fiverings.jpeg",
    questions: 58,
    link: "/five-rings"
  },
  {
    firm: "Old Mission",
    logo: "/images/logos/oldmission.png",
    questions: 28,
    link: "/old-mission"
  }
];

export default function FirmGrid() {
  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              href={`${card.link}`}
              key={index} // Move the key prop here
            >
              <Card 
                className="max-w-sm mx-auto w-full h-48 bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-8 h-full flex items-center">
                  <Image 
                    src={card.logo}
                    alt={`${card.firm} logo`}
                    width={100}
                    height={100}
                    className={`object-contain mr-8`}
                    priority={index < 6}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-black mb-2 font-sans">{card.firm}</h3>
                    <p className="text-base text-gray-500 font-sans">{card.questions} questions</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

