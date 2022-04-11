namespace JorgeShoes.DTO
{
    public class EmailDTO
    {
        public string File { get; set; }
        public string Path { get; set; }
        public string Source { get; set; }

        public string? Content { get; internal set; }
        public string? Type { get; internal set; }

        public EmailDTO(string file, string path = null, string source = null, string? content = null, string? type = null)
        {
            File = file;
            Path = path;
            Source = source;
            Content = content;
            Type = type;
        }
    }
}
