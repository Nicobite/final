import sys, traceback, time, Ice, pymysql

Ice.loadSlice('../ice/py2serv.ice')
Ice.updateModules()
import py2serv
        
class SenderI(py2serv.Sender):
    def send(self, round,msg, current=None):
        print("[Round #{}] Received: date={}, mission={}, action={}, idObjet={}"
              .format(round,msg.date,msg.mission,msg.action,msg.idObjet))
        query = "INSERT INTO messages VALUE("+str(msg.idObjet)+",'"+msg.date+"',"+str(msg.mission)+",'"+msg.action+"','"+msg.type+"',"+str(msg.niveau)+")" #"+msg.type+"
        #print(query)
        cursor.execute(query)
        database.commit()
      
        #cursor.execute("select * from messages")
    def resetTable(self, current=None):
        cursor.execute("TRUNCATE TABLE messages")
class Server(Ice.Application):
    def run(self, args):
        if len(args) > 1:
            print(self.appName() + ": too many arguments")
            return 1
        
        adapter = self.communicator().createObjectAdapter("Sender")
        adapter.add(SenderI(), self.communicator().stringToIdentity("hello"))
        adapter.activate()
        self.communicator().waitForShutdown()
        return 0

database = pymysql.connect(host='localhost',
                           #unix_socket='/tmp/mysql.sock',
                           user='root',
                           passwd='root',
                           db='test1')
cursor = database.cursor()

sys.stdout.flush()
app = Server()

sys.exit(app.main(sys.argv, "config.server"))

cursor.close()
database.close()

