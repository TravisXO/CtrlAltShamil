using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly HttpClient _http;

    public ContactController(IConfiguration config, IHttpClientFactory httpFactory)
    {
        _config = config;
        _http = httpFactory.CreateClient();
    }

    [HttpPost]
    public async Task<IActionResult> Send([FromBody] ContactRequest body)
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

        // 2. Send email via Resend
        var apiKey = _config["Resend:ApiKey"];
        var fromEmail = _config["Resend:FromEmail"];
        var toEmail = _config["Resend:ToEmail"];

        var serviceLabels = new Dictionary<string, string>
        {
            ["freelance"] = "Freelance Web Development",
            ["seo"] = "SEO Audit & Strategy",
            ["fulltime"] = "Remote Full-Time Role",
            ["enquiry"] = "General Enquiry",
        };
        var serviceLabel = serviceLabels.GetValueOrDefault(body.Service, body.Service);

        var name = WebUtility.HtmlEncode(body.Name);
        var email = WebUtility.HtmlEncode(body.Email);
        var service = WebUtility.HtmlEncode(serviceLabel);
        var message = WebUtility.HtmlEncode(body.Message);

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Content = JsonContent.Create(new
        {
            from = $"Portfolio Contact <{fromEmail}>",
            to = new[] { toEmail },
            reply_to = body.Email,
            subject = $"New message from {body.Name}",
            text = $"Name: {body.Name}\nEmail: {body.Email}\nService: {serviceLabel}\n\n{body.Message}",
            html = $@"
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Service:</strong> {service}</p>
                <p><strong>Message:</strong><br/>{message}</p>"
        });

        var response = await _http.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            return StatusCode(500, new { error = "Failed to send email." });

        return Ok(new { message = "Message sent successfully." });
    }
}