using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListNotesController : ControllerBase
    {

        private readonly IListNotesService _listNotesService;

        public ListNotesController(IListNotesService listNotesService)
        {
            _listNotesService = listNotesService;
        }

        [HttpGet]
        public ActionResult<List<ListNotes>> Get()
        {
            return _listNotesService.Get();
        }


        [HttpGet("{id}")]
        public ActionResult<ListNotes> Get(string id)
        {
            var listNote = _listNotesService.Get(id);

            if (listNote == null)
            {
                return NotFound($"listNote with Id = {id} not found");
            }

            return listNote;
        }


        [HttpPost]
        public ActionResult<ListNotes> Post([FromBody] ListNotes listNotes)
        {
            _listNotesService.Create(listNotes);

            return CreatedAtAction(nameof(Get), new { id = listNotes.Id }, listNotes);
        }

        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] ListNotes listNotes)
        {
            var existingListNotes = _listNotesService.Get(id);

            if (existingListNotes == null)
            {
                return NotFound($"listNotes with Id = {id} not found");
            }

            _listNotesService.Update(id, listNotes);

            return NoContent();
        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var listNotes = _listNotesService.Get(id);

            if (listNotes == null)
            {
                return NotFound($"register with Id = {id} not found");
            }

            _listNotesService.Remove(listNotes.Id);

            return Ok($"listNotes with Id = {id} deleted");
        }

    }
}
