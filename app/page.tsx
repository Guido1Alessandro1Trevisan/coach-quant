import QuestionBanksGrid from '@/components/firm-grid'
import FirmGrid from '@/components/firm-grid'
import type { Metadata } from 'next'
import QuestionsNum from '@/components/react-countup'



export const metadata: Metadata = {
  metadataBase: new URL('https://www.coachquant.com/'),
  title: 'Coach Quant: Quant Interview Questions',
  description: 'Practice solving probability, statistics, and brainteaser questions to prepare for Your quantitative finance Interview at Quant Firms like Jane Street, Two Sigma, and Citadel',
  alternates: {
    canonical: '/',
  }
}


export default async function Page() {

  return (
    <main className="min-h-screen w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    

      <h1 className="flex items-center justify-center text-4xl font-bold mt-7 mb-4 gap-2 flex-wrap w-full">
        <QuestionsNum />
        <span>Quant</span>
        
        <span>Interview</span> 

        <span>Questions</span>
      </h1>

        <h2 className="text-center lg:text-2xl font-light mt-2">Prepare for your next technical interview.</h2>
        <div
          style={{ opacity: 1, transform: 'translateY(0px)' }}
          className="my-2 flex flex-row items-center justify-center mt-6"
        >
          <div className="mr-4 text-lg text-slate-700 ">Share with Friends</div>
          <a
            className="mx-2 h-6 w-6"
            href="https://twitter.com/intent/tweet?text=Practice%20Quant%20Interview%20Questions%20on%20CoachQuant%0Ahttps://coachquant.com"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              ></path>
            </svg>
          </a>
          <a
            className="mx-2 h-5 w-5"
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://coachquant.com"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
              ></path>
            </svg>
          </a>
          <a
            className="mx-2 h-6 w-6"
            href="https://www.facebook.com/sharer/sharer.php?u=https://coachquant.com/"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
              <path
                d="M48,7H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h17V38h-6v-7h6v-5c0-7,4-11,10-11c3.133,0,5,1,5,1v6h-4 c-2.86,0-4,2.093-4,4v5h7l-1,7h-6v17h8c4.418,0,8-3.582,8-8V15C56,10.582,52.418,7,48,7z"
              ></path>
            </svg>
          </a>
          <a
            className="mx-2 h-7 w-7"
            href="mailto:?to=&subject=CoachQuant - Quant Interview Questions&body=coachquant.com"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="mt-0.5 fill-cream"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
            </svg>
          </a>
        </div>
        <FirmGrid/>

    </main>
  )
}

