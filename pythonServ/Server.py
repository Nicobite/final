import sys, traceback, time, Ice

Ice.loadSlice('../ice/py2serv.ice')
Ice.updateModules()
import py2serv

class SenderI(py2serv.Sender):
    def send(self, round,msg, current=None):
        print("[Round #{}] Received: date={} ,mission={} ,action={} ,idObjet={}"
              .format(round,msg.date,msg.mission,msg.action,msg.idObjet))

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

sys.stdout.flush()
app = Server()
sys.exit(app.main(sys.argv, "config.server"))
