import Seats from './Seats';

function BookSeats({ ticketCount, bookedSeats }) {
  const createSection = numberOfRows => {
    let curAlphabet = 'A';
    const section = [];
    for (let j = 0; j < numberOfRows; j++) {
      for (let i = 0; i < 10; i++) {
        if (j < numberOfRows + 1) {
          section.push(curAlphabet + (i + 1));
        }
      }
      curAlphabet = String.fromCharCode(curAlphabet.charCodeAt(0) + 1);
    }
    return section;
  };

  const seats = createSection(10);

  console.log(bookedSeats);

  return (
    <Seats values={seats} ticketCount={ticketCount} bookedSeats={bookedSeats} />
  );
}

export default BookSeats;
