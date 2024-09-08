using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SubscriberApp.Models;

namespace SubscriberApp.Models
{
    [Table("messages")]
    public class Messages
    {
        [Key]
        public int id { get; set; }
        public string message { get; set; }
        public int sender_id { get; set; }
        public string sender_name { get; set; }
        public int receiver_id { get; set; }
        public string receiver_name { get; set; }
        public DateTime sent_at { get; set; }
        public bool is_read { get; set; }
    }
}