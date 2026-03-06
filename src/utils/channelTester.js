export async function testChannel(url, timeout = 5000) {
  try {
    // For HLS streams, we'll do a simple HEAD request first
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      mode: "no-cors", // This helps with CORS issues but limits info
    });

    clearTimeout(timeoutId);

    // With no-cors, we can't access status, so assume it's working if no error
    return true;
  } catch (error) {
    console.log(`Channel test failed for ${url}:`, error.message);
    return false;
  }
}

// For more thorough testing, we can try to load a small segment
export async function testChannelWithSegment(url, timeout = 8000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Try to fetch just the first few bytes
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Range: "bytes=0-1024", // Request first 1KB only
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.log(`Channel segment test failed for ${url}:`, error.message);
    return false;
  }
}
