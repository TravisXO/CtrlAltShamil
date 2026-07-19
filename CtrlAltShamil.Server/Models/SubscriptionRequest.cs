public class SubscriptionRequest
{
    public string Name { get; set; } = "";
    public string Business { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Location { get; set; } = "";

    public string Plan { get; set; } = "";
    public string PayMethod { get; set; } = "";

    public string HasWebsite { get; set; } = "";
    public string CurrentUrl { get; set; } = "";
    public string CurrentPlatform { get; set; } = "";
    public string HasHostingDomain { get; set; } = "";

    public string Goal { get; set; } = "";
    public List<string> Priorities { get; set; } = new();
    public string Audience { get; set; } = "";
    public string References { get; set; } = "";

    public string HasBrandAssets { get; set; } = "";
    public string HasContent { get; set; } = "";
    public List<string> Features { get; set; } = new();

    public string StartTime { get; set; } = "";
    public string Deadline { get; set; } = "";

    public string Notes { get; set; } = "";

    public string RecaptchaToken { get; set; } = "";
}
