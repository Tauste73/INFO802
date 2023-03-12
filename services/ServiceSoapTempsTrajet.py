from spyne.application import Application
from spyne.decorator import rpc
from spyne.service import ServiceBase
from spyne import Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from spyne import Integer, Unicode , Decimal


class TempsTrajetService(ServiceBase):
    @rpc(Decimal, Decimal, Decimal, Decimal, _returns=Decimal)
    def tempstrajet(ctx, distance, vitessemoy, tempsRechargeMinutes, nbRecharge):
        ctx.transport.resp_headers['Access-Control-Allow-Origin'] = '*'
        return (distance / vitessemoy) * 60 + nbRecharge * tempsRechargeMinutes



application = Application([TempsTrajetService], 'spyne.examples.tempstrajet.soap',
 in_protocol=Soap11(validator='lxml'),
 out_protocol=Soap11())
wsgi_application = WsgiApplication(application)


#def main():
 #   from wsgiref.simple_server import make_server
  #  server = make_server('127.0.0.1', 8000, wsgi_application)
  #  server.serve_forever()

#main()

app = wsgi_application