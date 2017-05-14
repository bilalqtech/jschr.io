import * as React from 'react'

import { SSR } from '../ssr'

export interface TemplateProps {
  css: string
  js: string[]
  body: string
  ssr: SSR
  enableGoogleAnalytics: boolean
  trackingId: string
  enableDevServer: boolean
}

export default function Template(props: TemplateProps) {
  const { title, description } = props.ssr.props

  return (
    <html lang='en' data-timestamp={(new Date()).toISOString()}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link rel='shortcut icon' href={require('../assets/favicon.png')} />
        <title>{`${title} | ${description}`}</title>
        <style>{props.css}</style>
      </head>
      <body>
        <div id='react-root' dangerouslySetInnerHTML={{ __html: props.body }} />
        <script dangerouslySetInnerHTML={{ __html: `window.ssr = ${JSON.stringify(props.ssr)}` }} />
        { props.js.map((src) => <script src={src} />) }
        { props.enableGoogleAnalytics && props.trackingId &&
          <script dangerouslySetInnerHTML={{ __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', '${props.trackingId}', 'auto');
            ga('send', 'pageview');
          ` }} />
        }
        { props.enableDevServer &&
          <script src='http://localhost:8080/webpack-dev-server.js'></script>
        }
      </body>
    </html>
  )
}
