export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://www.zazzle.com/pd/spp/pt-zazzle_shirt?color=white&groups=%7Btoddlers%7D&size=2t&style=lat_toddler_tshirt_3321&subgroups=%7Btshirts%7D&design.shade=light&feature=%7Bbasic%7D&tags=%7Bshowswhite%2Ccompliancelabel%7D";
    const blackPageURL = "https://glstrck.com/aff_c?offer_id=250&aff_id=27260";
  
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
