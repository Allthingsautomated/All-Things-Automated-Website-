// Cloudflare Pages Function — Image Display Route
// Handles /images/img-:id and displays the image from dashboard localStorage

export async function onRequest(context) {
  const idParam = context.params.id;

  // Extract numeric ID from "img-123" format
  let imageId = null;
  if (idParam && idParam.startsWith('img-')) {
    imageId = parseInt(idParam.substring(4), 10);
  }

  if (!imageId || isNaN(imageId)) {
    return new Response(
      '<html><body><p>Invalid image ID format. Use /images/img-1, /images/img-2, etc.</p></body></html>',
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  // Return HTML page that retrieves and displays image from localStorage
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Image - All Things Automated</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
    .container { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); max-width: 700px; width: 100%; }
    img { width: 100%; height: auto; border-radius: 8px; margin: 20px 0; display: block; }
    h1 { color: #333; margin-bottom: 10px; font-size: 20px; }
    .info { background: #f8f9fa; border-left: 4px solid #2980B9; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 13px; color: #555; }
    .info strong { color: #333; }
    .info div { margin: 8px 0; }
    .error { background: #fff5f5; border-left: 4px solid #e74c3c; padding: 15px; color: #c0392b; border-radius: 4px; }
    .footer { font-size: 12px; color: #888; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; color: #d63384; }
    .copy-btn { background: #2980B9; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; margin-top: 10px; }
    .copy-btn:hover { background: #2980B9; opacity: 0.9; }
    .copy-btn.copied { background: #27ae60; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Image</h1>
    <div id="content">
      <p style="text-align: center; color: #666;">Loading image from your dashboard...</p>
    </div>
  </div>

  <script>
    const imageId = ${imageId};

    function displayError(msg) {
      document.getElementById('content').innerHTML = '<p class="error"><strong>⚠️ ' + msg + '</strong></p><p style="margin-top: 10px; font-size: 13px; color: #666;">Make sure you\'ve uploaded this image in the <a href="/admin/dashboard.html" style="color: #2980B9;">dashboard</a>.</p>';
    }

    function displayImage(img) {
      const uploadDate = new Date(img.uploaded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      document.getElementById('content').innerHTML = '<img src="' + img.data + '" alt="' + img.name + '" />' +
        '<div class="info">' +
        '<div><strong>Filename:</strong> ' + img.name + '</div>' +
        '<div><strong>Category:</strong> ' + (img.category || 'Unassigned') + '</div>' +
        '<div><strong>Uploaded:</strong> ' + uploadDate + '</div>' +
        '</div>' +
        '<div style="background: #f0f7ff; padding: 12px; border-radius: 4px; font-size: 12px;">' +
        '<strong>📋 Quick Copy:</strong> The short URL is:<br/><code style="display: block; padding: 8px; margin: 8px 0; background: white; border: 1px solid #ddd;">/images/img-' + imageId + '</code>' +
        '<button class="copy-btn" onclick="copyUrl()">Copy URL to Clipboard</button>' +
        '</div>' +
        '<div class="footer">💡 <strong>How to use:</strong> Copy the URL above and paste it in your website HTML or use it anywhere you need an image link. Right-click the image to download it.</div>';
    }

    window.copyUrl = function() {
      const url = '/images/img-' + imageId;
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy URL to Clipboard';
          btn.classList.remove('copied');
        }, 2000);
      });
    };

    try {
      const images = JSON.parse(localStorage.getItem('ata_images')) || [];
      const img = images.find(i => i.id === imageId);
      if (img) {
        displayImage(img);
      } else {
        displayError('Image #' + imageId + ' not found in dashboard.');
      }
    } catch (e) {
      displayError('Error loading image: ' + e.message);
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
