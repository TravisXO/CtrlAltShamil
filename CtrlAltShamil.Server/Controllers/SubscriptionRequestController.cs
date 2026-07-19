using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class SubscriptionRequestController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly HttpClient _http;

    private static readonly Dictionary<string, string> PlanLabels = new()
    {
        ["sitecare-basic"] = "SiteCare — Basic (K500/mo)",
        ["sitecare-seo"] = "SiteCare — + SEO (K750/mo)",
        ["seo-momentum-basic"] = "SEO Momentum — Basic (K3,500/mo)",
        ["seo-momentum-ads"] = "SEO Momentum — + Google Ads (K5,000/mo)",
        ["build-queue"] = "Build Queue (K2,500–K7,500/mo)",
        ["not-sure"] = "Not sure yet — help me choose",
    };
    private static readonly Dictionary<string, string> PayMethodLabels = new()
    {
        ["bank"] = "Bank transfer (ZICB)",
        ["momo"] = "Mobile money (MTN)",
    };
    private static readonly Dictionary<string, string> HasWebsiteLabels = new()
    {
        ["live"] = "Yes, live and working",
        ["broken"] = "Yes, but broken or outdated",
        ["none"] = "No, starting from scratch",
    };
    private static readonly Dictionary<string, string> PlatformLabels = new()
    {
        ["wordpress"] = "WordPress",
        ["shopify"] = "Shopify",
        ["wix"] = "Wix / Squarespace",
        ["custom"] = "Custom-built",
    };
    private static readonly Dictionary<string, string> HostingLabels = new()
    {
        ["yes"] = "Yes, both domain and hosting",
        ["domain-only"] = "Domain only",
        ["no"] = "No, needs help getting set up",
    };
    private static readonly Dictionary<string, string> AssetLabels = new()
    {
        ["ready"] = "Yes, ready to send over",
        ["some"] = "Some of it",
        ["none"] = "No, needs help with this",
    };
    private static readonly Dictionary<string, string> StartTimeLabels = new()
    {
        ["asap"] = "As soon as possible",
        ["2weeks"] = "Within 2 weeks",
        ["month"] = "Within a month",
        ["exploring"] = "Just exploring for now",
    };

    public SubscriptionRequestController(IConfiguration config, IHttpClientFactory httpFactory)
    {
        _config = config;
        _http = httpFactory.CreateClient();
    }

    private static string Label(Dictionary<string, string> map, string key, string fallback = "Not specified") =>
        string.IsNullOrWhiteSpace(key) ? fallback : map.GetValueOrDefault(key, key);

    [HttpPost]
    public async Task<IActionResult> Send([FromBody] SubscriptionRequest body)
    {
        // 1. Verify reCAPTCHA
        var secretKey = _config["ReCaptcha:SecretKey"];
        var verifyUrl = $"https://www.google.com/recaptcha/api/siteverify" +
                        $"?secret={secretKey}&response={body.RecaptchaToken}";

        var verifyRes = await _http.PostAsync(verifyUrl, null);
        var verifyJson = await verifyRes.Content.ReadAsStringAsync();
        var doc = JsonDocument.Parse(verifyJson);

        if (!doc.RootElement.GetProperty("success").GetBoolean())
            return BadRequest(new { error = "reCAPTCHA verification failed." });

        // 2. Build the summary
        var planLabel = Label(PlanLabels, body.Plan);
        var priorities = body.Priorities.Count > 0 ? string.Join(", ", body.Priorities) : "None selected";
        var features = body.Features.Count > 0 ? string.Join(", ", body.Features) : "None selected";

        var text = new StringBuilder();
        text.AppendLine($"New subscription enquiry — {planLabel}");
        text.AppendLine();
        text.AppendLine("CONTACT & BUSINESS");
        text.AppendLine($"Name: {body.Name}");
        text.AppendLine($"Business: {(string.IsNullOrWhiteSpace(body.Business) ? "N/A" : body.Business)}");
        text.AppendLine($"Email: {body.Email}");
        text.AppendLine($"Phone/WhatsApp: {body.Phone}");
        text.AppendLine($"Location: {body.Location}");
        text.AppendLine();
        text.AppendLine("PLAN & PAYMENT");
        text.AppendLine($"Plan: {planLabel}");
        text.AppendLine($"Payment method: {Label(PayMethodLabels, body.PayMethod, "Not sure yet")}");
        text.AppendLine();
        text.AppendLine("CURRENT WEBSITE");
        text.AppendLine($"Has a website already: {Label(HasWebsiteLabels, body.HasWebsite)}");
        text.AppendLine($"Current URL: {(string.IsNullOrWhiteSpace(body.CurrentUrl) ? "N/A" : body.CurrentUrl)}");
        text.AppendLine($"Built on: {Label(PlatformLabels, body.CurrentPlatform, "Not sure / N/A")}");
        text.AppendLine($"Has hosting & domain: {Label(HostingLabels, body.HasHostingDomain, "Not sure")}");
        text.AppendLine();
        text.AppendLine("GOALS & PRIORITIES");
        text.AppendLine($"Main goal: {body.Goal}");
        text.AppendLine($"Top priorities: {priorities}");
        text.AppendLine($"Target audience: {(string.IsNullOrWhiteSpace(body.Audience) ? "N/A" : body.Audience)}");
        text.AppendLine($"Reference sites: {(string.IsNullOrWhiteSpace(body.References) ? "N/A" : body.References)}");
        text.AppendLine();
        text.AppendLine("ASSETS & FEATURES");
        text.AppendLine($"Brand assets (logo/colours/fonts): {Label(AssetLabels, body.HasBrandAssets, "Not sure")}");
        text.AppendLine($"Content ready (text/photos): {Label(AssetLabels, body.HasContent, "Not sure")}");
        text.AppendLine($"Specific features needed: {features}");
        text.AppendLine();
        text.AppendLine("TIMELINE");
        text.AppendLine($"Wants to start: {Label(StartTimeLabels, body.StartTime)}");
        text.AppendLine($"Hard deadline: {(string.IsNullOrWhiteSpace(body.Deadline) ? "None given" : body.Deadline)}");
        text.AppendLine();
        text.AppendLine("NOTES");
        text.AppendLine(string.IsNullOrWhiteSpace(body.Notes) ? "None" : body.Notes);

        string Enc(string s) => WebUtility.HtmlEncode(string.IsNullOrWhiteSpace(s) ? "—" : s);
        string Row(string label, string value) => $"<tr><td style=\"padding:4px 12px 4px 0;color:#7070A0;white-space:nowrap;\"><strong>{Enc(label)}</strong></td><td style=\"padding:4px 0;\">{Enc(value)}</td></tr>";

        var html = $@"
            <h2>New subscription enquiry — {Enc(planLabel)}</h2>

            <h3>Contact &amp; business</h3>
            <table>
                {Row("Name", body.Name)}
                {Row("Business", body.Business)}
                {Row("Email", body.Email)}
                {Row("Phone/WhatsApp", body.Phone)}
                {Row("Location", body.Location)}
            </table>

            <h3>Plan &amp; payment</h3>
            <table>
                {Row("Plan", planLabel)}
                {Row("Payment method", Label(PayMethodLabels, body.PayMethod, "Not sure yet"))}
            </table>

            <h3>Current website</h3>
            <table>
                {Row("Has a website already", Label(HasWebsiteLabels, body.HasWebsite))}
                {Row("Current URL", body.CurrentUrl)}
                {Row("Built on", Label(PlatformLabels, body.CurrentPlatform, "Not sure / N/A"))}
                {Row("Has hosting &amp; domain", Label(HostingLabels, body.HasHostingDomain, "Not sure"))}
            </table>

            <h3>Goals &amp; priorities</h3>
            <table>
                {Row("Main goal", body.Goal)}
                {Row("Top priorities", priorities)}
                {Row("Target audience", body.Audience)}
                {Row("Reference sites", body.References)}
            </table>

            <h3>Assets &amp; features</h3>
            <table>
                {Row("Brand assets", Label(AssetLabels, body.HasBrandAssets, "Not sure"))}
                {Row("Content ready", Label(AssetLabels, body.HasContent, "Not sure"))}
                {Row("Specific features", features)}
            </table>

            <h3>Timeline</h3>
            <table>
                {Row("Wants to start", Label(StartTimeLabels, body.StartTime))}
                {Row("Hard deadline", body.Deadline)}
            </table>

            <h3>Notes</h3>
            <p>{Enc(body.Notes)}</p>";

        // 3. Send email via Resend
        var apiKey = _config["Resend:ApiKey"];
        var fromEmail = _config["Resend:FromEmail"];
        var toEmail = _config["Resend:ToEmail"];

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Content = JsonContent.Create(new
        {
            from = $"Subscription Enquiry <{fromEmail}>",
            to = new[] { toEmail },
            reply_to = body.Email,
            subject = $"New subscription enquiry: {body.Name} — {planLabel}",
            text = text.ToString(),
            html,
        });

        var response = await _http.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            return StatusCode(500, new { error = "Failed to send email." });

        return Ok(new { message = "Subscription enquiry sent successfully." });
    }
}
