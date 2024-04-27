import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Character, robots, and OG image */}
        <meta charSet='UTF-8' />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta property='og:locale' content='en_US' />
        <meta name='author' content='Alamin Shaikh' />
        <meta property='og:image:width' content='920' />
        <meta property='og:image:height' content='470' />
        <meta name='twitter:card' content='summary_large_image' />
 
        <title>Tax Homie</title>
        <meta
          property='og:site_name'
          content='Developing Superior Software for Leading Businesses'
        />
        <meta
          name='keywords'
          content='JavaScript developer, TypeScript developer, Web developer'
        />
        

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
