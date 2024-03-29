﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class Registers
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("username")]
        public string? Username { get; set; }

        [BsonElement("password")]
        public string? Password { get; set; }

        [BsonElement("profileImg")]
        public string? ProfileImg { get; set; }

        [BsonElement("score")]
        public int Score { get; set; }

       
    }
}
