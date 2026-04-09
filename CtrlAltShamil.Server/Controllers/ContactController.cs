using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;
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

        // 2. Send email via SendGrid
        var apiKey = _config["SendGrid:ApiKey"];
        var fromEmail = _config["SendGrid:FromEmail"];
        var toEmail = _config["SendGrid:ToEmail"];

        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage
        {
            From = new EmailAddress(fromEmail, "Portfolio Contact"),
            Subject = $"New message from {body.Name}",
            PlainTextContent = $"Name: {body.Name}\nEmail: {body.Email}\n\n{body.Message}",
            HtmlContent = $@"
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> {body.Name}</p>
                <p><strong>Email:</strong> {body.Email}</p>
                <p><strong>Message:</strong><br/>{body.Message}</p>"
        };
        msg.AddTo(new EmailAddress(toEmail));

        var response = await client.SendEmailAsync(msg);

        if ((int)response.StatusCode >= 400)
            return StatusCode(500, new { error = "Failed to send email." });

        return Ok(new { message = "Message sent successfully." });
    }
}