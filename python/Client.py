import sys, traceback, Ice, time

Ice.loadSlice('../ice/py2serv.ice')
import py2serv



def messageBuilder(mission,idObjet):
    date = time.strftime("%Y-%m-%d %H:%M:%S")
    return py2serv.Message(date,mission,'ADD',idObjet,'P',1)

class Client(Ice.Application):
    def run(self, args):
        if len(args) > 1:
            print(self.appName() + ": too many arguments")
            return 1

        mission = 100
        idObjet = 0
        sender = py2serv.SenderPrx.checkedCast(\
            self.communicator().propertyToProxy('Sender.Proxy').ice_twoway().ice_timeout(-1).ice_secure(False))

        round = 1
        c = None
        while c != 'x':
            try:
                idObjet += 1
                sys.stdout.write("(Enter 'x' to stop, 'r' to reset the table)\n")
                sys.stdout.write("Number of messages to send: ")
                #sys.stdout.flush()
                c = sys.stdin.readline().strip()
                if c == 'x':
                    pass # Nothing to do
                elif c == 'r':
                    sender.resetTable();
                else:
                    for i in range(0, int(c)):
                        testMsg = messageBuilder(mission,idObjet)
                        sender.send(round,testMsg)
                        print("msg #{} sent".format(i))
                        idObjet += 1
                    round+=1
            except KeyboardInterrupt:
                break
            except EOFError:
                break
            except Ice.Exception as ex:
                print(ex)
        return 0

app = Client()
sys.exit(app.main(sys.argv, "config.client"))
