/**
 * Program.cs  (FIXED — Correct Middleware Order)
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed:
 *   1. Security headers moved to TOP — now applied to all responses
 *   2. Bot pre-render middleware moved BEFORE UseStaticFiles — now actually fires
 *   3. UseHttpsRedirection moved to the top of the pipeline
 *   4. Removed unused AddMemoryCache
 *   5. Removed redundant UseAuthorization (no auth configured)
 * ─────────────────────────────────────────────────────────────────────────────
 */

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ─────────────────────────────────────────────────────────────────────────────
//  1. HTTPS REDIRECT — must be first in the pipeline
// ─────────────────────────────────────────────────────────────────────────────
app.UseHttpsRedirection();

// ─────────────────────────────────────────────────────────────────────────────
//  2. SECURITY HEADERS — before any response is written (including static files)
// ─────────────────────────────────────────────────────────────────────────────
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["X-Frame-Options"] = "SAMEORIGIN";
    context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
    await next();
});

// ─────────────────────────────────────────────────────────────────────────────
//  3. BOT PRE-RENDER MIDDLEWARE — must come BEFORE UseDefaultFiles/UseStaticFiles
//     otherwise the static file middleware serves index.html first and this
//     middleware is never reached for page routes.
// ─────────────────────────────────────────────────────────────────────────────
app.Use(async (context, next) =>
{
    var userAgent = context.Request.Headers["User-Agent"].ToString().ToLower();
    var path = context.Request.Path.Value?.ToLower() ?? "/";

    bool isBot = userAgent.Contains("googlebot")
              || userAgent.Contains("bingbot")
              || userAgent.Contains("facebookexternalhit")
              || userAgent.Contains("twitterbot")
              || userAgent.Contains("linkedinbot")
              || userAgent.Contains("whatsapp")
              || userAgent.Contains("slackbot")
              || userAgent.Contains("telegrambot")
              || userAgent.Contains("discordbot");

    // Only intercept page routes (not /api, /sitemap.xml, etc.)
    bool isPageRoute = path == "/" || path == "/projects-archive";

    if (isBot && isPageRoute)
    {
        var (title, description, ogImage) = path switch
        {
            "/projects-archive" => (
                "Projects Archive | Ctrl Alt Shamil — Full-Stack & SEO Portfolio",
                "View all projects by Alexander Shamil Mondoka: BNOP Media (ASP.NET 8 MVC), SEO Canonical Auditor, Classic Zambia Safaris (+217% organic traffic), and more.",
                "/og-projects.jpg"
            ),
            _ => (
                "Ctrl Alt Shamil | Full-Stack Developer & SEO Strategist | Lusaka, Zambia",
                "Alexander Shamil Mondoka — Full-Stack Software Engineer (ASP.NET 8, React, C#) and Technical SEO Strategist based in Lusaka, Zambia. Available for remote and local projects.",
                "/og-home.jpg"
            )
        };

        // IMPORTANT: Replace ctrlaltshamil.com with your real domain
        const string domain = "https://ctrlaltshamil.com";
        var canonicalUrl = $"{domain}{path}";
        var ogImageUrl = $"{domain}{ogImage}";

        var botHtml = $"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>{title}</title>
              <meta name="description" content="{description}" />
              <link rel="canonical" href="{canonicalUrl}" />
              <meta property="og:type"        content="website" />
              <meta property="og:title"       content="{title}" />
              <meta property="og:description" content="{description}" />
              <meta property="og:url"         content="{canonicalUrl}" />
              <meta property="og:site_name"   content="Ctrl Alt Shamil" />
              <meta property="og:image"       content="{ogImageUrl}" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
              <meta property="og:locale"      content="en_ZM" />
              <meta name="twitter:card"        content="summary_large_image" />
              <meta name="twitter:title"       content="{title}" />
              <meta name="twitter:description" content="{description}" />
              <meta name="twitter:image"       content="{ogImageUrl}" />
              <meta name="geo.region"          content="ZM-09" />
              <meta name="geo.placename"       content="Lusaka, Zambia" />
            </head>
            <body>
              <h1>{title}</h1>
              <p>{description}</p>
              <p>Contact: <a href="mailto:mondokashamil@gmail.com">mondokashamil@gmail.com</a></p>
              <p>Location: Lusaka, Zambia</p>
            </body>
            </html>
            """;

        context.Response.ContentType = "text/html; charset=utf-8";
        await context.Response.WriteAsync(botHtml);
        return;
    }

    await next();
});

// ─────────────────────────────────────────────────────────────────────────────
//  4. STATIC FILE SERVING — with cache-control headers for hashed Vite assets
// ─────────────────────────────────────────────────────────────────────────────
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        var path = ctx.File.Name;

        // Vite generates hashed filenames like main-Ab3xY.js — cache for 1 year
        if (path.Contains('-') && (
            path.EndsWith(".js") ||
            path.EndsWith(".css") ||
            path.EndsWith(".woff2") ||
            path.EndsWith(".woff")))
        {
            ctx.Context.Response.Headers["Cache-Control"] =
                "public, max-age=31536000, immutable";
        }
        else
        {
            // HTML, images, etc. — revalidate each visit
            ctx.Context.Response.Headers["Cache-Control"] =
                "public, max-age=0, must-revalidate";
        }
    }
});

// ─────────────────────────────────────────────────────────────────────────────
//  5. SWAGGER — development only
// ─────────────────────────────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ─────────────────────────────────────────────────────────────────────────────
//  6. ROBOTS.TXT
// ─────────────────────────────────────────────────────────────────────────────
app.MapGet("/robots.txt", () =>
{
    var content = """
        User-agent: *
        Allow: /
        Disallow: /api/
        Disallow: /swagger/

        # Sitemap location
        Sitemap: https://ctrlaltshamil.com/sitemap.xml

        # Crawl rate (optional — be polite for shared hosting)
        Crawl-delay: 1
        """;
    return Results.Content(content.Trim(), "text/plain");
});

// ─────────────────────────────────────────────────────────────────────────────
//  7. SITEMAP.XML
// ─────────────────────────────────────────────────────────────────────────────
app.MapGet("/sitemap.xml", () =>
{
    const string baseUrl = "https://ctrlaltshamil.com";
    string today = DateTime.UtcNow.ToString("yyyy-MM-dd");

    var sitemap = $"""
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

          <!-- Home / Portfolio -->
          <url>
            <loc>{baseUrl}/</loc>
            <lastmod>{today}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>

          <!-- Projects Archive -->
          <url>
            <loc>{baseUrl}/projects-archive</loc>
            <lastmod>{today}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
          </url>

        </urlset>
        """;

    return Results.Content(sitemap.Trim(), "application/xml");
});

// ─────────────────────────────────────────────────────────────────────────────
//  8. API ROUTES
// ─────────────────────────────────────────────────────────────────────────────
app.MapGroup("/api").MapControllers();

// ─────────────────────────────────────────────────────────────────────────────
//  9. SPA FALLBACK — must be last, catches all unmatched routes
// ─────────────────────────────────────────────────────────────────────────────
app.MapFallbackToFile("/index.html");

app.Run();