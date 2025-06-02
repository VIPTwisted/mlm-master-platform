import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MLM Master Platform - Transform Your Life with Proven Success',
  description: 'Join thousands of successful entrepreneurs with our comprehensive MLM platform. Get training, tools, and support to build your thriving business.',
  keywords: 'MLM, network marketing, business opportunity, financial freedom, entrepreneur, success',
  authors: [{ name: 'MLM Master Platform' }],
  openGraph: {
    title: 'MLM Master Platform - Transform Your Life with Proven Success',
    description: 'Join thousands of successful entrepreneurs with our comprehensive MLM platform.',
    url: 'https://mlmmaster.com',
    siteName: 'MLM Master Platform',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'MLM Master Platform - Success Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MLM Master Platform - Transform Your Life with Proven Success',
    description: 'Join thousands of successful entrepreneurs with our comprehensive MLM platform.',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Analytics Scripts - Replace with your actual IDs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'G-XXXXXXXXXX', 'auto');
              ga('send', 'pageview');

              // Facebook Pixel
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '123456789');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=123456789&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  )
}
