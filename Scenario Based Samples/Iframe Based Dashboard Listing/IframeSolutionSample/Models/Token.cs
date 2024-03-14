using Newtonsoft.Json;

namespace IframeSolutionSample.Models
{
    public class Token
    {
        [JsonProperty("access_token")]
        public string? AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string? TokenType { get; set; }

        [JsonProperty("expires_in")]
        public string? ExpiresIn { get; set; }

        [JsonProperty("email")]
        public string? Email { get; set; }

        public string? LoginResult { get; set; }

        public string? LoginStatusInfo { get; set; }

        [JsonProperty(".issued")]
        public string? Issued { get; set; }

        [JsonProperty(".expires")]
        public string? Expires { get; set; }
    }
}