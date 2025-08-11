export async function onRequest(context) {
  const images = [
    "https://background.sayabear.com/1.jpg",
    "https://background.sayabear.com/2.jpg",
    "https://background.sayabear.com/3.jpg"
  ];

  const picked = images[Math.floor(Math.random() * images.length)];

  try {
    const upstream = await fetch(picked, {
      headers: {
        "Accept": "image/*",
        "Referer": "https://bg.sayabear.com/"
      }
    });

    if (!upstream.ok || !upstream.body) {
      throw new Error(`Upstream ${picked} failed`);
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "no-store"
      }
    });
  } catch (e) {
    return new Response("Image fetch error", { status: 502 });
  }
}
