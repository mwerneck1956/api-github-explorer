import Document, { Html, Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               <meta name="description" content="A web apllication to explore github users, and to know more about their repostories and starred repos"/>
               <link rel="preconnect" href="https://fonts.gstatic.com"/>
               <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
               <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}