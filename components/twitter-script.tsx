'use client';

import Script from 'next/script';

export function TwitterScript() {
  return (
    <Script 
      src="https://platform.twitter.com/widgets.js" 
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-ignore
        window.twttr.ready(() => {
          // @ts-ignore
          window.twttr.widgets.load();
        });
      }}
    />
  );
} 