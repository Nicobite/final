#pragma once

module py2serv
{

	struct Message {
		string date;
		int mission;
		string action;
		int idObjet;
		string type;
		int niveau;
	};
	
	interface Sender{
		void send(int round,Message msg);
	};

};
