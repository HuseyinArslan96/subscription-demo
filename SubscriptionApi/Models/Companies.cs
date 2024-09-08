using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SubscriberApp.Models
{
    [Table("companies")]
    public class Companies
    {
        [Key]
        public int company_id { get; set; }
        public string? company_name { get; set; }
        public int manager_id { get; set; }
        public string? manager_name { get; set; }
        public string? manager_email { get; set; }
    }
}