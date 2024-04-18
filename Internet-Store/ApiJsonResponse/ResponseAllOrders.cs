using Internet_Store.Models;


namespace Internet_Store.ApiJsonResponse
{
    public class ResponseAllOrders
    {
        public required int Id { get; set; }
        public required decimal Price { get; set; }
        public required decimal PriceWithDelivery { get; set; }
        public required string City { get; set; }
        public required string Street { get; set; }
        public required string House { get; set; }
        public required string Index { get; set; }
        public required string State { get; set; }
        public required int UserId { get; set; }
    }
}
