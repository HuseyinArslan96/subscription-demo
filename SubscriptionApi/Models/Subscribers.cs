using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SubscriberApp.Models
{
    [Table("subscribers")]
    public class Subscribers
    {
        [Key]
        public int subscriber_id { get; set; }
        public string? subscriber_name { get; set; }
        public string? company_name { get; set; }        
    }
}
