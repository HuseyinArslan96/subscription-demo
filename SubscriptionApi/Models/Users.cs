using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SubscriberApp.Models
{
    [Table("users")]
    public class Users
    {
        [Key]
        public int user_id { get; set; }
        public string? user_name { get; set; }
        public int company_id { get; set; }
        public string? company_name { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
    }
}