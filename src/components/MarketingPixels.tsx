import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const naverWcsId = process.env.NEXT_PUBLIC_NAVER_WCS_ID;

export function MarketingPixels() {
  const gtagId = gaId ?? googleAdsId;

  return (
    <>
      {gtmId ? (
        <>
          <Script
            id="gtm-loader"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              className="pixelFrame"
            />
          </noscript>
        </>
      ) : null}

      {gtagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${gaId ? `gtag('config', '${gaId}');` : ""}
                ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
              `,
            }}
          />
        </>
      ) : null}

      {metaPixelId ? (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      ) : null}

      {naverWcsId ? (
        <>
          <Script
            src="https://wcs.naver.net/wcslog.js"
            strategy="afterInteractive"
          />
          <Script
            id="naver-wcs-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function initNaverWcs() {
                  if (!window.wcs) {
                    window.setTimeout(initNaverWcs, 100);
                    return;
                  }

                  window.wcs_add = window.wcs_add || {};
                  window.wcs_add.wa = '${naverWcsId}';
                  window.wcs.inflow(window.location.hostname);
                  window.wcs_do();
                })();
              `,
            }}
          />
        </>
      ) : null}
    </>
  );
}
