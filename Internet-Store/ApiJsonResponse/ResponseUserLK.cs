namespace Internet_Store.ApiJsonResponse
{
    public class ResponseUserLK
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string NumberPhone { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string? EmailToken { get; set; }
        public required bool IsConfirmed { get; set; }


    }
}
