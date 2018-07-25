import requests
import time

class Simulator:
    """docstring for Simulator."""
    def __init__(self, url):
        self.url = url

    def jump(self, time):
        params = { "op": "get", "jt": int(time) }
        return Simulator._send_req(params, self.url)

    def replay(self, seed):
        params = { "op": "replay", "seed": int(seed) }
        print("requested: " + str(round(time.time() * 1000)))
        return Simulator._send_req(params, self.url)

    @staticmethod
    def  _send_req(params, url):
        r = requests.get(url=url, params=params, timeout=1000)
        print(r.json())
        print("received: " + str(round(time.time() * 1000)))


sim = Simulator("http://localhost:3000")
sim.replay(0)
