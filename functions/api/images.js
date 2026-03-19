// Cloudflare Pages Function — Images API
// Serves images uploaded in the dashboard by ID
// Returns image data as HTML page that displays the image

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// GET /api/images/:id — retrieve image by ID
export async function onRequestGet(context) {
  try {
    const imageId = context.params.id;
    if (!imageId) {
      return new Response(
        '<html><body><p>Image ID required</p></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Return HTML page that retrieves and displays image from localStorage
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Image Viewer - ATA Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; padding: 20px; background: #f5f5f5; font-family: system-ui, -apple-system, sans-serif; }
    .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    img { max-width: 100%; height: auto; border-radius: 4px; margin: 20px 0; }
    h1 { margin-top: 0; color: #333; }
    .info { background: #f0f7ff; border-left: 4px solid #2980B9; padding: 12px; margin: 20px 0; border-radius: 4px; font-size: 13px; color: #333; }
    .error { background: #fff5f5; border-left: 4px solid #C0392B; padding: 12px; color: #C0392B; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Image: img-${imageId}</h1>
    <div id="content">
      <p>Loading image...</p>
    </div>
  </div>
  <script>
    const imageId = ${imageId};
    try {
      const images = JSON.parse(localStorage.getItem('ata_images')) || [];
      const img = images.find(i => i.id === imageId);
      if (img) {
        document.getElementById('content').innerHTML = \`
          <img src="\${img.data}" alt="\${img.name}" />
          <div class="info">
            <strong>Filename:</strong> \${img.name}<br>
            <strong>Category:</strong> \${img.category}<br>
            <strong>Uploaded:</strong> \${new Date(img.uploaded).toLocaleDateString()}
          </div>
          <p style="font-size: 12px; color: #666;">Right-click the image to save it, or copy the URL: <code>/images/img-\${imageId}</code></p>
        \`;
      } else {
        document.getElementById('content').innerHTML = '<p class="error"><strong>Image not found.</strong> Make sure you\'ve uploaded it in the dashboard.</p>';
      }
    } catch (e) {
      document.getElementById('content').innerHTML = '<p class="error"><strong>Error loading image:</strong> ' + e.message + '</p>';
    }
  </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (err) {
    return new Response(
      `<html><body><p>Error: ${err.message}</p></body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
