**This project is a backend for : https://github.com/minacio00/TournamentManager**  
if you want to run it locally, it would be necessary to setup a fireStore on  
firebase and to create a service acount on google cloud and  
import the crendials on src/firebaseCredentials.js 

**This project is REST api made with express.js and uses fireStore as a database**
#### ENDPOINTS:
    /tournaments/view - return a json of all the tournaments currently created
    /register/:username - expect a json that represents an event and a user's nickname, returns a json that
    represents the same event json with the user registered in the bracket

    /newevent' - expects a json with the fields: uid(that represents a user registered in the app), eventname, NumberOfParticipants, EventDate, Sport - returns a json array that represents an event with a empty bracket.

