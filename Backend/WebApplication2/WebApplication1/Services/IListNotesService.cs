using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IListNotesService
    {
        List<ListNotes> Get();
        ListNotes Get(string id);
        ListNotes Create(ListNotes listNotes);
        void Update(string id, ListNotes listNotes);
        void Remove(string id);
    }
}
