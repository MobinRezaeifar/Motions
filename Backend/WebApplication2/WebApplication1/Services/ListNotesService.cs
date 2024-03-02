using MongoDB.Driver;
using WebApplication1.Configuration;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class ListNotesService : IListNotesService
    {
        private readonly IMongoCollection<ListNotes> _listNotes;

        public ListNotesService(IStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _listNotes = database.GetCollection<ListNotes>(settings.ListNotesCollection);
        }
            
        public ListNotes Create(ListNotes listNotes)
        {
            _listNotes.InsertOne(listNotes);
            return listNotes;
        }

        public List<ListNotes> Get()
        {
            return _listNotes.Find(listNotes => true).ToList();
        }

        public ListNotes Get(string id)
        {
            return _listNotes.Find(listNotes => listNotes.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _listNotes.DeleteOne(listNotes => listNotes.Id == id);
        }

        public void Update(string id, ListNotes listNotes)
        {
            _listNotes.ReplaceOne(listNotes => listNotes.Id == id, listNotes);
        }
    }
}
