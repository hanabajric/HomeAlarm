using FIT_Api_Examples.Data;
using FIT_Api_Examples.ModulAlarm.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FIT_Api_Examples.ModulAlarm
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AlarmController : Controller
    {
        private ApplicationDbContext _dbContext;

        public AlarmController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public string UpaliAlarm()//IActionResult
        {
            Alarm alarm = new Alarm()
            {
                Datum = DateTime.Now
            };
           // AlarmStanje stanje = new AlarmStanje() { Upaljen = true };
            _dbContext.Alarm.Add(alarm);
            //_dbContext.AlarmStanje.Add(stanje);
            AlarmStanje stanje = _dbContext.AlarmStanje.Where(x => x.ID == 1).FirstOrDefault();
            stanje.Upaljen = true;
            _dbContext.SaveChanges();
            Console.WriteLine("NESTO");
            //return Ok(stanje);
            return "OK";
        }
        [HttpGet]
        public IActionResult UgasiAlarm()
        {

            AlarmStanje stanje = _dbContext.AlarmStanje.Where(x => x.ID == 1).FirstOrDefault();

            
            
                stanje.Upaljen = false;
              
                _dbContext.SaveChanges();
                return Ok(stanje);
      

        }
        [HttpGet]
        public List<Alarm> GetAll()
        {
            return _dbContext.Alarm.ToList();
        }
        [HttpGet]
        public string ProvjeriStatusAlarma()
        {
            string upaljen="Alarm nije upaljen";
            AlarmStanje stanje = _dbContext.AlarmStanje.Where(x => x.ID == 1).FirstOrDefault();
            if (stanje.Upaljen == true) upaljen = "Alarm je upaljen";
            return  upaljen;
        }
        [HttpPost("{id}")]
        public ActionResult BrisiById(int id)
        {
            Alarm alarm = _dbContext.Alarm.Find(id);

            if (alarm == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(alarm);

            _dbContext.SaveChanges();
            return Ok(alarm);
        }
    }
}
