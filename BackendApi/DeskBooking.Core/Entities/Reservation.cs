namespace DeskBooking.Core.Entities
{
    public class Reservation
    {
        public int Id {get;set;}
        public int DeskId {get;set;}
        public int UserId {get;set;}
        public DateTime StartDate {get;set;}
        public DateTime EndDate {get;set;}
        public bool IsCancelled {get;set;}
        public DateTime CreatedAt {get;set;}

        public Desk Desk {get;set;} = null!;
        public User User {get;set;} = null!;
    }
}