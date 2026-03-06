using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CtrlAltShamil.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IConfiguration config, ILogger<ContactController> logger)
        {
            _config = config;
            _logger = logger;
        }

        public record ContactRequest(string Name, string Email, string Message);

        [HttpPost]
        public async Task<IActionResult> Send([FromBody] ContactRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Name) ||
                string.IsNullOrWhiteSpace(req.Email) ||
                string.IsNullOrWhiteSpace(req.Message))
            {
                return BadRequest(new { error = "All fields are required." });
            }

            var apiKey = _config["SendGrid:ApiKey"];
            var client = new SendGridClient(apiKey);

            var from    = new EmailAddress("mondokashamil@gmail.com", "Ctrl Alt Shamil — Contact Form");
            var to      = new EmailAddress("mondokashamil@gmail.com", "Alexander Shamil Mondoka");
            var subject = $"[Portfolio] New message from {req.Name}";

            var plainText = $"Name: {req.Name}\nEmail: {req.Email}\n\nMessage:\n{req.Message}";
            var html = $"""
                <div style="font-family:monospace;background:#070d0c;color:#f0e0c4;padding:24px;border-radius:4px;border:1px solid #E8AA3A">
                  <h2 style="color:#E8AA3A;margin-top:0">// NEW_TRANSMISSION_RECEIVED</h2>
                  <p><strong style="color:#2e6e65">Sender_Identity:</strong> {System.Net.WebUtility.HtmlEncode(req.Name)}</p>
                  <p><strong style="color:#2e6e65">Return_Frequency:</strong> {System.Net.WebUtility.HtmlEncode(req.Email)}</p>
                  <hr style="border-color:#E8AA3A;opacity:0.3"/>
                  <p><strong style="color:#2e6e65">Transmission_Data:</strong></p>
                  <p style="white-space:pre-wrap">{System.Net.WebUtility.HtmlEncode(req.Message)}</p>
                </div>
                """;

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainText, html);

            // Reply-to is the visitor's email so you can hit Reply directly
            msg.SetReplyTo(new EmailAddress(req.Email, req.Name));

            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Contact email sent from {Email}", req.Email);
                return Ok(new { success = true });
            }

            var body = await response.Body.ReadAsStringAsync();
            _logger.LogError("SendGrid error {Status}: {Body}", response.StatusCode, body);
            return StatusCode(500, new { error = "Failed to send message. Please try again." });
        }
    }
}