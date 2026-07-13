import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Only allow proxying from the allowed domain
  const allowedDomain = "media.drvrushali.com";
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== allowedDomain) {
      return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const body = await response.arrayBuffer();

    // If it's an m3u8 playlist, rewrite URLs to go through the proxy
    if (contentType.includes("mpegurl") || url.endsWith(".m3u8")) {
      const text = new TextDecoder().decode(body);
      const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);

      // Rewrite relative URLs in the playlist to absolute proxied URLs
      const rewritten = text.replace(/^(?!#)(.+)$/gm, (line) => {
        if (line.startsWith("http")) {
          return `/api/proxy?url=${encodeURIComponent(line)}`;
        }
        return `/api/proxy?url=${encodeURIComponent(baseUrl + line)}`;
      });

      return new NextResponse(rewritten, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch upstream: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 502 }
    );
  }
}