from bottle import route, run, static_file
import os

rootDir=os.path.dirname(os.path.abspath(__file__)) + "/wwwroot"

@route("/")
def index():
    return static_file("index.html", root=rootDir)

@route('/js/<filename:re:.*\.js>')
def js(filename):
    return static_file(filename, root=rootDir + "/js", mimetype="application/javascript")

@route('/css/<filename:re:.*\.css>')
def js(filename):
    return static_file(filename, root=rootDir + "/css", mimetype="text/css")

run(host='localhost', port=8080, debug=True)