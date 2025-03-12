export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://zoha-los-angeles.myshopify.com/products/clutchp?variant=12394621370427&utm_source=tiktok&utm_medium=paid&utm_id=__CAMPAIGN_ID__&utm_campaign=__CAMPAIGN_NAME__";
    const blackPageURL = "https://jshzuaudhsuay9231.myfunnelish.com/6c6b385e-de5b-409e-b174-68f4e7223f8f-1741107899368410-1741185517334729-1741789354488139";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
