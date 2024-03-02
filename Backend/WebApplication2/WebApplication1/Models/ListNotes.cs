using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class ListNotes
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("title")]
        public string? Title { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("owner")]
        public string? Owner { get; set; }

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("noteimg")]
        public string? NoteImg { get; set; }

        [BsonElement("startTime")]
        public string? StartTime { get; set; }

        [BsonElement("endTime")]
        public string? EndTime { get; set; }

        [BsonElement("status")]
        [DefaultValue(false)]
        public bool Status { get; set; }


    }
}
